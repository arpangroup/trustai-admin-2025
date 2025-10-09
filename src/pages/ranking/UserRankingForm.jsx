import React, { useEffect, useState } from 'react';
import UploadIcon from '../../assets/icons/upload.svg';

import PageTitle from '../../components/page_title/PageTitle';
import FormInput from "../../components/form/FormInput";
import FormInputWithUnit from "../../components/form/FormInputWithUnit";
import Switch from '../../components/form/Switch';
import LoaderOverlay from "../../components/LoaderOverlay";
import { useParams } from 'react-router';
import apiClient from '../../api/apiClient';

const CURRENCY_UNIT  = "INR";

const fields = [
  { label: "Ranking", name: "ranking" },
  { label: "Ranking Name", name: "code" },
  { label: "Minimum Deposit", name: "minimum_deposit", unit: CURRENCY_UNIT , type: "unit", inputType: "number" },
  { label: "Minimum Invest", name: "minimum_invest", unit: CURRENCY_UNIT , type: "unit", inputType: "number" },
  { label: "Minimum Referral", name: "minimum_referral", inputType: "number" },
  { label: "Minimum Referral Deposit", name: "minimum_referral_deposit", unit: CURRENCY_UNIT , type: "unit", inputType: "number" },
  { label: "Minimum Referral Invest", name: "minimum_referral_invest", unit: CURRENCY_UNIT , type: "unit", inputType: "number" },
  { label: "Minimum Earning", name: "minimum_earnings", unit: CURRENCY_UNIT , type: "unit", inputType: "number" },
  { label: "Bonus", name: "bonus", unit: CURRENCY_UNIT , type: "unit", inputType: "number" },
  { label: "Description", name: "description", type: "textarea" },
  { label: "Status", name: "status", type: "toggle" },
];

const UserRankingForm = () => {
  const { rankingId } = useParams(); // <-- fetch from URL param
  const isEditMode = !!rankingId;

  const defaultFormState = {
    ranking: '',
    ranking_name: '',
    minimum_deposit: '0',
    minimum_invest: '0',
    minimum_referral: '0',
    minimum_referral_deposit: '0',
    minimum_referral_invest: '0',
    minimum_earnings: '0',
    bonus: '0',
    description: '',
    status: '1', // default status
    icon: null, // file input
    // any other fields...
  };

  const [formData, setFormData] = useState({ ...defaultFormState });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchRanking = async () => {
      setLoading(true);
      try {
        // Call your API with rankingId
        // const response = await fetch(`/api/user-ranking/${rankingId}`);
        // if (!response.ok) throw new Error("Failed to fetch data");
        // const data = await response.json();
        const data = await apiClient.get(`/api/v1/rankings/${rankingId}`);
        setFormData({
          ...data,
          icon: null,
        });
      } catch (error) {
        setMessage({ type: "error", text: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [isEditMode, rankingId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    const numericFields = [
      'minimum_deposit',
      'minimum_invest',
      'minimum_referral',
      'minimum_referral_deposit',
      'minimum_referral_invest',
      'minimum_earnings',
      'bonus',
    ];


    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (numericFields.includes(name) && value && !/^\d*$/.test(value)) {
      return; // skip update if non-numeric
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleToggle = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value ? '1' : '0' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      const endpoint = isEditMode
      ? `/api/user-ranking/${formData.id}` // assuming `id` is in `initialData`
      : `/api/user-ranking`;

      const method = isEditMode ? 'put' : 'post';

      // const response = await axios.post('/api/user-ranking', payload, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      const response = {};

      setMessage({ type: 'success', text: 'Ranking created successfully!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error?.response?.data?.message || 'Submission failed.',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      key: field.name,
      label: field.label,
      name: field.name,
      value: formData[field.name] || '',
      onChange: handleChange,
      disabled: field.disabled,
    };

    switch (field.type) {
      case 'unit':
        return (
          <div className="col-xl-6" key={field.name}>
            <FormInputWithUnit
              {...commonProps}
              type={field.inputType}
              inputClassName={field.name}
              unit={field.unit}
            />
          </div>
        );
      case 'textarea':
        return (
          <div className="site-input-groups mb-0" key={field.name}>
            <label className="box-input-label" htmlFor={field.name}>{field.label}</label>
            <textarea
              name={field.name}
              className={`form-textarea ${field.name}`}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          </div>
        );
      case 'toggle':
        return (
          <div key={field.name}>
            <label className="box-input-label mt-4">Status:</label>
            <Switch
              name={field.name}
              enabled={formData[field.name] === '1'}
              onToggle={handleToggle}
            />
          </div>
        );
      default:
        return (
          <div className="col-xl-6" key={field.name}>
            <FormInput
              {...commonProps}
              type="text"
              required
            />
          </div>
        );
    }
  };



  return (
    <div className="main-content">
      <PageTitle title={isEditMode ? "Edit Ranking" : "Add New Ranking"} />

       {loading && <LoaderOverlay />}

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body">
                <div className="popup-body-text">
                  <h3 className="title mb-4">Edit Ranking</h3>

                  {/* File Upload */}
                  <div className="site-input-groups">
                    <label className="box-input-label" htmlFor="">Ranking Icon:</label>
                    <div className="wrap-custom-file">
                      <input type="file" name="icon" id="image6" accept=".gif, .jpg, .png" />
                      <label
                        htmlFor="image6"
                        id="image-old"
                        className="file-ok"
                        style={{ backgroundImage: 'url(https://trustai.co.in/rank_1.svg)' }}
                      >
                        <img
                          className="upload-icon"
                          src={UploadIcon}
                          alt=""
                        />
                        <span>Update Icon</span>

                      </label>
                    </div>
                  </div>


                  <form onSubmit={handleSubmit}>
                    {/* Dynamic Form Fields */}
                    <div className="row mb-4">
                      {fields.map(renderField)}
                    </div>


                    {/* Actions */}
                    <div className="action-btns">
                      <button type="submit" className="site-btn-sm primary-btn me-2" disabled={loading}>
                         {loading ? 'Saving...' : isEditMode ? 'Update Ranking' : 'Save Changes'}
                      </button>
                      <a href="#" className="site-btn-sm red-btn" data-bs-dismiss="modal" aria-label="Close">
                        Close
                      </a>
                    </div>
                  </form>
                  {/* {message && <p className={message.type}>{message.text}</p>} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserRankingForm;