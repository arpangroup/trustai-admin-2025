import React, { useState } from "react";
import FormInput from "../../components/form/FormInput";
import FormDropdown from "../../components/form/FormDropdown";
import { LuSend } from "react-icons/lu";

const withdrawAccountList = [
  { value: "", label: "--Select Account--", disabled: true },
  { value: "manualWithdraw", label: "Manual Withdraw" },
  { value: "directWithdraw", label: "Direct Withdraw" },
];

const WithdrawRequest = ({ senderId, senderName }) => {
  const [formData, setFormData] = useState({
    withdrawAccount: "",
    amount: "",
    withdrawFee: "",
    upiId: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set withdrawFee automatically if directWithdraw is selected
    if (name === "withdrawAccount" && value === "directWithdraw") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        withdrawFee: "15.00", // example static fee
      }));
    } else if (name === "withdrawAccount" && value === "manualWithdraw") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        withdrawFee: "",
        upiId: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      senderId,
      senderName,
      withdrawAccount: formData.withdrawAccount,
      amount: parseFloat(formData.amount),
      withdrawFee: formData.withdrawFee,
      upiId: formData.upiId,
    };

    try {
      const response = await fetch("/api/send-money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send money");
      }

      const result = await response.json();
      setAlert({
        type: "success",
        message: result.message || "Money sent successfully!",
      });

      setFormData({
        withdrawAccount: "",
        amount: "",
        withdrawFee: "",
        upiId: "",
      });
    } catch (error) {
      setAlert({ type: "danger", message: error.message });
    }
  };

  // Dynamic field definitions
  const fields = [
  { type: "dropdown", label: "Withdraw Account", name: "withdrawAccount", required: true, options: withdrawAccountList },
  { type: "input", label: "Amount", name: "amount", inputType: "number", required: true },
  { type: "input", label: "Withdraw Fee", name: "withdrawFee", inputType: "text", disabled: true, show: formData.withdrawAccount === "directWithdraw" },
  { type: "input", label: "UPI Bank Account", name: "upiId", inputType: "text", disabled: true, show: formData.withdrawAccount === "directWithdraw" }
];


  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields.map((field, idx) => {
          if (field.show === false) return null;

          if (field.type === "dropdown") {
            return (
              <FormDropdown
                key={idx}
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                options={field.options}
                required={field.required}
              />
            );
          }

          if (field.type === "input") {
            return (
              <FormInput
                key={idx}
                label={field.label}
                name={field.name}
                type={field.inputType}
                value={formData[field.name]}
                onChange={handleChange}
                disabled={field.disabled}
                required={field.required}
              />
            );
          }

          return null;
        })}

        <div className="action-btns">
          <button type="submit" className="site-btn-sm primary-btn me-2">
            <LuSend /> &nbsp; Withdraw Money
          </button>
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

export default WithdrawRequest;
