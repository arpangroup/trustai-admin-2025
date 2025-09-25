import { useState } from 'react';
import ReactDOM from 'react-dom';
import { LuCheck, LuX } from 'react-icons/lu';
import FormTextarea from '../../components/form/FormTextarea';
import { API_ROUTES } from '../../routes';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';

const WithdrawApproveForm = ({ withdrawRequest, onClose }) => {
    const { id: withdrawRequestId, amount, txnFee, walletAddress, txnDate, } = withdrawRequest || {};
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
        if (action === 'reject') {
            payload = { rejectionReason: message }
        }

        try {
            await apiClient.post(API_ROUTES.WITHDRAWAL.ACTION(action, withdrawRequestId), payload);

            toast(`Withdraw successfully ${action}ed.`);
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
                    Wallet Address:  <strong>{walletAddress}</strong>
                </li>
            </ul>

            <div className="card p-3 mb-4" style={{ maxWidth: '400px' }}>
                <div className="d-flex justify-content-between mb-2">
                    <div>Requested Amount:</div>
                    <div className="text-end">{amount}</div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <div>Service Charge:</div>
                    <div className="text-end">{txnFee}</div>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                    <div>Total Deduction:</div>
                    <div className="text-end">{amount + txnFee}</div>
                </div>
            </div>

            <form action="#" method="post">
                <input type="hidden" name="_token" value="6uNwVKwHHRc8JgwVXPyPPcMCbWrA8kRaWXOJrYqQ" />
                <input type="hidden" name="id" value="188" />

                <div className="site-input-groups mb-4">
                    <FormTextarea
                    label="Details Message(Optional)"
                    name="message"
                    value={message}
                    required={true}
                    rows={2}
                    onChange={(e) => setMessage(e.target.value)}
                    warning={isRejecting && message.trim() === '' ? 'This field is required for rejection.' : ''}
                    />
                </div>

                {error && <div className="text-danger mt-2 mb-2">{error}</div>}

                <div className="action-btns">
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

            </form>

        </>
    );
}

export default WithdrawApproveForm;