import React, { useState, useEffect } from 'react';
import './ConfigManagement.css';

const initialConfigs = [
  { id: 1, group: 'Mail Config', key: 'smtpHost', value: 'smtp.example.com', type: 'text', originalValue: 'smtp.example.com', isChanged: false },
  { id: 2, group: 'Mail Config', key: 'smtpPort', value: '587', type: 'number', originalValue: '587', isChanged: false },
  { id: 3, group: 'Mail Config', key: 'isSecure', value: 'true', type: 'boolean', originalValue: 'true', isChanged: false },
  { id: 4, group: 'Income Config', key: 'taxRate', value: '0.2', type: 'number', originalValue: '0.2', isChanged: false },
  { id: 5, group: 'Income Config', key: 'currency', value: 'USD', type: 'enum', enumOptions: ['USD', 'EUR', 'GBP'], originalValue: 'USD', isChanged: false },
];

const ConfigManagement = () => {
  const [configs, setConfigs] = useState(initialConfigs);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate fetching configs from a server (replace with actual API call)
  useEffect(() => {
    // Example: fetch('/api/configs').then(res => res.json()).then(data => setConfigs(data));
    setConfigs(initialConfigs);
  }, []);

  const handleAddConfig = () => {
    const group = prompt('Enter group name:', 'New Group').trim();
    const type = prompt('Enter field type (text, number, boolean, enum):', 'text').toLowerCase();
    const validTypes = ['text', 'number', 'boolean', 'enum'];
    const fieldType = validTypes.includes(type) ? type : 'text';
    let defaultValue = fieldType === 'boolean' ? 'false' : fieldType === 'number' ? '0' : '';
    let enumOptions = [];
    if (fieldType === 'enum') {
      const optionsInput = prompt('Enter ENUM options (comma-separated):', 'Option1,Option2,Option3');
      if (optionsInput) {
        enumOptions = optionsInput.split(',').map(opt => opt.trim()).filter(opt => opt);
        defaultValue = enumOptions[0] || '';
      } else {
        enumOptions = ['Option1', 'Option2', 'Option3'];
        defaultValue = enumOptions[0];
      }
    }
    const newConfig = {
      id: configs.length + 1,
      group,
      key: '',
      value: defaultValue,
      type: fieldType,
      enumOptions: fieldType === 'enum' ? enumOptions : [],
      originalValue: defaultValue,
      isChanged: false,
    };
    setConfigs([...configs, newConfig].sort((a, b) => {
      const gA = a.group.toLowerCase();
      const gB = b.group.toLowerCase();
      if (gA !== gB) return gA.localeCompare(gB);
      return a.key.toLowerCase().localeCompare(b.key.toLowerCase());
    }));
  };

  const handleValueChange = (id, newValue) => {
    setConfigs(configs.map(config => 
      config.id === id ? { ...config, value: newValue, isChanged: newValue !== config.originalValue } : config
    ));
  };

  const handleUpdate = (id) => {
    setConfigs(configs.map(config => 
      config.id === id ? { ...config, originalValue: config.value, isChanged: false } : config
    ));
  };

  const handleEditEnum = (id) => {
    const config = configs.find(c => c.id === id);
    const newOptions = prompt('Enter ENUM options (comma-separated):', config.enumOptions.join(','));
    if (newOptions) {
      const optionsArray = newOptions.split(',').map(opt => opt.trim()).filter(opt => opt);
      if (optionsArray.length > 0) {
        const newValue = optionsArray.includes(config.value) ? config.value : optionsArray[0];
        setConfigs(configs.map(c => 
          c.id === id ? { ...c, enumOptions: optionsArray, value: newValue, originalValue: newValue, isChanged: false } : c
        ).sort((a, b) => {
          const gA = a.group.toLowerCase();
          const gB = b.group.toLowerCase();
          if (gA !== gB) return gA.localeCompare(gB);
          return a.key.toLowerCase().localeCompare(b.key.toLowerCase());
        }));
      }
    }
  };

  const handleInputChange = (id, field, value) => {
    setConfigs(configs.map(config => 
      config.id === id ? { ...config, [field]: value } : config
    ).sort((a, b) => {
      const gA = a.group.toLowerCase();
      const gB = b.group.toLowerCase();
      if (gA !== gB) return gA.localeCompare(gB);
      return a.key.toLowerCase().localeCompare(b.key.toLowerCase());
    }));
  };

  const filteredConfigs = configs.filter(config => 
    config.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedConfigs = filteredConfigs.reduce((acc, config) => {
    if (!acc[config.group]) {
      acc[config.group] = [];
    }
    acc[config.group].push(config);
    return acc;
  }, {});

  const renderValueField = (config) => {
    const { id, type, value, enumOptions } = config;
    if (type === 'boolean') {
      return (
        <label className="toggle">
          <input
            type="checkbox"
            checked={value === 'true'}
            onChange={(e) => handleValueChange(id, e.target.checked.toString())}
            className="value"
          />
          <span className="slider"></span>
        </label>
      );
    } else if (type === 'enum') {
      return (
        <div className="d-flex align-items-center">
          <select
            value={value}
            onChange={(e) => handleValueChange(id, e.target.value)}
            className="form-select enum-select"
          >
            {enumOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <button
            onClick={() => handleEditEnum(id)}
            className="btn btn-link p-0 ms-2"
            title="Edit ENUM options"
          >
            ✎
          </button>
        </div>
      );
    } else if (type === 'number') {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => handleValueChange(id, e.target.value)}
          className="form-control"
        />
      );
    } else {
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => handleValueChange(id, e.target.value)}
          className="form-control"
        />
      );
    }
  };

  return (
    
    <div className="main-content">
    <div className="container-fluid bg-light min-vh-100 p-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              placeholder="Search by key..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control w-50"
            />
            <button
              onClick={handleAddConfig}
              className="btn btn-primary"
            >
              Add New Config
            </button>
          </div>
          <div className="table-responsive">
            {Object.keys(groupedConfigs).sort().map(group => (
              <div key={group} className="mb-4">
                <h3 className="group-header">{group || 'Ungrouped'}</h3>
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedConfigs[group].map(config => (
                      <tr key={config.id}>
                        <td>
                          <input
                            type="text"
                            value={config.key}
                            onChange={(e) => handleInputChange(config.id, 'key', e.target.value)}
                            className="form-control"
                          />
                        </td>
                        <td className={config.isChanged ? 'changed' : ''}>
                          {renderValueField(config)}
                        </td>
                        <td>
                          <button
                            onClick={() => handleUpdate(config.id)}
                            className={`btn btn-sm ${config.isChanged ? 'btn-success' : 'btn-secondary'}`}
                            disabled={!config.isChanged}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ConfigManagement;