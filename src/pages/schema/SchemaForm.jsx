import React, { useCallback, useEffect, useState } from 'react';
import PageTitle from '../../components/page_title/PageTitle';
import FormInput from '../../components/form/FormInput';
import FormInputWithUnit from '../../components/form/FormInputWithUnit';
import FormInputWithSelect from '../../components/form/FormInputWithSelect';
import FormInputRange from '../../components/form/FormInputRange';
import Switch from '../../components/form/Switch';
import LoaderOverlay from '../../components/LoaderOverlay';
import { useParams } from 'react-router';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../routes';
import FileInput from '../../components/form/FileInput';
import { CURRENCY_SYMBOL, CURRENCY_UNIT, CURRENCY_UNIT_DEFAULT, MIN_INVEST_AMOUNT } from '../../constants/config';
import Toast from "../../components/toast/Toast";

const scheduleOptions = [
  { label: 'Hourly', value: 1 },
  { label: 'Daily', value: 2 },
  { label: 'Weekly', value: 3 },
  { label: '2 Week', value: 4 },
  { label: 'Monthly', value: 5 }
];

const investmentTypeOptions = [
  { label: 'Standard', value: "STANDARD" },
  { label: 'Stake', value: "STAKE" }
];


const fields = [
  { label: "Investment Type", name: "investmentType", type: "select", options: investmentTypeOptions},
  { type: "DIV", name: "div_2", conditionalOn: { field: "investmentType", value: "STANDARD" } },

  { label: "Schema Name", name: "name", inputType: "text", type: "text" },
  { label: "Schema Badge", name: "schemaBadge", inputType: "text", type: "text", conditionalOn: { field: "investmentType", value: "STANDARD" } },

  // Toggle: Fixed = true, Range = false
  { label: "Schema Type", name: "schemaType", type: "toggle", labels: ["Fixed", "Range"] },

  // Only show when schema_type is Fixed (true)
  { label: "Stake Price", name: "stakePrice", inputType: "number", unit: CURRENCY_UNIT, type: "unit", conditionalOn: { field: "investmentType", value: "STAKE" } },
  { label: "Amount", name: "minimumInvestmentAmount", inputType: "number", unit: CURRENCY_UNIT, type: "unit", conditionalOn: {all: [{ field: "schemaType", value: true }, { field: "investmentType", not: "STAKE" }] }},
  { label: "Range", name: "amount_range", type: "range", min: 0, max: 0, conditionalOn: { field: "schemaType", value: false } },

  // Only show when schema_type is Range (false)
  // { label: "Min Amount", name: "min_amount", inputType: "number", unit: CURRENCY_UNIT, type: "unit", conditionalOn: { field: "schema_type", value: false } },
  // { label: "Max Amount", name: "max_amount", inputType: "number", unit: CURRENCY_UNIT, type: "unit", conditionalOn: { field: "schema_type", value: false } },

  { label: "Return Of Interest", name: "returnRate", inputType: "number", type: "number_with_select" },
  { label: "Return Period", name: "returnScheduleId", type: "select", options: scheduleOptions },

  // Toggle: Period = true, Lifetime = false
  { label: "Return Type", name: "returnType", type: "toggle", labels: ["Period", "Lifetime"] },

  // Only show if return_type is Period (true)
  { type: "DIV", name: "div_1", conditionalOn: { field: "returnType", value: false } },
  { label: "Number of Period", name: "totalReturnPeriods", inputType: "number", unit: "Times", type: "unit", conditionalOn: { field: "returnType", value: true } },


  { label: "Capital Back", name: "capitalReturned", type: "toggle", labels: ["Yes", "No"] },
  { label: "Featured", name: "featured", type: "toggle", labels: ["Yes", "No"] },

  // Toggle: Yes = true
  { label: "Schema Cancel", name: "cancellable", type: "toggle", labels: ["Yes", "No"] },

  // Only show if schema_cancel is Yes (true)
  { label: "Cancel Expiry (Minutes)", name: "cancellationGracePeriodMinutes", inputType: "number", type: "number", conditionalOn: { field: "cancellable", value: true } },

  { label: "Schema Trending", name: "tradeable", type: "toggle", labels: ["Yes", "No"] },
  { label: "Currency", name: "currency", type: "toggle", labels: [CURRENCY_UNIT, CURRENCY_UNIT_DEFAULT] },
  { label: "Early Exit Penalty", name: "earlyExitPenalty", inputType: "number" },
  { label: "Terms & Condition URL", name: "termsAndConditionsUrl", type: "text" },

  { label: "Description", name: "description", type: "textarea" },
  { label: "Status", name: "status", type: "toggle", labels: ["Active", "Deactivate"] },
];

