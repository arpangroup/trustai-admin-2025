import React, { useState } from "react";
import ReactDOM from 'react-dom';
import './Users.css';
import FormInput from "../../components/form/FormInput";
import { LuSend } from "react-icons/lu";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../constants/apiRoutes";

const SendEmailPanel = ({ email, username, isAllEmail = false, isOpen, onClose }) => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState({ message: "", type: "" }); // type: 'success' | 'danger'


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || email === 'root@trustai.com') {
            setAlert({ message: "You can't send mail to root", type: 'danger' });
            return;
        }

        const payload = {
            recipient: email,
            subject,
            message,
            sendToAll: isAllEmail,
        }

        try {
            const response = await apiClient.post(API_ROUTES.SEND_MAIL, payload);
            setAlert({ message: 'Email sent successfully!', type: 'success' });
            setSubject('');
            setMessage('');
        } catch (error) {
            const apiMessage = error?.response?.message || 'Failed to send email.';
            console.error('Error sending email:', error);
            setAlert({ message: apiMessage, type: 'danger' });
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    label="Subject:"
                    name="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                <div className="site-input-groups">
                    <label for="" className="box-input-label">Email Details</label>
                    <textarea
                        name="message"
                        className="form-textarea mb-0"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>

                <div className="action-btns">
                    <button type="submit" className="site-btn-sm primary-btn me-2">
                        <LuSend/>  &nbsp; Send Email
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
    );
};

export default SendEmailPanel;
