import { useEffect, useState } from "react";
import FormInput from "../../components/form/FormInput";
import FormDropdown from "../../components/form/FormDropdown";
import { LuSend } from "react-icons/lu";
import { API_ROUTES } from "../../constants/apiRoutes";
import apiClient from "../../api/apiClient";

const walletList = [
    { value: "mainWallet", label: "Main Wallet", disabled: false },
    { value: "profitWallet", label: "Profit Wallet", disabled: true },
    { value: "directGateway", label: "Direct Gateway", disabled: true },
];

const InvestNow = ({ userId, onClose }) => {
    const [formData, setFormData] = useState({});
    const [schemaOptions, setSchemaOptions] = useState([]);
    const [schemaDetailsMap, setSchemaDetailsMap] = useState({});
    const [screenshotFile, setScreenshotFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [alert, setAlert] = useState({ message: "", type: "" });

    // Fetch schemas on mount
    useEffect(() => {
        const fetchSchemaList = async () => {
            const response = await apiClient.get(API_ROUTES.SCHEMA_LIST);
            const data = response.content;
            //console.log("RESPONSE_DATA: ", data);
            //const data = response.content;
            const dropdownOptions = [
                { value: "", label: "-- Select Schema --", disabled: true },
                ...data.map(schema => ({
                    value: schema.id,
                    label: schema.title,
                    disabled: !schema.active,
                }))
            ];
            const detailMap = {};
            data.forEach(schema => {
                detailMap[schema.id] = schema;
            });
            setSchemaOptions(dropdownOptions);
            setSchemaDetailsMap(detailMap);
        }
        fetchSchemaList();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If schema changes, populate dependent fields
        if (name === "schemaName" && schemaDetailsMap[value]) {
            const schema = schemaDetailsMap[value];
            setFormData(prev => ({
                ...prev,
                schemaName: value,
                amountRange: `${schema.minimumInvestmentAmount} - ${schema.maximumInvestmentAmount ?? '∞'} ${schema.currency}`,
                returnRate: `${schema.returnRate}%`,
                returnSchedule: schema.returnSchedule?.scheduleName || "N/A",
                capitalReturned: schema.capitalReturned ? "Yes" : "No",
                investmentAmount: "", // clear investment amount
                amount: "",           // also reset amount
            }));
        } else if (name === "amount") {
            setFormData(prev => ({
                ...prev,
                amount: value,
                investmentAmount: value // Mirror the amount field
            }));
        } else {
            setFormData(prev => ({ 
                ...prev, 
                [name]: value 
            }));
        }

        setAlert({ message: "", type: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { schemaName, amount, walletType } = formData;
        if (!schemaName || !amount) {
            setAlert({ message: "Please fill in all required fields.", type: "danger" });
            return;
        }

        const numericAmount = parseFloat(amount);
        const selectedSchema = schemaDetailsMap[schemaName];
        const minAmount = selectedSchema?.minimumInvestmentAmount || 0;
        
        if (numericAmount < minAmount) {
            setAlert({ message: `Amount must be at least ${minAmount}.`, type: "danger" });
            return;
        }

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        if (screenshotFile) data.append("screenshot", screenshotFile);

        let payload = {            
            //...formData,
            userId,
            amount,
            schemaId: selectedSchema.id,
        }
        
        try {
            // INVESTMENT_SUBSCRIBE
            const response =  await apiClient.post(API_ROUTES.INVESTMENT_SUBSCRIBE, payload);
            setAlert({ message: "Investment submitted successfully!", type: "success" });
            setFormData({});
            setScreenshotFile(null);
            setPreviewUrl("");

            // Optionally trigger a page reload, modal close, or callback
            if (onClose) onClose(); 
            window.location.reload(); // Optional: hard reload
        } catch (error) {
            console.error(error);
            setAlert({ message: "Submission failed. Please try again.", type: "danger" });
        }
    };

    const formFields = [
        { type: "select", label: "Select Schema", name: "schemaName", options: schemaOptions, required: true },
        { type: "text", label: "Amount Range", name: "amountRange", disabled: true },
        { type: "number", label: "Enter Amount", name: "amount", required: true },
        { type: "select", label: "Select Wallet", name: "walletType", options: walletList, required: true },
        { type: "text", label: "Return Of Interest", name: "returnRate", disabled: true },
        { type: "text", label: "Return Period", name: "returnSchedule", disabled: true },
        { type: "text", label: "Capital Back", name: "capitalReturned", disabled: true },
        { type: "text", label: "Total Investment Amount", name: "investmentAmount", disabled: true },
    ];

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {formFields.map((field) =>
                        field.type === "select" ? (
                            <FormDropdown
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                value={formData[field.name] || ""}
                                options={field.options}
                                onChange={handleChange}
                                required={field.required}
                            />
                        ) : (
                            <div className="col-xl-6" key={field.name}>
                                <FormInput
                                    label={field.label}
                                    name={field.name}
                                    type={field.type}
                                    value={formData[field.name] || ""}
                                    disabled={field.disabled}
                                    onChange={handleChange}
                                    required={field.required}
                                />
                            </div>
                        )
                    )}

                    <div className="action-btns mt-4">
                        <button type="submit" className="site-btn-sm primary-btn me-2">
                            <LuSend /> &nbsp; PROCEED TO INVEST
                        </button>
                    </div>
                </div>
            </form>

            {alert.message && (
                <div className={`alert alert-${alert.type} mt-4`} role="alert">
                    {alert.message}
                </div>
            )}
        </div>
    );
};

export default InvestNow;
