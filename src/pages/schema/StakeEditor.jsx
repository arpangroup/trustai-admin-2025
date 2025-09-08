import React, { useEffect, useRef, useState } from "react";
import { LuPlus, LuTrash } from "react-icons/lu";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../routes";
import { SCHEDULE_OPTIONS } from "../../constants/config";
import FormInput from "../../components/form/FormInput";
import FormDropdown from "../../components/form/FormDropdown";
import SchemaInputField from "./components/SchemaInputField ";
import SchemaSelectField from "./components/SchemaSelectField";
import './StakeEditor.css';
import ImageUploadCell from "../../components/form/file/ImageUploadCell";
import FileUploadWithInput from "../../components/form/upload/FileUploadWithInput ";

const FIELD_DEFINITIONS = [
  { key: "linkedRank", label: "Linked Rank", type: "select", optionsKey: "rankOptions", thStyle: { minWidth: "120px" } },
  { key: "minimumInvestmentAmount", label: "Min Invest", type: "number", blurHandler: "handleMinInvestmentBlur", validationKey: true },
  { key: "returnRate", label: "Return Rate (%)", type: "number" },
  { key: "handlingFee", label: "Handling Fee", type: "number", disabled: true },
  { key: "minimumWithdrawalAmount", label: "Minimum Withdraw", type: "number", disabled: true },
  { key: "totalReturnPeriods", label: "Duration (Days)", type: "number" },
  { key: "returnSchedule.id", label: "Schedule", type: "select", optionsKey: "SCHEDULE_OPTIONS" },
  { key: "imageUrl", label: "Image", type: "image", thStyle: { minWidth: "150px" } },
  { key: "capitalReturned", label: "Capital Returned", type: "checkbox" },
  { key: "active", label: "Active", type: "checkbox" },
];

