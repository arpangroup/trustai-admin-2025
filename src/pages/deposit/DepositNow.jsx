import { useState } from "react";
import FormInput from "../../components/form/FormInput";
import FormDropdown from "../../components/form/FormDropdown";
import { LuSend } from "react-icons/lu";
import { API_ROUTES } from "../../routes";
import apiClient from "../../api/apiClient";
import UploadIcon from '../../assets/icons/upload.svg';

// Dropdown options
const paymentGateways = [
    { value: "", label: "--Select Gateway--", disabled: true },
    { value: "admin", label: "Admin" },
    { value: "binance", label: "Binance", disabled: false },
    { value: "coinbase", label: "Coinbase", disabled: true },
];

const baseFields = [
    { type: "select", label: "Payment Method", name: "paymentGateway", options: paymentGateways, required: true, },
    { type: "number", label: "Amount", name: "amount", required: true,},
];

const DepositNow = ({ userId, onClose }) => {
    const [formData, setFormData] = useState({
        paymentGateway: "admin",
    });
    const [screenshotFile, setScreenshotFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [alert, setAlert] = useState({ message: "", type: "" }); // type: 'success' | 'danger'

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file" && files.length > 0) {
            const file = files[0];
            const allowedTypes = ["image/jpeg", "image/png"];
            if (!allowedTypes.includes(file.type)) {
                setAlert({ message: "Only JPG and PNG files are allowed!", type: "danger" });
                e.target.value = null;
                setScreenshotFile(null);
                setPreviewUrl("");
                return;
            }
            setScreenshotFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setAlert({ message: "", type: "" }); // Clear previous alert
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
            setAlert({ message: "", type: "" }); // Clear previous alert
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { paymentGateway, amount, transactionId } = formData;

        if (!paymentGateway || !amount) {
            setAlert({ message: "Please fill in all required fields.", type: "danger" });
            return;
        }

        if (paymentGateway !== "admin" && !transactionId) {
            setAlert({ message: "Transaction ID is required for non-admin payment methods.", type: "danger" });
            return;
        }

        if (paymentGateway !== "admin" && !screenshotFile) {
            setAlert({ message: "Screenshot is required for non-admin payment methods.", type: "danger" });
            return;
        }

        /*const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value);
            console.log(`${key}:`, value);
        });*/

        let payload = {            
            ...formData,
            userId,
            amount: amount,
            paymentGateway: paymentGateway === "admin" ? "SYSTEM" : paymentGateway.toUpperCase(),
            txnRefId: transactionId,
            remarks: "",
            metaInfo: null,
        }

        if (screenshotFile) {
            //payload.append("screenshot", screenshotFile);
        }

        try {
            const isManualDeposit = payload.paymentGateway === 'SYSTEM';
            const response =  await apiClient.post(API_ROUTES.DEPOSIT_REQUEST(isManualDeposit), payload);
            setAlert({ message: "Deposit submitted successfully!", type: "success" });

            // Optionally reset form
            setFormData({ paymentGateway: "admin" });
            setScreenshotFile(null);
            setPreviewUrl("");
            
            // Optionally trigger a page reload, modal close, or callback
            if (onClose) onClose(); 
            window.location.reload(); // Optional: hard reload
        } catch (error) {
            console.error(error);
            const message = error.response?.message || "Submission failed. Please try again.";
            setAlert({ message, type: "danger" });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {baseFields.map((field) =>
                    field.type === "select" ? (
                        <FormDropdown
                            key={field.name}
                            label={field.label}
                            value={formData[field.name] || ""}
                            name={field.name}
                            options={field.options}
                            onChange={handleChange}
                            required={field.required}
                        />
                    ) : (
                        <FormInput
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            required={field.required}
                        />
                    )
                )}

                {formData.paymentGateway && formData.paymentGateway !== "admin" && (
                    <FormInput
                        label="Transaction ID"
                        name="transactionId"
                        type="text"
                        value={formData.transactionId || ""}
                        onChange={handleChange}
                        required
                    />
                )}

                {formData.paymentGateway && formData.paymentGateway !== "admin" && (
                    <div className="col-xl-12 col-md-12">
                        <div className="body-title">Screenshot</div>
                        <div className="wrap-custom-file">
                            <input
                                type="file"
                                name="screenshot"
                                id="myUpload"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="myUpload"
                                className={previewUrl ? "file-ok" : ""}
                                style={{
                                    backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
                                }}
                            >
                                <img
                                    className="upload-icon"
                                    src={UploadIcon}
                                    alt=""
                                />
                                <span>
                                    {screenshotFile
                                        ? screenshotFile.name
                                        : "Select Screenshot (Required)"}
                                </span>
                            </label>
                        </div>
                    </div>
                )}

                <div className="action-btns">
                    <button type="submit" className="site-btn-sm primary-btn me-2">
                        <LuSend /> &nbsp; PROCEED TO PAYMENT
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

export default DepositNow;
