import { useState } from "react";
import Switch from "../../components/form/Switch";
import FormInputWithUnit from "../../components/form/FormInputWithUnit";
import { API_ROUTES } from "../../routes";
import apiClient from "../../api/apiClient";
import { CURRENCY_UNIT } from "../../constants/config";

const BalancePanel = ({ userId, username = '', onClose }) => {
  const [isAddMode, setIsAddMode] = useState(true);
  const [wallet, setWallet] = useState("main");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" }); // type: 'success' | 'danger'


  const handleToggle = (_, value) => setIsAddMode(value);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") setAmount(value);
    if (name === "remarks") setRemarks(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submit reload
    const requestPayload = {
      userId,
      wallet,
      amount: parseFloat(amount),
      action: isAddMode ? "Add" : "Subtract",
      remarks,
    };

    const endpoint = API_ROUTES.TRANSACTION_ADJUST_BALANCE(isAddMode);

    try {
      const result = await apiClient.post(endpoint, requestPayload);
      setAlert({ message: "Deposit submitted successfully!", type: "success" });
      //console.log("Success:", result);

      // Optionally reset form or show success message here
      setAmount("");
      setRemarks("");

      // Optionally trigger a page reload, modal close, or callback
      if (onClose) onClose();
      window.location.reload(); // Optional: hard reload
    } catch (error) {
      console.error("Error submitting form:", error);
      const message = error.response?.message || "Submission failed. Please try again.";
      setAlert({ message, type: "danger" });
    }
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="site-input-groups">
          <Switch
            name=""
            enabled={isAddMode}
            labels={['Add', 'Subtract']}
            onToggle={handleToggle}
          />
        </div>
        {/* <div className="site-input-groups">
                <select className="form-select" name="wallet" value={wallet} onChange={handleWalletChange}>
                    <option value="main">Main Wallet</option>
                    <option value="profit">Profit Wallet</option>
                </select>
            </div> */}
        <div className="site-input-groups mb-0">
          <FormInputWithUnit
            label="Amount"
            name="amount"
            value={amount}
            unit={CURRENCY_UNIT}
            type="number"
            placeholder="Amount"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="site-input-groups">
          <label className="box-input-label d-flex align-items-center gap-1">Remarks</label>
          <textarea
            name="remarks"
            className="form-textarea mb-0"
            value={remarks}
            onChange={handleInputChange}
            required={true}
          />
        </div>
        <button type="submit" className="site-btn primary-btn w-100">Apply Now</button>
      </form>
      {/* Alert Message */}
      {alert.message && (
        <div className={`alert alert-${alert.type} mt-4`} role="alert">
          {alert.message}
        </div>
      )}
    </div>
  );

}
export default BalancePanel;