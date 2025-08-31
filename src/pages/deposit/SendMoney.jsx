import React, { useState } from "react";
import ReactDOM from 'react-dom';
import FormInput from "../../components/form/FormInput";
import { LuSend } from "react-icons/lu";

const SendMoney = ({ senderId, senderName }) => {
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [remarks, setRemarks] = useState("");
    const [alert, setAlert] = useState({ type: "danger", message: "Send money feature is currently not available" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            senderId,
            senderName,
            recipientEmail: email,
            amount: parseFloat(amount),
            remarks,
        };

        try {
            const response = await fetch('/api/send-money', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send money');
            }

            const result = await response.json();
            setAlert({ type: 'success', message: result.message || 'Money sent successfully!' });

            // Optionally reset form
            setEmail("");
            setAmount("");
            setRemarks("");
        } catch (error) {
            setAlert({ type: 'danger', message: error.message });
        }
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>

                    <FormInput
                        label="User Email"
                        name="subject"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FormInput
                        label="Enter Amount"
                        name="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <div className="site-input-groups">
                        <label for="" className="box-input-label">Send Money Note (Optional)</label>
                        <textarea
                            name="message"
                            className="form-textarea mb-0"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            required
                        />
                    </div>

                    <div className="action-btns">
                        <button type="submit" className="site-btn-sm primary-btn me-2" disabled={true}>
                            <LuSend />  &nbsp; Send Money
                        </button>
                    </div>
                </form>
                {/* Alert Message */}
                {alert.message && (
                    <div className={`alert alert-${alert.type} mt-4`} role="alert">
                        {alert.message}
                    </div>
                )}
            </div>
        </>
    );
};

export default SendMoney;
