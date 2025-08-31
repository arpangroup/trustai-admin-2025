import React, { useEffect, useState } from "react";
import axios from "axios";
import { CURRENCY_SYMBOL, SCHEDULE_OPTIONS } from "../../constants/config";
import { LuPlus, LuTrash } from "react-icons/lu";
import { API_ROUTES } from "../../constants/apiRoutes";
import apiClient from "../../api/apiClient";


const SchemaEditor = () => {
    const [schemas, setSchemas] = useState([]);
    const [rankOptions, setRankOptions] = useState([]);
    const [fullRankList, setFullRankList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            apiClient.get(API_ROUTES.SCHEMA_LIST),
            apiClient.get(API_ROUTES.RANK_CONFIGS)
        ])
            .then(([schemaData, rankData]) => {
                setSchemas(schemaData?.content || []);
                const ranks = rankData?.content || [];
                setFullRankList(ranks);
                const activeRanks = ranks.filter((r) => r.active);
                const formattedRanks = activeRanks.map((rank) => ({
                    label: rank.code,
                    value: rank.code
                }));
                setRankOptions(formattedRanks);
            })
            .catch((err) => {
                console.error("Error loading schema or ranks", err);
                alert("Failed to load data. See console for details.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleChange = (index, field, value) => {
        const updated = [...schemas];
        const keys = field.split(".");
        if (keys.length === 2) {
            updated[index][keys[0]] = {
                ...updated[index][keys[0]],
                [keys[1]]: value
            };
        } else {
            updated[index][field] = value;
        }

        // If field is "rankId", auto-fill minimumInvestmentAmount from rankOptions
        if (field === "linkedRank") {
            console.log("SELECTED: ", value);
            const selectedRank = rankOptions.find((rank) => rank.value === value);
            if (selectedRank) {
                // You need access to full rank objects here
                const fullRank = fullRankList.find((r) => r.code === selectedRank.value);
                if (fullRank) {
                    updated[index].minimumInvestmentAmount = fullRank.minInvestmentAmount;
                }
            }
        }


        setSchemas(updated);
    };

    const calculateTotalReturn = (schema) => {
        const min = parseFloat(schema.minimumInvestmentAmount || 0);
        const rate = parseFloat(schema.returnRate || 0);
        const periods = parseInt(schema.totalReturnPeriods || 0);
        return ((min * rate * periods) / 100).toFixed(2);
    };

    const calculatePerDayProfit = (schema) => {
        return 0;
    }

    const handleAddRowBelow = (index) => {
        const prev = schemas[index];

        const newRow = {
            minimumInvestmentAmount: "",
            maximumInvestmentAmount: "",
            returnRate: "",
            totalReturnPeriods: "",
            returnSchedule: { id: 2 }, // default to 'Daily'
            linkedRank: prev?.linkedRank || "RANK_1", // ✅ Copy from current row
            active: true,
            isNew: true, // ✅ mark as new
        };

        const updated = [...schemas];
        updated.splice(index + 1, 0, newRow);
        setSchemas(updated);


        // Optional: remove highlight after 2 seconds
        // Remove highlight after 2 seconds
        // setTimeout(() => {
        //     setSchemas((prevSchemas) =>
        //     prevSchemas.map((s) => ({ ...s, isNew: false }))
        //     );
        // }, 2000);
    };

    const handleDeleteRow = async (schemaId) => {
        if (!schemaId) return;
        if (!window.confirm("Are you sure you want to delete this schema?")) return;
        try {
            await axios.delete(`/api/v1/investment-schemas/${schemaId}`);
            setSchemas(prev => prev.filter(s => s.id !== schemaId));
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete schema.");
        }
    };

    if (loading) return <div>Loading investment schemas...</div>;

    return (
        <div className="container mt-4">
            <h4 className="mb-3">Investment Schema Editor</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-sm align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Linked Rank</th>
                            {/* <th>Title</th> */}
                            <th style={{ width: "80px" }}>Minimum Invest({CURRENCY_SYMBOL})</th>
                            <th style={{ width: "90px" }}>Investment Amount({CURRENCY_SYMBOL})</th>
                            <th style={{ width: "90px" }}>Return Rate (%)</th>
                            <th style={{ width: "90px" }}>Duration (Days)</th>
                            <th style={{ width: "120px" }}>Return Schedule</th>
                            <th style={{ width: "50px" }}>Capital Back</th>
                            <th style={{ width: "100px" }}>Per Day Profit</th>
                            <th style={{ width: "100px" }}>Est. Total Return</th>
                            <th style={{ width: "80px" }}>Schema Active</th>
                            <th style={{ width: "80px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schemas.map((schema, index) => (
                            <tr
                                key={schema.id}
                                className={schema.isNew ? "table-warning" : ""}
                            >
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={schema.linkedRank || ""}
                                        onChange={(e) =>
                                            handleChange(index, "linkedRank", e.target.value)
                                        }
                                    >
                                        <option value="" disabled>Select</option>
                                        {rankOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                {/* <td>{schema.title}</td> */}
                                <td>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={schema.minimumInvestmentAmount}
                                        onChange={(e) =>
                                            handleChange(index, "minimumInvestmentAmount", e.target.value)
                                        }
                                        disabled={true}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={schema.minimumInvestmentAmount || ""}
                                        onChange={(e) =>
                                            handleChange(index, "maximumInvestmentAmount", e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={schema.returnRate}
                                        onChange={(e) =>
                                            handleChange(index, "returnRate", e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={schema.totalReturnPeriods}
                                        onChange={(e) =>
                                            handleChange(index, "totalReturnPeriods", e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={schema.returnSchedule?.id || ""}
                                        onChange={(e) =>
                                            handleChange(index, "returnSchedule.scheduleId", parseInt(e.target.value))
                                        }
                                    >
                                        <option value="">Select</option>
                                        {SCHEDULE_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className="text-center">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={schema?.capitalReturned}
                                        onChange={(e) => handleChange(index, "capitalReturned", e.target.checked)}
                                        disabled={true}
                                    />
                                </td>
                                <td>
                                    {CURRENCY_SYMBOL}{calculatePerDayProfit(schema)}
                                </td>
                                <td>
                                    <span className="badge bg-success">
                                        {CURRENCY_SYMBOL}{calculateTotalReturn(schema)}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={schema.active}
                                        onChange={(e) => handleChange(index, "active", e.target.checked)}
                                    />
                                </td>
                                <td className="text-center">
                                    <LuPlus
                                        size={18}
                                        color="green"
                                        style={{ cursor: "pointer", marginRight: 8 }}
                                        onClick={() => handleAddRowBelow(index)}
                                    />
                                    {schema.id && (
                                        <LuTrash
                                            size={18}
                                            color="red"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleDeleteRow(schema.id)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SchemaEditor;
