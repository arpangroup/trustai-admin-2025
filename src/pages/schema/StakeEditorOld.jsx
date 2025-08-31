import React, { useEffect, useState } from "react";
import { SCHEDULE_OPTIONS } from "../../constants/config";
import { LuPlus, LuTrash } from "react-icons/lu";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../constants/apiRoutes";

const StakeEditor = () => {
  const [schemas, setSchemas] = useState([]);
  const [rankOptions, setRankOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [modifiedRows, setModifiedRows] = useState(new Set());
  const [newRows, setNewRows] = useState(new Set());
  const [fullRankList, setFullRankList] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchSchemas = apiClient.get(API_ROUTES.SCHEMA_LIST);
    const fetchRanks = apiClient.get(API_ROUTES.RANK_CONFIGS);

    Promise.all([fetchSchemas, fetchRanks])
      .then(([schemaRes, rankRes]) => {
        const ranks = rankRes?.content || [];
        setFullRankList(ranks);

        const activeRanks = ranks.filter(r => r.active);
        setRankOptions(activeRanks.map(rank => ({
          label: rank.code,
          value: rank.code
        })));

        const enrichedSchemas = (schemaRes?.content || []).map(schema => ({
          ...schema,
          linkedRank: schema.linkedRank || "",
          returnSchedule: { id: schema.returnSchedule?.id || 2 },
          _original: {
            minimumInvestmentAmount: schema.minimumInvestmentAmount,
            maximumInvestmentAmount: schema.maximumInvestmentAmount,
            returnRate: schema.returnRate,
            totalReturnPeriods: schema.totalReturnPeriods,
            returnScheduleId: schema.returnSchedule?.id,
            linkedRankCode: schema.linkedRank,
            capitalReturned: schema.capitalReturned,
            active: schema.active
          }
        }));

        setSchemas(enrichedSchemas);
      })
      .catch(err => {
        console.error("Error loading data", err);
      })
      .finally(() => setLoading(false));
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

    if (!newRows.has(index)) {
      setModifiedRows(prev => new Set(prev).add(index));
    }

    // If field is "rankId", auto-fill minimumInvestmentAmount from rankOptions
    if (field === "linkedRank") {
      const selectedRank = rankOptions.find((rank) => rank.value === value);
      if (selectedRank) {
        const fullRank = fullRankList.find((r) => r.code === selectedRank.value);
        if (fullRank) {
          updated[index].minimumInvestmentAmount = fullRank.minInvestmentAmount;
        }
      }
    }

    setSchemas(updated);
  };

  const handleMinInvestmentBlur = (index) => {
    // Validation for minimumInvestmentAmount
    const schema = schemas[index];
    const rankCode = schema.linkedRank;
    const currentRank = fullRankList.find(r => r.code === rankCode);

    if (!currentRank) return;

    const sortedRanks = [...fullRankList].sort((a, b) => a.minInvestmentAmount - b.minInvestmentAmount);
    const currentIndex = sortedRanks.findIndex(r => r.code === currentRank.code);
    const nextRank = sortedRanks[currentIndex + 1];

    const min = currentRank.minInvestmentAmount;
    const max = nextRank ? nextRank.minInvestmentAmount : Infinity;

    const value = Number(schema.minimumInvestmentAmount);

    if (isNaN(value) || value < min || value >= max) {
      //alert(`Minimum investment for ${rankCode} must be ≥ ${min} and < ${max === Infinity ? "∞" : max}`);
      setValidationErrors(prev => ({
        ...prev,
        [index]: `Min. investment should be between ${min} and ${max === Infinity ? "∞" : max}`
      }));

      const updated = [...schemas];
      updated[index].minimumInvestmentAmount = min;
      setSchemas(updated);
    }
  };

  const handleAddRowBelow = (index) => {
    const prev = schemas[index];
    const newRow = {
      linkedRank: prev?.linkedRank || "RANK_1",
      minimumInvestmentAmount: "",
      maximumInvestmentAmount: "",
      returnRate: "",
      totalReturnPeriods: "",
      returnSchedule: { id: 2 },
      capitalReturned: true,
      active: true
    };

    const updated = [...schemas];
    updated.splice(index + 1, 0, newRow);
    setSchemas(updated);

    setNewRows(prev => new Set(prev).add(index + 1));
    setHighlightedIndices(prev => [...prev, index + 1]);
  };

  const handleDeleteRow = async (schemaId) => {
    if (!schemaId) return;
    if (!window.confirm("Are you sure you want to delete this schema?")) return;
    try {
      await apiClient.delete(API_ROUTES.RANK_CONFIGS_BY_ID(schemaId));
      setSchemas(prev => prev.filter(s => s.id !== schemaId));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete schema.");
    }
  };

  const handleSubmit = async () => {
    const payload = schemas.map((schema, index) => {
      const isNew = newRows.has(index);

      if (Object.keys(validationErrors).length > 0) {
        //alert("Please fix validation errors before submitting.");
        return;
      }

      if (isNew) {
        return {
          linkedRankCode: schema.linkedRank,
          minimumInvestmentAmount: schema.minimumInvestmentAmount,
          maximumInvestmentAmount: schema.maximumInvestmentAmount,
          returnRate: schema.returnRate,
          totalReturnPeriods: schema.totalReturnPeriods,
          returnScheduleId: schema.returnSchedule?.id,
          capitalReturned: schema.capitalReturned,
          active: schema.active,
        };
      }

      if (modifiedRows.has(index) && schema._original) {
        const modified = { id: schema.id };

        if (schema.minimumInvestmentAmount !== schema._original.minimumInvestmentAmount)
          modified.minimumInvestmentAmount = schema.minimumInvestmentAmount;
        if (schema.maximumInvestmentAmount !== schema._original.maximumInvestmentAmount)
          modified.maximumInvestmentAmount = schema.maximumInvestmentAmount;
        if (schema.returnRate !== schema._original.returnRate)
          modified.returnRate = schema.returnRate;
        if (schema.totalReturnPeriods !== schema._original.totalReturnPeriods)
          modified.totalReturnPeriods = schema.totalReturnPeriods;
        if ((schema.returnSchedule?.id || 2) !== schema._original.returnScheduleId)
          modified.returnScheduleId = schema.returnSchedule?.id;
        if (schema.linkedRank !== schema._original.linkedRankCode)
          modified.linkedRankCode = schema.linkedRank;
        if (schema.capitalReturned !== schema._original.capitalReturned)
          modified.capitalReturned = schema.capitalReturned;
        if (schema.active !== schema._original.active)
          modified.active = schema.active;

        return Object.keys(modified).length > 1 ? modified : null;
      }

      return null;
    }).filter(Boolean);

    try {
      await apiClient.post(API_ROUTES.RANK_CONFIGS_BULK_UPSERT, payload);
      alert("Schemas updated successfully");
      window.location.reload();
    } catch (err) {
      console.error("Submit error", err);
      alert("Update failed with error: " + err.message);
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
              <th>Min Invest</th>
              <th>Return Rate (%)</th>
              <th>Handling Fee</th>
              <th>Minimum Withdraw</th>
              <th>Duration (Days)</th>
              <th>Schedule</th>
              <th>Capital Returned</th>
              <th>Active</th>
              <th style={{ width: "80px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schemas.map((schema, index) => (
              <tr
                key={schema.id || `new-${index}`}
                className={highlightedIndices.includes(index) ? "table-success" : ""}
              >
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={schema.linkedRank || ""}
                    onChange={(e) =>
                      handleChange(index, "linkedRank", e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    {rankOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    // className="form-control form-control-sm"
                    className={`form-control form-control-sm ${validationErrors[index] ? 'is-invalid' : ''
                      }`}
                    value={schema.minimumInvestmentAmount}
                    onChange={(e) =>
                      handleChange(index, "minimumInvestmentAmount", e.target.value)
                    }
                    onBlur={() => handleMinInvestmentBlur(index)}
                  />
                  {validationErrors[index] && (
                    <div className="invalid-feedback">{validationErrors[index]}</div>
                  )}
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
                    // className="form-control form-control-sm"
                    className={`form-control form-control-sm ${validationErrors[index] ? 'is-invalid' : ''
                      }`}
                    value={schema.handlingFee}
                    disabled={true}
                    onChange={(e) =>
                      handleChange(index, "handlingFee", e.target.value)
                    }
                  />
                  {validationErrors[index] && (
                    <div className="invalid-feedback">{validationErrors[index]}</div>
                  )}
                </td>
                <td>
                   <input
                    type="number"
                    className="form-control form-control-sm"
                    value={schema.minimumWithdrawalAmount}
                    disabled={true}
                    onChange={(e) =>
                      handleChange(index, "minimumWithdrawalAmount", e.target.value)
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
                      handleChange(index, "returnSchedule.id", parseInt(e.target.value))
                    }
                  >
                    <option value="">Select</option>
                    {SCHEDULE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={schema.capitalReturned}
                    onChange={(e) =>
                      handleChange(index, "capitalReturned", e.target.checked)
                    }
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={schema.active}
                    onChange={(e) =>
                      handleChange(index, "active", e.target.checked)
                    }
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
        <button className="btn btn-success mt-3" onClick={handleSubmit}>
          Submit Changes
        </button>
      </div>
    </div>
  );
};

export default StakeEditor;
