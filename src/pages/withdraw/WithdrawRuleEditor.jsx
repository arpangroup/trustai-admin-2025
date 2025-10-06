import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../routes";

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
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm">
          <thead className="thead-dark">
            <tr>
              {/* <th>ID</th> */}
              <th>Rank Code</th>
              <th>Withdraw Limit From Wallet(%)</th>
              <th>Withdraw Limit From Profit(%)</th>
              <th>Max Withdraw From Wallet</th>
              <th>Max Withdraw From Profit</th>
              <th>Daily Withdraw Limit</th>
              <th>Total Wallet Withdraw Limit (per Rank)</th>
              <th>Total Profit Withdraw Limit (per Rank)</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                {/* <td>{rule.id}</td> */}
                <td>{rule.rankCode}</td>
                {[
                  "withdrawLimitFromWalletInPercentage",
                  "withdrawLimitFromProfitWalletInPercentage",
                  "maxWithdrawFromWallet",
                  "maxWithdrawFromProfitWallet",
                  "dailyWithdrawLimit",
                  "totalWalletWithdrawLimit",
                  "totalProfitWithdrawLimit"
                ].map((field) => (
                  <td key={field}>
                    <input
                      type="number"
                      step="0.01"
                      className={`form-control form-control-sm ${
                        isCellChanged(rule.id, field) ? "bg-warning" : ""
                      }`}
                      value={rule[field]}
                      onChange={(e) =>
                        handleChange(
                          rule.id,
                          field,
                          field.includes("Percentage") ||
                          field.includes("Fee") ||
                          field.includes("Max")
                            ? parseFloat(e.target.value)
                            : Number(e.target.value)
                        )
                      }
                      onWheel={(e) => e.target.blur()}
                    />
                  </td>
                ))}
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
          className={`alert mt-3 alert-${
            message.type === "success" ? "success" : "danger"
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}
      </div>
    </div>
  );
};

export default WithdrawRuleEditor;