const interestTypeOptions = [
  { value: 'PERCENTAGE', label: '%' },
  { value: 'FLAT', label: CURRENCY_SYMBOL },
];

const defaultFormState = {
  investmentType: 'STAKE',
  name: '',
  schemaBadge: '',
  schemaType: true, // true = Fixed, false = Range,
  stakePrice: MIN_INVEST_AMOUNT,
  minimumInvestmentAmount: '0',
  maximumInvestmentAmount: '0',
  returnRate: '20',
  returnScheduleId: 2,
  returnType: true,  // true = Period, false = Lifetime
  totalReturnPeriods: 0,
  capitalReturned: true,
  featured: true,
  cancellable: false,
  cancellationGracePeriodMinutes: 0,
  tradeable: true,
  currency: CURRENCY_UNIT,

  status: true, // Active
  off_days: [],
  schema_img: null,
};

const getChangedFields = (original, current) => {
  const changes = {};
  for (const key in current) {
    const originalValue = original[key];
    const currentValue = current[key];

    // If value changed (shallow compare)
    if (originalValue !== currentValue) {
      changes[key] = currentValue;
    }
  }
  return changes;
};

const SchemaForm = () => {
  const { schemaId } = useParams();
  const isEditMode = !!schemaId;
  const [formData, setFormData] = useState({ ...defaultFormState });
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchSchemaInfo = async () => {
      try {
        const response = await apiClient.get(API_ROUTES.SCHEMAS.BY_ID(schemaId));
        const data = response.data;
        const normalizedData = {
          ...defaultFormState,
          ...data,
          returnScheduleId: String(data.returnSchedule?.id ?? 2),
          schemaType: data.schemaType === 'FIXED',
          returnType: data.returnType === 'PERIOD',
          currency: data.currency === CURRENCY_UNIT,
          capitalReturned: data.capitalReturned,
          featured: data.featured,
          cancellable: data.cancellable,
          tradeable: data.tradeable,
          status: data.active,
          schema_img: null,
        };
        setFormData(normalizedData);
        setInitialData(normalizedData)
      } catch (err) {
        setMessage({ type: 'error', text: err.message });
        console.error("Error fetching schema info:", err);
      } finally {
        setLoading(false);
      }
    };

    if (schemaId) {
      fetchSchemaInfo();
    }
  }, [schemaId]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };





  // Generic change handler
  const handleChange = useCallback((e) => {
    const { name, value, type, files, options } = e.target;   

    if (type === 'file' && files.length > 0) {
      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG and PNG files are allowed!");
        return;
      }
      setScreenshotFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else if (type === 'select-multiple') {
      const selected = Array.from(options).filter(o => o.selected).map(o => o.value);
      setFormData(prev => ({ ...prev, [name]: selected }));
    } else if(name === 'investmentType' && value === 'STAKE') { // Ensure default locking on investmentType change
      setFormData(prev => ({
        ...prev,
        [name]: value,
        schemaType: true,       // Force to Fixed
        returnType: true        // Force to Period
      }));
    } else if (name === 'investmentType' && value === 'STANDARD') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        // don’t override schemaType/returnType
      }));
    } else {
      // Default behavior
      // Find the field definition
      const fieldMeta = fields.find(f => f.name === name);
      const isNumber = fieldMeta?.inputType === 'number' || fieldMeta?.type === 'number';

      setFormData(prev => ({
        ...prev, 
        [name]: isNumber ? parseFloat(value) || 0 : value, 
      }));
    }
  }, []);

  // Toggle handler for switches
  const handleToggle = useCallback((name, enabled, labels) => {
    // Map enabled boolean to Yes/No or Active/Deactivate strings
    // const mapToggle = (fieldName, isEnabled) => {
    //   if (fieldName === 'return_type') return isEnabled ? 'Period' : 'Lifetime';
    //   if (['capital_back', 'featured', 'schema_cancel', 'is_trending'].includes(fieldName))
    //     return isEnabled ? 'Yes' : 'No';
    //   if (fieldName === 'status') return isEnabled ? 'Active' : 'Deactivate';
    //   return isEnabled ? '1' : '0'; // fallback
    // };

    // const value = labels ? (enabled ? labels[0] : labels[1]) : (enabled ? '1' : '0');

    const isStake = formData.investmentType === 'STAKE';
    // Prevent toggling schemaType to Range
    if (isStake && name === 'schemaType' && enabled === false) {
      showToast('Schema Type cannot be "Range" for STAKE investment.', 'error');
      return;
    }

    // Prevent toggling returnType to Lifetime
    if (isStake && name === 'returnType' && enabled === false) {
      showToast('Return Type must be "Period" for STAKE investment.', 'error');
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: enabled,
    }));
  }, [formData, showToast]);

  // Special handlers for number_with_select field
  const handleReturnInterestChange = useCallback((name, val) => {
    console.log(`Changes==>${name} ==>${val}`);
    setFormData(prev => ({ ...prev, [name]: val }));
  }, []);

  const handleInterestTypeChange = useCallback((name, val) => {
    console.log(`Changes==>${name} ==>${val}`);
    setFormData(prev => ({ ...prev, [name]: val }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let payload = {};

      if (isEditMode && initialData) {
        const changes = getChangedFields(initialData, formData);

        if (Object.keys(changes).length === 0) {
          setMessage({ type: 'info', text: 'No changes to save.' });
          setLoading(false);
          return;
        }

        // Normalize specific fields
        if ('schemaType' in changes) changes.schemaType = changes.schemaType ? 'FIXED' : 'RANGE';
        if ('returnType' in changes) changes.returnType = changes.returnType ? 'PERIOD' : 'LIFETIME';
        if ('status' in changes) changes.active = changes.status;
        if ('currency' in changes) changes.currency = changes.currency ? CURRENCY_UNIT : CURRENCY_UNIT_DEFAULT;

        delete changes.status;
        delete changes.schema_img;

        payload = changes;
      } else {
        // Full payload in create mode
        payload = { ...formData };
        payload.schemaType = formData.schemaType ? 'FIXED' : 'RANGE';
        payload.returnType = formData.returnType ? 'PERIOD' : 'LIFETIME';
        payload.active = formData.status;
        payload.currency = formData.currency ? CURRENCY_UNIT : CURRENCY_UNIT_DEFAULT;
        delete payload.schema_img;
      }

      let response;
      if (isEditMode) {
        response = await apiClient.put(API_ROUTES.SCHEMAS.BY_ID(schemaId), payload);
      } else {
        response = await apiClient.post(API_ROUTES.SCHEMAS.BASE, payload);
      }
      setMessage({ type: 'success', text: isEditMode ? 'Schema updated!' : 'Schema created!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Submission failed' });
    } finally {
      setLoading(false);
    }
  };

  const renderField = useCallback((field, index) => {
    // Handle conditional fields
    if (field.conditionalOn) {
      // Support compound conditions
      if (field.conditionalOn.all) {
        const shouldRender = field.conditionalOn.all.every(cond => {
          const val = formData[cond.field];
          if (cond.hasOwnProperty('not')) {
            return val !== cond.not;
          }
          return val === cond.value;
        });
        if (!shouldRender) return null;
      } else {
        const dependentValue = formData[field.conditionalOn.field];
        if (field.conditionalOn.hasOwnProperty('not')) {
          if (dependentValue === field.conditionalOn.not) return null;
        } else {
          if (dependentValue !== field.conditionalOn.value) return null;
        }
      }
    }

      const commonProps = {
        // key: field.name,
        label: field.label,
        name: field.name,
        value: formData[field.name] || '',
        onChange: handleChange,
        disabled: field.disabled || false,
      };

      switch (field.type) {
        case 'DIV':
          return (
            <div className="col-xl-6" key={`${field.name}-${index}`}></div>
          )
        case 'unit':
          return (
            <div className="col-xl-6" key={`${field.name}-${index}`}>
              <FormInputWithUnit {...commonProps} type={field.inputType || 'text'} unit={field.unit} />
            </div>
          );
        case 'textarea':
          return (
            <div className="col-xl-12" key={`${field.name}-${index}`}>
              <div className='site-input-groups'>
                <label className="box-input-label" htmlFor={field.name}>{field.label}</label>
                <textarea
                  name={field.name}
                  className='form-textarea mb-0'
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          );
        case 'select':
          return (
            <div className="col-xl-6" key={`${field.name}-${index}`}>
              <label className="box-input-label" htmlFor={field.name}>
                {field.label}
              </label>
              <select
                className="form-select"
                name={field.name}
                id={field.name}
                //value={field.name === 'returnSchedule' ? formData.returnSchedule.scheduleInHour : formData[field.name]}
                value={formData[field.name] || 2}
                onChange={handleChange}
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        case 'radio':
          return (
            <div className="col-xl-6" key={`${field.name}-${index}`}>
              <label className="box-input-label">{field.label}</label>
              <div className="switch-field same-type">
                {field.options.map((opt) => (
                  <React.Fragment key={opt.value}>
                    <input
                      type="radio"
                      id={`${field.name}-${opt.value}`}
                      name={field.name}
                      value={opt.value}
                      checked={formData[field.name] === opt.value}
                      onChange={handleChange}
                    />
                    <label htmlFor={`${field.name}-${opt.value}`}>{opt.label}</label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        case 'multiselect':
          return (
            <div className="col-xl-12" key={`${field.name}-${index}`}>
              <label className="box-input-label" htmlFor={field.name}>
                {field.label}
              </label>
              <select
                multiple
                name={field.name}
                id={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="form-select"
                size={field.options.length}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        case 'toggle':
          const isStake = formData.investmentType === 'STAKE';
          const disableForStake = isStake && (field.name === 'schemaType' || field.name === 'returnType');

          return (
            <div className="col-xl-6" key={`${field.name}-${index}`}>
              <label className="box-input-label">{field.label}</label>
              <Switch
                name={field.name}
                enabled={!!formData[field.name]} // Coerce to boolean
                labels={field.labels}
                disabled={disableForStake}
                style={{ padding: '13px 16px' }}
                onToggle={(name, value) => handleToggle(name, value)}
              />

            </div>
          );
        case 'number_with_select':
          return (
            <div className="col-xl-6" key={`${field.name}-${index}`}>
              <FormInputWithSelect
                label={field.label}
                inputName={field.name} // returnRate
                inputValue={formData[field.name]  ?? ''}
                onInputChange={(name, value) => handleReturnInterestChange(name, value)}handleChange
                // onInputChange={(name, value) => handleChange(name, value)}handleChange
                inputPlaceholder=""
                selectName="interestCalculationMethod"
                selectValue={formData.interestCalculationMethod || 'PERCENTAGE'}
                onSelectChange={(val) => handleInterestTypeChange('interestCalculationMethod', val)}
                selectOptions={interestTypeOptions}
                disabled={false}
              />
            </div>
          );
        case 'number':
          return (
            <div className="col-xl-6" key={`${field.name}-${index}`}>
              <FormInput
                {...commonProps}
                type={field.inputType || 'number'}
                min={0}
                max={field.max || undefined}
                value={formData[field.name]}
              />
            </div>
          );
        case 'range':
          return (
            <div className="col-xl-6 row" key={`${field.name}-${index}`}>
              <FormInputRange
                minValue={formData.minimumInvestmentAmount || ''}
                maxValue={formData.maximumInvestmentAmount || ''}
                minName="minimumInvestmentAmount"
                maxName='maximumInvestmentAmount'
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({ ...prev, [name]: value }));
                }}
              />
            </div>
          );
        default:
          return (
            <div className="col-xl-6" key={`${field.name}-${index}`}>
              <FormInput {...commonProps} type={field.inputType || 'text'} />
            </div>
          );
      }
    },
    [formData, handleChange, handleToggle, handleInterestTypeChange, handleReturnInterestChange]
  );

  return (
    <div className="main-content">
      <PageTitle title={isEditMode ? 'Edit Schema' : 'Add New Schema'} />
      {loading && <LoaderOverlay />}

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-12 col-md-12">
            <div className="site-card">
              <div className="site-card-body">
                <div className="col-xl-12 mb-4">
                  <div className="row">
                    <div className="col-xl-3">
                      <div className="site-input-groups">
                        <label className="box-input-label" htmlFor="schema-icon">Upload Icon:</label>
                        <div className="wrap-custom-file">
                          <FileInput
                            name="screenshot"
                            file={screenshotFile}
                            previewUrl={previewUrl}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="row">
                  <div className="row mb-4">{fields.map((field, index) => renderField(field, index))}</div>

                  <button type="submit" className="site-btn-sm primary-btn w-100" disabled={loading}>
                    {loading ? (isEditMode ? 'Updating...' : 'Saving...') : isEditMode ? 'Update Schema' : 'Create Schema'}
                  </button>

                  {message && (
                    <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'} mt-4`}>
                      {message.text}
                    </div>
                  )}
                </form>
              </div>
              {toast && (
                <Toast
                  message={toast.message}
                  type={toast.type}
                  onClose={() => setToast(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaForm;
