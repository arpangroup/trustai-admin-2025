import { useState } from 'react';
import { LuCheck, LuX } from 'react-icons/lu';
import FormTextarea from '../../components/form/FormTextarea';
import apiClient from "../../api/apiClient";
import { API_ROUTES } from '../../constants/apiRoutes';

const defaultScreenshot = 'https://81habibi.com/assets/global/images/qcVxCDUguY174izjLz37.jpg';

const DepositApproveForm = ({ depositData, onClose }) => {
  const { txnRefId, id: depositId } = depositData;

  const [message, setMessage] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (action) => {
    setError('');
    setIsRejecting(action === 'reject');

    if (action === 'reject' && message.trim() === '') {
      // Don't proceed if rejecting and no message
      return;
    }

    setSubmitting(true);

    let payload = {};
    if(action === 'reject') {
        payload = {rejectionReason: message}
    }

    try {
      await apiClient.post(API_ROUTES.DEPOSIT_ACTION(action, depositId), payload);

      alert(`Deposit successfully ${action}ed.`);
      // Optionally trigger a page reload, modal close, or callback
      if (onClose) onClose(); 
      window.location.reload(); // Optional: hard reload
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ul className="list-group mb-4">
        <li className="list-group-item">
          TransactionRef ID: <strong>{txnRefId}</strong>
        </li>
        <li className="list-group-item">
          <img
            src={defaultScreenshot}
            style={{ width: '300px', height: '300px' }}
            alt="Deposit Screenshot"
          />
        </li>
      </ul>

      <div className="site-input-groups mb-0">
        <FormTextarea
          label="Details Message"
          name="message"
          value={message}
          required={true}
          rows={2}
          onChange={(e) => setMessage(e.target.value)}
          warning={isRejecting && message.trim() === '' ? 'This field is required for rejection.' : ''}
        />
      </div>

      {error && <div className="text-danger mt-2 mb-2">{error}</div>}

      <div className="action-btns mt-3">
        <button
          type="button"
          disabled={submitting}
          className="site-btn-sm primary-btn me-2"
          onClick={() => handleSubmit('approve')}
        >
          <LuCheck /> Approve
        </button>
        <button
          type="button"
          disabled={submitting}
          className="site-btn-sm red-btn"
          onClick={() => handleSubmit('reject')}
        >
          <LuX /> Reject
        </button>
      </div>
    </>
  );
};

export default DepositApproveForm;
