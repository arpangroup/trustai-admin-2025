// ConfigEditor.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../../../api/apiClient"; // adjust path if needed
import "./ConfigEditor.css"; // reuse your CSS
import { API_ROUTES } from "../../../routes";

const ConfigEditor = () => {
    const [configs, setConfigs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [configState, setConfigState] = useState({});
    const [defaultConfigState, setDefaultConfigState] = useState({});
    const [newConfig, setNewConfig] = useState({
        key: "",
        value: "",
        application: "nft_app",
        profile: "dev",
        label: "",
        info: "",
    });
    const [exportOutput, setExportOutput] = useState("");

    // 🔄 Load configs
    const loadConfigs = async () => {
        try {
            const { data } = await apiClient.get(API_ROUTES.CONFIGS.GET);
            setConfigs(data);
            setFiltered(data);
            const initialState = {};
            data.forEach((c) => (initialState[c.key] = c.value));
            setConfigState(initialState);
            setDefaultConfigState(initialState);
        } catch (err) {
            console.log("Failed to load configs: " + err.message);
        }
    };

    // 🔎 Filter configs
    useEffect(() => {
        const lower = search.toLowerCase();
        setFiltered(
            configs.filter((c) => c.key.toLowerCase().includes(lower))
        );
    }, [search, configs]);

    useEffect(() => {
        loadConfigs();
    }, []);

    // 📝 Handle config value change
    const handleConfigChange = (key, value) => {
        setConfigState((prev) => ({ ...prev, [key]: value }));
    };

    // 🚀 Update configs
    const updateConfigs = async () => {
        const changed = Object.entries(configState)
            .filter(([k, v]) => v !== defaultConfigState[k])
            .map(([k, v]) => ({ key: k, value: v }));

        if (changed.length === 0) {
            alert("No changes to update.");
            return;
        }

        try {
            await apiClient.put(API_ROUTES.CONFIGS.UPDATE, changed);
            alert("Configs updated successfully");
            setDefaultConfigState({ ...configState });
        } catch (err) {
            console.log("Failed to update configs: " + err.message);
        }
    };

    // ➕ Add config
    const handleAddConfig = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post(API_ROUTES.CONFIGS.ADD, newConfig);
            alert("Configuration added successfully");
            setNewConfig({
                key: "",
                value: "",
                application: "nft_app",
                profile: "dev",
                label: "",
                info: "",
            });
            await loadConfigs();
        } catch (err) {
            console.log("Failed to add configuration: " + err.message);
        }
    };

    // 🔄 Reload
    const reloadConfig = async () => {
        try {
            await apiClient.post(API_ROUTES.CONFIGS.RELOAD);
            alert("Configs loaded successfully");
        } catch (err) {
            console.log("Failed to reload configs: " + err.message);
        }
    };

    // 📝 Export to .properties
    const exportToProperty = () => {
        const properties = Object.entries(configState)
            .map(([k, v]) => `${k}=${v}`)
            .join("\n");
        setExportOutput(properties);
    };

    // 📄 Export to .yml
    const exportToYaml = () => {
        const nested = {};
        for (const [fullKey, value] of Object.entries(configState)) {
            const keys = fullKey.split(".");
            let current = nested;
            keys.forEach((k, i) => {
                if (i === keys.length - 1) {
                    current[k] = value;
                } else {
                    current[k] = current[k] || {};
                    current = current[k];
                }
            });
        }
        const convert = (obj, indent = 0) => {
            const spaces = " ".repeat(indent);
            return Object.entries(obj)
                .map(([k, v]) =>
                    typeof v === "object"
                        ? `${spaces}${k}:\n${convert(v, indent + 2)}`
                        : `${spaces}${k}: ${v}`
                )
                .join("\n");
        };
        setExportOutput(convert(nested));
    };

    return (
        <div className="main-content">            
            <div className="container">
                <div className="col-6">
                    <section className="card">
                        <input
                            type="text"
                            placeholder="🔍 Search config keys..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            id="configSearch"
                        />

                        <div id="configContainer">
                            {filtered.map((cfg) => (
                                <div key={cfg.key} className="config-item">
                                    <label>
                                        {cfg.key}
                                        {cfg.info && (
                                            <span
                                                className="info-icon"
                                                title={cfg.info}
                                                onClick={() => alert(cfg.info)}
                                            >
                                                ⓘ
                                            </span>
                                        )}
                                    </label>
                                    {cfg.valueType === "BOOLEAN" ||
                                        cfg.value === "true" ||
                                        cfg.value === "false" ? (
                                        <input
                                            type="checkbox"
                                            checked={configState[cfg.key] === "true"}
                                            onChange={(e) =>
                                                handleConfigChange(cfg.key, e.target.checked.toString())
                                            }
                                        />
                                    ) : cfg.enumValues ? (
                                        <select
                                            value={configState[cfg.key] || ""}
                                            onChange={(e) => handleConfigChange(cfg.key, e.target.value)}
                                        >
                                            {cfg.enumValues.split(",").map((opt) => (
                                                <option key={opt.trim()} value={opt.trim()}>
                                                    {opt.trim()}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={
                                                ["INT", "FLOAT", "DOUBLE", "BIG_DECIMAL"].includes(
                                                    cfg.valueType
                                                )
                                                    ? "number"
                                                    : "text"
                                            }
                                            value={configState[cfg.key] || ""}
                                            onChange={(e) =>
                                                handleConfigChange(cfg.key, e.target.value)
                                            }
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <button onClick={updateConfigs} className="update-button">
                            Update Configs
                        </button>
                    </section>
                </div>
                <div className="col-6">
                    <section className="card">
                        <div className="" style={{position: 'relative'}}>
                            <h5>Add New Configuration</h5>
                            
                            <div className="reload-btn">
                                <button className="btn btn-outline-secondary" onClick={reloadConfig}>
                                    🔄 Reload Config
                                </button>
                            </div>                            
                        </div>


                        <form className="row" onSubmit={handleAddConfig}>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Key</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={newConfig.key}
                                    onChange={(e) =>
                                    setNewConfig({ ...newConfig, key: e.target.value })}
                                    placeholder="Example input placeholder"
                                    required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">Value</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={newConfig.value}
                                    onChange={(e) =>
                                    setNewConfig({ ...newConfig, value: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Add Configuration
                            </button>
                        </form>
                    </section>

                    <section className="card mt-4">
                        <h5>Export</h5>
                        <div className="button-container">
                            <button className="btn btn-outline-secondary" onClick={exportToProperty}>
                            📝 Export to <code>application.properties</code>
                            </button>
                            <button className="btn btn-outline-success" onClick={exportToYaml}>
                            📄 Export to <code>application.yml</code>
                            </button>
                        </div>

                        <div className="form-floating output">
                            <textarea 
                                className="form-control" 
                                value={exportOutput} 
                                readOnly
                                style={{height: '100px'}}/>
                            <label htmlFor="floatingTextarea2">Output</label>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    );
};

export default ConfigEditor;
