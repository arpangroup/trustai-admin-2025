import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { API_ROUTES } from "../../constants/apiRoutes";
import apiClient from "../../api/apiClient";

const RankConfigEditor = () => {
  const [ranks, setRanks] = useState([]);
  const [changes, setChanges] = useState({});

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const res = await apiClient.get(API_ROUTES.RANK_CONFIGS);
        const flattened = res.map((rank) => ({
          ...rank,
          minLevel1Count: rank.requiredLevelCounts?.["1"] || 0,
          minLevel2Count: rank.requiredLevelCounts?.["2"] || 0,
          minLevel3Count: rank.requiredLevelCounts?.["3"] || 0,
        }));
        setRanks(flattened);
      } catch (error) {
        console.error("Error fetching ranks:", error);
      }
    };

    fetchRanks();
  }, []);

  const handleChange = (id, field, value) => {
    setRanks((prev) =>
      prev.map((rank) =>
        rank.id === id ? { ...rank, [field]: value } : rank
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
    const payload = Object.entries(changes).map(([id, fields]) => {
      const updated = { id: Number(id), ...fields };

      // Reconstruct requiredLevelCounts if level counts changed
      const levelKeys = ["minLevel1Count", "minLevel2Count", "minLevel3Count"];
      const levelCounts = {};
      levelKeys.forEach((k, i) => {
        if (k in fields) levelCounts[(i + 1).toString()] = fields[k];
      });

      if (Object.keys(levelCounts).length > 0) {
        updated.requiredLevelCounts = levelCounts;
        levelKeys.forEach((k) => delete updated[k]);
      }

      return updated;
    });

    axios
      .patch(`${API_ROUTES.RANK_CONFIGS_UPDATE}`, payload)
      .then(() => {
        alert("Ranks updated successfully!");
        setChanges({});
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating ranks.");
      });
  };

  const isCellChanged = (id, field) => changes[id]?.hasOwnProperty(field);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Rank Config Editor</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm">
          <thead className="thead-dark">
            <tr>
              <th>RANK ID</th>
              <th>RANK CODE</th>
              <th>MINIMUM DEPOSIT BALANCE ($) </th>
              <th>MINIMUM INVEST AMOUNT ($)</th>
              <th>TXN PER DAY</th>
              <th>RANK BONUS</th>
              <th>COMISSION (%)</th>
              <th>DIRECT REFERRALS (Lv.A)</th>
              <th>LEVEL-B REQUIRED</th>
              <th>LEVEL-C REQUIRED</th>
              {/* <th>REFERRAL DEPOSITS</th> */}
              {/* <th>REFERRAL INVESTMENTS</th> */}
              {/* <th>Income</th> */}
            </tr>
          </thead>
          <tbody>
            {ranks.map((rank) => (
              <tr key={rank.id}>
                <td>{rank.id}</td>
                <td>
                  <NavLink to={`/admin/rankings/edit/${rank.id}`}>
                    {rank.code}
                  </NavLink>
                </td>
                {[
                  "minDepositAmount",
                  "minInvestmentAmount",
                  "txnPerDay",
                  "rankBonus",
                  "commissionPercentage",
                  "minDirectReferrals",
                  // "minLevel1Count",
                  "minLevel2Count",
                  "minLevel3Count",
                  // "minReferralTotalDeposit",
                  // "minReferralTotalInvestment",
                  // "minTotalEarnings",
                ].map((field) => (
                  <td key={field}>
                    <input
                      type="number"
                      className={`form-control form-control-sm ${isCellChanged(rank.id, field) ? "bg-warning" : ""
                        }`}
                      value={rank[field]}
                      onChange={(e) =>
                        handleChange(rank.id, field, Number(e.target.value))
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
            Update Changed Ranks
          </button>
        </div>
      )}
    </div>
  );
};

export default RankConfigEditor;
