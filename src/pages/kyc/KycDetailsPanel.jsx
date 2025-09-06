import React, { useEffect, useState } from "react";
import { API_ROUTES } from "../../routes";
import apiClient from "../../api/apiClient";
import FormInput from "../../components/form/FormInput";

const defaultImageUrl = 'https://81habibi.com/assets/global/images/wIzOWakjUq1xWMgBg6vh.jpg';

const KycDetailsPanel = ({ kycId }) => {
  const [kycData, setKycData] = useState(null);
  const [kycRejectionReason, setKycRejectionReason] = useState("");
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [actionType, setActionType] = useState(""); // For loading label
  const [alert, setAlert] = useState({ message: "", type: "" }); // type: 'success' | 'danger'


  useEffect(() => {
    const fetchKycDetails = async () => {
      try {
        const response = await apiClient.get(API_ROUTES.KYC_BY_ID(kycId));
        setKycData(response);
      } catch (err) {
        console.log("ERROR: ", err);
        setAlert({ message: err.message || "An error occurred while fetching KYC details", type: 'danger' });
      }
    };

    fetchKycDetails();
  }, [kycId]);

  const handleReasonChange = (e) => {
    setKycRejectionReason(e.target.value);
  };

  const handleApprove = async () => {
    setSubmitting(true);
    setActionType("approve");

    try {
      await apiClient.post(API_ROUTES.KYC_SUBMIT(kycId, actionType), {
        kycId,
        action: "approve",
      });
      alert("KYC approved successfully.");
    } catch (err) {
      setAlert({ message: err.message || "Failed to approve KYC.", type: 'danger' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!showRejectReason) {
      // First click: show the field
      setShowRejectReason(true);
      return;
    }

    // Second click: submit
    if (!kycRejectionReason.trim()) {
      alert("Rejection reason is required.");
      return;
    }

    setSubmitting(true);
    setActionType("reject");

    try {
      await apiClient.post(API_ROUTES.KYC_SUBMIT(kycId, actionType), {
        kycId,
        action: "reject",
        reason: kycRejectionReason,
      });
      alert("KYC rejected successfully.");
    } catch (err) {
      setAlert({ message: err.message || "Failed to reject KYC.", type: 'danger' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="popup-body-text" id="kyc-action-data">
        <ul className="kyc-list">
          <li className="kyc-list-item">
            NID Number: <strong>{kycData?.identityNumber}</strong>
          </li>
          <li className="kyc-list-item">
            Image Of NID:
            <br />
            <img
              src={kycData?.documentImage || defaultImageUrl}
              alt="User KYC Screenshot"
              // style={{ maxWidth: "300px", marginTop: "8px" }}
            />
          </li>
          <li className="kyc-list-item">
            Action Message:
            <p className="kyc-action-message">{kycData?.actionMessage || ''}</p>
          </li>
        </ul>

        <div className="action-btns">
          {showRejectReason && (
            <FormInput
              name="kycRejectionReason"
              value={kycRejectionReason}
              placeholder="Enter Rejection Reason"
              onChange={handleReasonChange}
              required
            />
          )}

          <button
            className="site-btn-sm primary-btn me-2"
            onClick={handleApprove}
            disabled={submitting}
          >
            {submitting && actionType === "approve" ? "Submitting..." : "Approve"}
          </button>

          <button
            className="site-btn-sm red-btn"
            onClick={handleReject}
            disabled={submitting}
          >
            {submitting && actionType === "reject"
              ? "Submitting..."
              : showRejectReason
              ? "Submit Rejection"
              : "Reject"}
          </button>
        </div>

        {/* Alert Message */}
        {alert.message && (
        <div className={`alert alert-${alert.type} mt-4`} role="alert">
            {alert.message}
        </div>
        )}

      </div>
    </div>
  );
};

export default KycDetailsPanel;