const StakeEditor = () => {
  const [schemas, setSchemas] = useState([]);
  const [rankOptions, setRankOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [modifiedRows, setModifiedRows] = useState(new Set());
  const [newRows, setNewRows] = useState(new Set());
  const [fullRankList, setFullRankList] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const bottomRef = useRef(null);

  useEffect(() => {
    Promise.all([
      apiClient.get(API_ROUTES.SCHEMAS.FILTER({ type: 'STAKE' })),
      apiClient.get(API_ROUTES.RANKINGS.BASE),
    ])
      .then(([schemaRes, rankRes]) => {
        const ranks = rankRes?.data || [];
        const stakes = schemaRes?.data?.content || [];

        //console.log("STAKES: ", schemaRes);
        //console.log("RANKS: ", ranks);
        setFullRankList(ranks);
        setRankOptions(
          ranks.filter((r) => r.active).map((r) => ({ label: r.code, value: r.code }))
        );
        const enrichedSchemas = (stakes).map((schema) => ({
          ...schema,
          linkedRank: schema.linkedRank || "",
          returnSchedule: { id: schema.returnSchedule?.id || 2 },
          imageUrl: schema.imageUrl ? { file: schema.imageUrl, preview: schema.imageUrl } : null,
          _original: {
            minimumInvestmentAmount: schema.minimumInvestmentAmount,
            maximumInvestmentAmount: schema.maximumInvestmentAmount,
            returnRate: schema.returnRate,
            totalReturnPeriods: schema.totalReturnPeriods,
            returnScheduleId: schema.returnSchedule?.id,
            linkedRankCode: schema.linkedRank,
            capitalReturned: schema.capitalReturned,
            imageUrl: schema.imageUrl || null,
            active: schema.active,
          },
        }));
        setSchemas(enrichedSchemas);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...schemas];
    const keys = field.split(".");
    if (keys.length === 2) {
      updated[index][keys[0]] = { ...updated[index][keys[0]], [keys[1]]: value };
    } else {
      updated[index][field] = value;
    }

    if (!newRows.has(index)) {
      setModifiedRows((prev) => new Set(prev).add(index));
    }

    if (field === "linkedRank") {
      const fullRank = fullRankList.find((r) => r.code === value);
      if (fullRank) {
        updated[index].minimumInvestmentAmount = fullRank.minInvestmentAmount;
      }
    }

    setSchemas(updated);
  };

  const handleImageChange = (index, fileOrUrl) => {
    const updated = [...schemas];
    //console.log("fileOrUrl: ", fileOrUrl);  

    updated[index].imageUrl = {
      file: fileOrUrl,
      preview: fileOrUrl instanceof File
        ? URL.createObjectURL(fileOrUrl)
        : fileOrUrl, // direct URL from modal
    };
    setSchemas(updated);
    setModifiedRows((prev) => new Set(prev).add(index));
  };

  const handleImageDelete = (index) => {
    const updated = [...schemas];
    updated[index].imageUrl = null;
    setSchemas(updated);
    setModifiedRows((prev) => new Set(prev).add(index));
  };

  const handleMinInvestmentBlur = (index) => {
    const schema = schemas[index];
    const rankCode = schema.linkedRank;
    const currentRank = fullRankList.find((r) => r.code === rankCode);
    if (!currentRank) return;

    const sortedRanks = [...fullRankList].sort(
      (a, b) => a.minInvestmentAmount - b.minInvestmentAmount
    );
    const currentIndex = sortedRanks.findIndex((r) => r.code === rankCode);
    const nextRank = sortedRanks[currentIndex + 1];
    const min = currentRank.minInvestmentAmount;
    const max = nextRank ? nextRank.minInvestmentAmount : Infinity;
    const value = Number(schema.minimumInvestmentAmount);

    if (isNaN(value) || value < min || value >= max) {
      setValidationErrors((prev) => ({
        ...prev,
        [index]: `Min. investment should be between ${min} and ${
          max === Infinity ? "∞" : max
        }`,
      }));
      const updated = [...schemas];
      updated[index].minimumInvestmentAmount = min;
      setSchemas(updated);
    } else {
      const { [index]: _, ...rest } = validationErrors;
      setValidationErrors(rest);
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
      active: true,
    };
    const updated = [...schemas];
    updated.splice(index + 1, 0, newRow);
    setSchemas(updated);
    setNewRows((prev) => new Set(prev).add(index + 1));
    setHighlightedIndices((prev) => [...prev, index + 1]);
  };

  const handleAddNewStake = () => {
    const newRow = {
      linkedRank: "RANK_0",
      minimumInvestmentAmount: "",
      maximumInvestmentAmount: "",
      returnRate: "",
      totalReturnPeriods: "",
      returnSchedule: { id: 2 },
      capitalReturned: true,
      active: true,
      imageUrl: null,
    };
    setSchemas((prev) => [...prev, newRow]);
    setNewRows((prev) => new Set(prev).add(schemas.length));
    setHighlightedIndices((prev) => [...prev, schemas.length]);

    // 🔹 Scroll after a small delay to ensure DOM updates
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDeleteRow = async (schemaId) => {
    if (!schemaId) return;
    if (!window.confirm("Are you sure you want to delete this schema?")) return;
    try {
      await apiClient.delete(API_ROUTES.RANK_CONFIGS_BY_ID(schemaId));
      setSchemas((prev) => prev.filter((s) => s.id !== schemaId));
    } catch {
      alert("Failed to delete schema.");
    }
  };

  const handleSubmit = async () => {
    const payload = schemas
      .map((schema, index) => {
        if (Object.keys(validationErrors).length > 0) return;

        if (newRows.has(index)) {
          return {
            linkedRankCode: schema.linkedRank,
            minimumInvestmentAmount: schema.minimumInvestmentAmount,
            maximumInvestmentAmount: schema.maximumInvestmentAmount,
            returnRate: schema.returnRate,
            totalReturnPeriods: schema.totalReturnPeriods,
            returnScheduleId: schema.returnSchedule?.id,
            capitalReturned: schema.capitalReturned,
            imageUrl: schema.imageUrl.file,
            active: schema.active,
          };
        }

        if (modifiedRows.has(index) && schema._original) {
          const modified = { id: schema.id };
          const { _original } = schema;
          if (schema.minimumInvestmentAmount !== _original.minimumInvestmentAmount)
            modified.minimumInvestmentAmount = schema.minimumInvestmentAmount;
          if (schema.maximumInvestmentAmount !== _original.maximumInvestmentAmount)
            modified.maximumInvestmentAmount = schema.maximumInvestmentAmount;
          if (schema.returnRate !== _original.returnRate)
            modified.returnRate = schema.returnRate;
          if (schema.totalReturnPeriods !== _original.totalReturnPeriods)
            modified.totalReturnPeriods = schema.totalReturnPeriods;
          if ((schema.returnSchedule?.id || 2) !== _original.returnScheduleId)
            modified.returnScheduleId = schema.returnSchedule?.id;
          if (schema.linkedRank !== _original.linkedRankCode)
            modified.linkedRankCode = schema.linkedRank;
          if (schema.capitalReturned !== _original.capitalReturned)
            modified.capitalReturned = schema.capitalReturned; 
          if (schema.active !== _original.active)
            modified.active = schema.active;

          const oldImage = _original.imageUrl;
          const newImage = schema.imageUrl;

          const newFile = newImage?.file ?? null;

          console.log("oldImage: ", oldImage);
          console.log("newImage: ", newImage);
          console.log("newFile: ", newFile);
          if (oldImage !== newFile) {
            modified.imageUrl = newFile; // Will be File object or null
          }

          return Object.keys(modified).length > 1 ? modified : null;
        }

        return null;
      })
      .filter(Boolean);

    try {
      await apiClient.post(API_ROUTES.RANK_CONFIGS_BULK_UPSERT, payload);
      alert("Schemas updated successfully");
      window.location.reload();
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) return <div>Loading investment schemas...</div>;

  return (
    <div className="main-content">
      <div className="title-content mt-4 d-flex justify-content-between align-items-center">
        <h2>Stakes</h2>
        <button className="btn btn-primary btn-sm" onClick={handleAddNewStake}>
        + Add New Stake
      </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm align-middle">
          <thead className="table-light">
            <tr>
              {FIELD_DEFINITIONS.map((field) => (
                <th key={field.key} style={field.thStyle}>{field.label}</th>
              ))}
              {/* <th style={{ width: "80px" }}>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {schemas.map((schema, index) => (
              <tr key={schema.id || `new-${index}`} className={highlightedIndices.includes(index) ? "table-success" : ""}>
                {FIELD_DEFINITIONS.map((field) => {
                  const keys = field.key.split(".");
                  const value = keys.reduce((obj, k) => obj?.[k], schema);
                  const onChange = (e) => {
                    const val = field.type === "checkbox" ? e.target.checked : e.target.value;
                    handleChange(index, field.key, field.type === "number" ? Number(val) : val);
                  };
                  const onBlur = field.blurHandler === "handleMinInvestmentBlur"
                    ? () => handleMinInvestmentBlur(index)
                    : undefined;
                  const isInvalid = validationErrors[index] && field.validationKey;
                  const feedback = isInvalid ? validationErrors[index] : "";

                  const sharedProps = {
                    value,
                    onChange,
                    onBlur,
                    disabled: field.disabled,
                    isInvalid,
                    feedback,
                  };

                  if (field.type === "select") {
                    const options = field.optionsKey === "SCHEDULE_OPTIONS" ? SCHEDULE_OPTIONS : rankOptions;
                    return (
                      <td key={field.key}>
                        {/* <SchemaSelectField {...sharedProps} options={options} /> */}
                       <FormDropdown
                          name={field.key}
                          label=""
                          options={options}
                          value={schema[field.key] || ''}
                          onChange={(e) => handleChange(index, field.key, e.target.value)}
                          // onBlur={() => handleBlur && handleBlur(index, field.key)}
                          // required={required}
                          error={validationErrors[index]?.[field.key] || ''}
                          className="form-control form-control-sm"
                          wrapperClass='col-12'
                        />
                      </td>
                    );
                  }

                  if (field.type === "checkbox") {
                    return (
                      <td key={field.key} className="text-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={!!value}
                          onChange={onChange}
                        />
                      </td>
                    );
                  }

                  if (field.type === "image") {
                    return (
                      <td key={field.key}>
                        <ImageUploadCell
                          image={schema.imageUrl}
                          onChange={(file) => handleImageChange(index, file)}
                          onDelete={() => handleImageDelete(index)}
                          previewWidth={48}
                          previewHeight={48}
                        />
                      </td>
                    );
                  }

                  return (
                    <td key={field.key}>
                      {/* <SchemaInputField type="number" {...sharedProps} /> */}
                      <FormInput
                        type="number"
                        name={field.key}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={field.disabled}
                        error={isInvalid ? validationErrors[index] : ""}
                        className="form-control"
                        wrapperClass='col-12'
                      />
                    </td>
                  );
                })}
                {/* <td className="text-center">
                  <LuPlus size={18} color="green" style={{ cursor: "pointer", marginRight: 8 }} onClick={() => handleAddRowBelow(index)} />
                  {schema.id && (
                    <LuTrash size={18} color="red" style={{ cursor: "pointer" }} onClick={() => handleDeleteRow(schema.id)} />
                  )}
                </td> */}
              </tr>
            ))}

            {/* 🔹 Scroll target */}
            <tr ref={bottomRef} />
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
