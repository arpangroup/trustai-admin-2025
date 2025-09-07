import React, { useEffect, useState } from 'react';
import UploadIcon from '../../assets/icons/upload.svg';

import PageTitle from '../../components/page_title/PageTitle';
import FormInput from "../../components/form/FormInput";
import FormInputWithUnit from "../../components/form/FormInputWithUnit";
import Switch from '../../components/form/Switch';
import LoaderOverlay from "../../components/LoaderOverlay";
import { useParams } from 'react-router';
import FormInputWithSelect from '../../components/form/FormInputWithSelect';
import FormDropdown from '../../components/form/FormDropdown';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../routes';

const CURRENCY_UNIT = "INR";


const rewardTypeOptions = [
  { value: 'CASH', label: 'CASH' },
  { value: 'PRODUCT', label: 'PRODUCT' },
  { value: 'POINTS', label: 'POINTS' },
];

const rankTypeOptions = [
  { value: 'PERCENTAGE', label: 'PERFORMANCE' },
  { value: 'STATIC', label: 'STATIC' },
  { value: 'STATIC  ', label: 'PROMOTIONAL' },
];

const fields = [
  { label: "Ranking Code", name: "code", info: 'Unique internal code like RANK_1, RANK_2', },
  { label: "Rank Order", name: "rankOrder", type: "unit", inputType: "number", info: 'Order of rank evaluation', },
  { label: "Display Name", name: "displayName", },

  { label: "Minimum Deposit", name: "minDepositAmount", unit: CURRENCY_UNIT, type: "unit", inputType: "number", info: '<h6>Minimum personal deposit by user</h6> Ensures user has invested some funds personally (used in crypto/finance MLMs)' },
  { label: "Minimum Invest", name: "minInvestmentAmount", unit: CURRENCY_UNIT, type: "unit", inputType: "number", info: '<h6>Minimum personal investment in a product or plan</h6> Used to promote high-tier plan purchases before rank eligibility' },
  { label: "Minimum Direct Referral (Level-A)", name: "minDirectReferrals", inputType: "number", info: '<h6>Number of **directly referred active users** required</h6> Enforces direct engagement, not just team building' },
  { label: "Minimum Referral Deposit", name: "minReferralTotalDeposit", unit: CURRENCY_UNIT, type: "unit", inputType: "number", disabled: true, info: '<h6>Total deposit from **all direct referrals**</h6> Ensures referred users are active/investing' },
  { label: "Minimum Referral Invest", name: "minReferralTotalInvestment", unit: CURRENCY_UNIT, type: "unit", inputType: "number", disabled: true, info: '<h6>Total investment of referred users (could include indirect team)</h6>Used to evaluate the quality and depth of referral impact ' },
  { label: "Minimum Earning", name: "minTotalEarnings", unit: CURRENCY_UNIT, type: "unit", inputType: "number", info: '<h6>User\'s cumulative earnings in the system</h6> Useful to restrict high ranks to genuinely earning users' },

  { label: "Transactions/Day", name: "txnPerDay", type: "unit", inputType: "number" },
  { label: "Level-A Required", name: "minLevel1Count", type: "unit", inputType: "number", disabled: true },
  { label: "Level-B Required", name: "minLevel2Count", type: "unit", inputType: "number" },
  { label: "Level-C Required", name: "minLevel3Count", type: "unit", inputType: "number" },

  { label: "Commission Percentage", name: "commissionPercentage", unit: CURRENCY_UNIT, type: "unit", inputType: "number", info: '<h6>How much commission (%) this rank earns (e.g., in team income)</h6> <br> Determines income multiplier/bonus per event' },
  { label: "Rank Bonus", name: "rankBonus", unit: CURRENCY_UNIT, type: "unit", inputType: "number", info: '<h6>One-time bonus on achieving this rank</h6> Often shown in wallets or history as milestone reward ' },

  { label: "Reward Type", name: "rewardType", inputType: "number", type: "dropdown", options: rewardTypeOptions, info: 'Tells system how to issue rank bonus' },
  { label: "Rank Type", name: "rankType", inputType: "number", type: "dropdown", options: rankTypeOptions, info: 'Allows multiple rank systems (e.g., fixed vs time-limited ranks)' },

  { label: "Description", name: "description", type: "textarea" },
  { label: "Status", name: "active", type: "toggle" },
];

