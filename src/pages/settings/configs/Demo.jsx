// ConfigEditor.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../apiClient"; // adjust path if needed
import "./config.css"; // reuse your CSS

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
      const { data } = await apiClient.get("/api/v1/configs");
      setConfigs(data);
      setFiltered(data);
      const initialState = {};
      data.forEach((c) => (initialState[c.key] = c.value));
      setConfigState(initialState);
      setDefaultConfigState(initialState);
    } catch (err) {
      alert("Failed to load configs: " + err.message);
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
      await apiClient.put("/api/v1/configs/update", changed);
      alert("Configs updated successfully");
      setDefaultConfigState({ ...configState });
    } catch (err) {
      alert("Failed to update configs: " + err.message);
    }
  };

  // ➕ Add config
  const handleAddConfig = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/api/v1/configs/add", newConfig);
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
      alert("Failed to add configuration: " + err.message);
    }
  };

  // 🔄 Reload
  const reloadConfig = async () => {
    try {
      await apiClient.post("/api/v1/configs/reload");
      alert("Configs loaded successfully");
    } catch (err) {
      alert("Failed to reload configs: " + err.message);
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
    <div className="container">
      {/* Left: Config Editor */}
      <div className="wrapper">
        <section className="card">
          <div className="header">
            <h2>App Configuration Editor</h2>
            <div className="button-container">
              <button className="add-button" onClick={reloadConfig}>
                🔄 Reload Config
              </button>
            </div>
          </div>
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

      {/* Right: Add + Export */}
      <div className="rightContainer">
        <div className="card">
          <div className="header">
            <h2>Add New Configuration</h2>
          </div>
          <form className="config-form" onSubmit={handleAddConfig}>
            <label>
              Key:
              <input
                type="text"
                value={newConfig.key}
                onChange={(e) =>
                  setNewConfig({ ...newConfig, key: e.target.value })
                }
                required
              />
            </label>
            <label>
              Value:
              <input
                type="text"
                value={newConfig.value}
                onChange={(e) =>
                  setNewConfig({ ...newConfig, value: e.target.value })
                }
                required
              />
            </label>
            <label>
              Application:
              <input type="text" value={newConfig.application} disabled />
            </label>
            <label>
              Profile:
              <input type="text" value={newConfig.profile} disabled />
            </label>
            <label>
              Label:
              <input
                type="text"
                value={newConfig.label}
                onChange={(e) =>
                  setNewConfig({ ...newConfig, label: e.target.value })
                }
              />
            </label>
            <label>
              Info:
              <input
                type="text"
                value={newConfig.info}
                onChange={(e) =>
                  setNewConfig({ ...newConfig, info: e.target.value })
                }
              />
            </label>
            <button type="submit">Add Configuration</button>
          </form>
        </div>

        <div className="card">
          <div className="header">
            <h2>Export Configuration</h2>
          </div>
          <div className="button-container">
            <button className="add-button" onClick={exportToProperty}>
              📝 Export to <code>application.properties</code>
            </button>
            <button className="add-button" onClick={exportToYaml}>
              📄 Export to <code>application.yml</code>
            </button>
          </div>
          <div className="output">
            <textarea rows="15" cols="100" value={exportOutput} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigEditor;
