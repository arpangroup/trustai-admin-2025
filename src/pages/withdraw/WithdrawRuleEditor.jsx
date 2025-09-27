import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { API_ROUTES } from "../../routes";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

const WithdrawRuleEditor = () => {
  const [rules, setRules] = useState([]);
  const [changes, setChanges] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await apiClient.get(API_ROUTES.WITHDRAWAL.RULES);
        setRules(response.data);
      } catch (error) {
        console.error("Error fetching withdraw rules:", error);
      }
    };
    fetchRules();
  }, []);

  const handleChange = (id, field, value) => {
    setMessage(null);
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    );
    setChanges((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdate = () => {
    const payload = Object.entries(changes).map(([id, fields]) => ({
      id: Number(id),
      ...fields,
    }));

    apiClient
      .patch(API_ROUTES.WITHDRAWAL.UPDATE_RULE, payload)
      .then(() => {
        setMessage({ text: "Withdraw rules updated successfully!", type: "success" });
        setChanges({});
      })
      .catch((err) => {
        console.error(err);
        setMessage({ text: "Error updating withdraw rules.", type: "error" });
      });
  };

   const isCellChanged = (id, field) => changes[id]?.hasOwnProperty(field);

  return (
    <div className="container mt-4">
      <div className="row">
        <h3 className="mb-4">Withdraw Rule Editor</h3>
        <div className="alert alert-secondary d-flex align-items-center" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          <div>
            The second withdrawal can only be initiated after the arrival of the first withdrawal, each withdrawal fee of 5% Withdrawal within 96 hours to the account, the minimum withdrawal amount from 50. See chart for details:
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-sm">
            <thead className="thead-dark">
              <tr>
                <th>RANK CODE</th>
                <th>REQUIRED TOTAL MEMBERS</th>
                <th>REQUIRED DIRECT REFERRALS</th>
                <th>WITHDRAW LIMIT (per day)</th>
                <th>MAX WITHDRAW AMOUNT ($)</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id}>
                  <td>{rule.rankCode}</td>
                  {["requiredTotalMembers", "requiredDirectReferrals", "withdrawLimit", "maxWithdrawAmount"].map(
                    (field) => (
                      <td key={field}>
                        <input
                          type="number"
                          step={field === "maxWithdrawAmount" ? "0.01" : "1"}
                          className={`form-control form-control-sm ${
                            isCellChanged(rule.id, field) ? "bg-warning" : ""
                          }`}
                          value={rule[field]}
                          onChange={(e) =>
                            handleChange(
                              rule.id,
                              field,
                              field === "maxWithdrawAmount"
                                ? parseFloat(e.target.value)
                                : Number(e.target.value)
                            )
                          }
                          onWheel={(e) => e.target.blur()}
                        />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {Object.keys(changes).length > 0 && (
          <div className="text-end mt-3">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update Changed Rules
            </button>
          </div>
        )}
        {message && (
          <div
            className={`alert mt-3 alert-${message.type === "success" ? "success" : "danger"}`}role="alert">
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};


export default WithdrawRuleEditor;