const defaultFormState = {
  code: '',
  displayName: '',
  rankOrder: 0,
  minDepositAmount: 0,
  minInvestmentAmount: 0,
  minDirectReferrals: 0,
  minReferralTotalDeposit: 0,
  minReferralTotalInvestment: 0,
  minTotalEarnings: 0,
  txnPerDay: 0,
  commissionPercentage: 0,
  rankBonus: 0,
  description: '',
  active: true, // default status
  imageUrl: null, // file input
  rewardType: "CASH",
  rankType: "PERFORMANCE"
  // any other fields...
};

const UserRankingFormV1 = () => {
  const { rankingId } = useParams(); // <-- fetch from URL param
  const isEditMode = !!rankingId;
  const [formData, setFormData] = useState({ ...defaultFormState });
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchRanking = async () => {
      setLoading(true);
      try {         
        const data = await apiClient.get(API_ROUTES.RANK_CONFIGS_BY_ID(rankingId));
        const dataObj = {
          ...data,
          icon: null,
          minDirectReferrals: data.minDirectReferrals,
          minLevel1Count: data.requiredLevelCounts[1],
          minLevel2Count: data.requiredLevelCounts[2],
          minLevel3Count: data.requiredLevelCounts[3],
        }
        setFormData(dataObj);
        setInitialData(dataObj);
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
      'minDepositAmount',
      'minInvestmentAmount',
      'minDirectReferrals',
      'minReferralTotalDeposit',
      'minReferralTotalInvestment',
      'minTotalEarnings',
      'txnPerDay',
      'rankBonus',
    ];


    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (numericFields.includes(name) && value && !/^\d*$/.test(value)) {
      return; // skip update if non-numeric
    } else {
      //setFormData((prev) => ({ ...prev, [name]: value }));
      setFormData((prev) => {
        const updated = { ...prev, [name]: value };

        // Sync logic: if minDirectReferrals changes, update minLevel1Count
        if (name === 'minDirectReferrals') {
          updated.minLevel1Count = value;
        }
        if (name === 'minDirectReferrals') {
          updated.minLevel1Count = value;
        }

        return updated;
      });
    }


  };

  const handleToggle = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const isCreating = !isEditMode;

       // Use full formData for POST, and changedFields for PATCH
      const payload = isCreating ? formData : {};

      if (!isCreating) {
        // For PATCH: only send changed fields
        for (let key in formData) {
          if (formData[key] !== initialData[key]) {
            payload[key] = formData[key];
          }
        }
      }
      console.log('PAYLOAD:', payload);

      
      const endpoint = isEditMode
        ? `/api/v2/rankings/${formData.id}` // assuming `id` is in `initialData`
        : `/api/v2/rankings`;

      const method = isEditMode ? 'PATCH' : 'POST';

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed.');
      }
      setMessage({ type: 'success', text: 'Ranking created successfully!' });
      setInitialData({ ...formData });
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
      value: formData[field.name] ?? '',
      onChange: handleChange,
      disabled: field.disabled,
      info: field.info || null
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
              enabled={formData[field.name]}
              onToggle={handleToggle}
            />
          </div>
        );
      case 'dropdown':
        return (
          <FormDropdown
            {...commonProps}
            name={field.name}
            options={field.options}
          />
        );
      default:
        return (
          <div className="col-xl-6" key={field.name}>
            <FormInput
              {...commonProps}
              type={field.inputType || 'text'}
              required
              disabled={field.name === 'code' && isEditMode ? true : false}
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

export default UserRankingFormV1;