import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import './Users.css';
import FormInput from "../../components/form/FormInput";
import { LuSend } from "react-icons/lu";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../routes";
import MultiSelectDropdown from "../../components/form/multiselect/MultiSelectDropdown";
import FormDropdown from "../../components/form/FormDropdown";
import { toast } from "react-toastify";

// const twmplates = [
//     { value: "", label: "--Select Notification Template--", disabled: true },
//     { value: "MAIL_CONNECTION_TEST", label: "MAIL_CONNECTION_TEST", disabled: true },
//     { value: "WELCOME_EMAIL", label: "WELCOME_EMAIL", disabled: true },
//     { value: "OTP_SMS", label: "OTP_SMS", disabled: true },
//     { value: "NEW_OFFER_PUSH", label: "NEW_OFFER_PUSH", disabled: true },

//     { value: "NEW_OFFER_PUSH", label: "NEW_OFFER_PUSH", disabled: true },
//     { value: "NEW_OFFER_PUSH", label: "NEW_OFFER_PUSH", disabled: true },
// ];

const SendEmailPanel = ({ email, userId, username, sendToAll = false, isOpen, onClose }) => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [immediate, setImmediate] = useState(true);
    const [alert, setAlert] = useState({ message: "", type: "" }); // type: 'success' | 'danger'
    const [selected, setSelected] = useState(["EMAIL"]);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState("");

    // 🔹 Fetch templates when single channel selected
    useEffect(() => {
        loadTemplates();
    }, [selected]);

    const loadTemplates = async () => {
        if (selected.length === 1) {
            try {
                const type = selected[0].toLowerCase(); // api expects lower-case

                if (!["email", "sms", "push"].includes(type)) {
                    setTemplates([]);
                    setSelectedTemplate("");
                    return;
                }

                const res = await apiClient.get(API_ROUTES.NOTIFICATIONS.TEMPLATE_LIST(type));
                const options = [
                    { value: "", label: "--Select Template--", disabled: true },
                    ...res.data.content.map(t => ({
                        value: t.id,   // use id for value
                        label: t.code  // show code in dropdown
                    }))
                ];
                setTemplates(options);
            } catch (err) {
                console.error("Error fetching templates:", err);
                toast.error("Failed to load templates");
            }
        } else {
            setTemplates([]);
            setSelectedTemplate("");
        }
    };

    // 🔹 Fetch template details when template code changes
    useEffect(() => {
        const loadTemplateDetails = async () => {
            if (!selectedTemplate || selected.length !== 1) return;
            try {
                const type = selected[0].toLowerCase();
                const res = await apiClient.get(API_ROUTES.NOTIFICATIONS.TEMPLATE_BY_ID(type, selectedTemplate));
                setMessage(res.data.messageBody || "");
            } catch (err) {
                console.error("Error fetching template details:", err);
                toast.error("Failed to load template details");
            }
        };
        loadTemplateDetails();
    }, [selectedTemplate, selected]);


    const resolveRecipient = () => {
        const recipient = sendToAll
            ? null // backend should handle "all"
            : (selected.includes("IN_APP") ? userId : email)  // if IN_APP → userId, else email

        return recipient;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === 'root@trustai.com') {
            setAlert({ message: "You can't send mail to root", type: 'danger' });
            return;
        }

        const payload = {
            channels: selected.length > 0 ? selected : ["IN_APP"], // fallback
            recipient: resolveRecipient(),
            sendToAll,
            subject,
            title: subject, // using subject as title
            message,
            properties: {}, // always empty object, laterwe may imple,emt it
            immediate,
        }

        try {
            const response = await apiClient.post(API_ROUTES.NOTIFICATIONS.SEND_NOTIFICATION, payload);
            setAlert({ message: 'Notification sent successfully!', type: 'success' });
            toast.success("Notification sent successfully!");
            setSubject("");
            setMessage("");
            setSelected([]);
            setSelectedTemplate("");
        } catch (error) {
            const errorMessage = error?.response?.data.message || 'Failed to send notification.';
            console.error('Error sending email:', error);
            toast.error(errorMessage);
            setAlert({ message: errorMessage, type: 'danger' });
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                
                {/* Channels */}
                <div className="d-flex align-items-center justify-content-between">
                    <MultiSelectDropdown
                        options={["EMAIL", "SMS", "PUSH", "IN_APP", "WhatsApp", "Firebase", "Facebook"]}
                        selected={selected}
                        // onChange={setSelected}
                        onChange={(newSelected) => {
                            if (sendToAll) {
                                // allow multiple
                                setSelected(newSelected); // allow multiple
                            } else {
                                // allow only one
                                setSelected(newSelected.slice(-1)); // only one allowed
                            }
                        }}
                        placeholder="Choose Notification Channel"
                    />

                    <div className="form-check ms-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={sendToAll}
                            disabled />
                        <label className="form-check-label">Send to all</label>
                    </div>
                </div>
                <p className="text-danger small ms-1"> Currently we are only supporting <b>Email</b> and <b>IN_APP</b> notifications </p>

                <div className="row mt-3">
                    <div className="col-8">
                        <FormInput
                            label="Subject / Title"
                            name="subject"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-4">
                        <FormDropdown
                            wrapperClass="col-12 site-input-groups mt-"
                            label="Template"
                            key="template"
                            name="templateCode"
                            value={selectedTemplate}
                            options={templates}
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                        // required={field.required}
                        />
                    </div>

                    {/* <FormDropdown
                        key={field.name}
                        label={field.label}
                        value={formData[field.name] || ""}
                        name={field.name}
                        options={field.options}
                        onChange={handleChange}
                        required={field.required}
                    /> */}

                </div>

                <div className="site-input-groups">
                    <label htmlFor="" className="box-input-label">Email Body / Notification Message</label>
                    <textarea
                        name="message"
                        className="form-textarea mb-0"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                        required
                    />
                    <small className="text-muted d-block">Recipient: {sendToAll ? "All" : resolveRecipient()}</small>
                </div>


                <div className="d-flex align-items-center justify-content-between">

                    <div className="site-input-groups">
                        <input 
                            type="checkbox" 
                            checked={immediate}  
                            onChange={(e) => setImmediate(e.target.checked)} 
                            readOnly />
                        <label style={{ marginLeft: '12px', marginTop: '-6px' }}>Immediate</label>
                    </div>

                </div>

                <div className="action-btns">
                    <button type="submit" className="site-btn-sm primary-btn me-2">
                        <LuSend />  &nbsp; Send Email
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
