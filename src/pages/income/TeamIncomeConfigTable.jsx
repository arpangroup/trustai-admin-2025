import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormInputWithUnit from '../../components/form/FormInputWithUnit';
import './TeamIncomeConfigTable.css';
import { API_ROUTES } from '../../routes';
import apiClient from '../../api/apiClient';

const RANKS = ['RANK_0', 'RANK_1', 'RANK_2', 'RANK_3', 'RANK_4', 'RANK_5'];
const LEVEL_LABELS = {
  1: 'Lv.A / Depth-1',
  2: 'Lv.B / Depth-2',
  3: 'Lv.C / Depth-3'
};

export default function TeamIncomeConfigTable() {
  const [pivotedData, setPivotedData] = useState({ 1: {}, 2: {}, 3: {} });
  const [originalData, setOriginalData] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch and pivot
  useEffect(() => {
    apiClient.get(API_ROUTES.TEAM_INCOME_CONFIGS).then(res => {
      const rawData = res.data;
      const pivot = { 1: {}, 2: {}, 3: {} };

      rawData.forEach(({ id, payoutPercentage }) => {
        const { uplineRank, downlineDepth } = id;
        if (!pivot[downlineDepth]) pivot[downlineDepth] = {};
        pivot[downlineDepth][uplineRank] = payoutPercentage;
      });

      setOriginalData(rawData);
      setPivotedData(pivot);
      setHasChanges(false);
      setLoading(false);
    });
  }, []);

  const handleInputChange = (depth, rank, value) => {
    setMessage(null)
    const numericValue = parseFloat(value) || 0;

    const updatedPivot = {
      ...pivotedData,
      [depth]: {
        ...pivotedData[depth],
        [rank]: numericValue
      }
    };
    setPivotedData(updatedPivot);

    // Determine if anything changed
    const changed = originalData.some(
      item =>
        item.id.downlineDepth === depth &&
        item.id.uplineRank === rank &&
        item.payoutPercentage !== numericValue
    );
    setHasChanges(changed);
  };

  const handleUpdate = async () => {
    const unpivoted = [];

    Object.entries(pivotedData).forEach(([depth, ranks]) => {
      Object.entries(ranks).forEach(([rank, percentage]) => {
        unpivoted.push({
          id: { uplineRank: rank, downlineDepth: Number(depth) },
          payoutPercentage: percentage
        });
      });
    });

    try {
      await apiClient.put(API_ROUTES.TEAM_INCOME_CONFIGS, unpivoted);
      setOriginalData(unpivoted);
      setHasChanges(false);
      setMessage({ text: "Update successful", type: "success" });
    } catch (e) {
      console.error(e);
      setMessage({ text: "Update failed", type: "error" });
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-xl-12 col-md-12'>
          <h3 className="card-title mb-4" style={{ fontWeight: '800' }}>Team Income Config Editor</h3>
         {/* <div className="alert alert-info" role="alert" style={{ fontStyle: 'italic' }}>
            <strong>Important:</strong> Enter percentage values in <u>decimal form</u>.  
            For example:
            <ul className="mb-0">
              <li>1% = 0.01</li>
              <li>5% = 0.05</li>
            </ul>
            If you enter <code>5</code>, it will be treated as <strong>500%</strong>, so please input values correctly.  
            <br />
            <em>The system does <strong>not</strong> divide values by 100 internally.</em>
          </div> */}

          
          <div className="alert alert-info" role="alert" style={{ fontStyle: 'italic' }}>
            <strong>Note:</strong> Enter the percentage as a whole number (e.g., <code>1</code> for 1%).  
            The system will automatically divide the entered value by 100 during calculations.  
            <br />
            For example, if you enter <code>1</code>, the system will calculate it as <code>1 / 100 = 0.01</code>.
          </div>


          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-bordered income-config" id="teamIncomeTable">
              <thead className='thead-light'>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left" style={{ width: '150px' }}>Level</th>
                  {RANKS.map(rank => (
                    <th key={rank} className="border">{rank}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map(depth => (
                  <tr key={depth}>
                    <td className="border p-2">{LEVEL_LABELS[depth]}</td>
                    {RANKS.map(rank => {
                      const currentValue = pivotedData[depth]?.[rank] || 0;
                      const originalValue = originalData.find(
                        r => r.id.uplineRank === rank && r.id.downlineDepth === depth
                      )?.payoutPercentage || 0;
                      const isChanged = currentValue !== originalValue;

                      return (
                        <td key={`${depth}-${rank}`} className="border p-1">
                          <FormInputWithUnit
                            type="number"
                            name={`${depth}-${rank}`}
                            value={currentValue}
                            unit="%"
                            inputClassName={`form-control ${isChanged ? 'bg-warning border-warning' : ''}`}
                            onChange={e => handleInputChange(depth, rank, e.target.value)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

            <button
              onClick={handleUpdate}
              disabled={!hasChanges}
              className={`btn ${hasChanges ? 'btn-primary' : 'btn-secondary'} mt-3 ps-4 pe-4`}
            >
              Update
            </button>

            {message && (
              <div
                className={`alert mt-3 alert-${message.type === "success" ? "success" : "danger"}`}
                role="alert"
              >
                {message.text}
              </div>
            )}


          {/* ===== Description Section START ===== */}
          <div className="mt-4">
            <h5>🛈 How This Configuration Table Works</h5>
            <p>This table defines the <strong>team income payout percentages</strong> based on two key factors:</p>
            <ul>
              <li><strong>Level (Depth)</strong>: 
                <ul>
                  <li><strong>Lv.A / Depth-1</strong>: Direct downline (first-level referrals)</li>
                  <li><strong>Lv.B / Depth-2</strong>: Second-level downline</li>
                  <li><strong>Lv.C / Depth-3</strong>: Third-level downline</li>
                </ul>
              </li>
              <li><strong>Upline Rank</strong>: Columns RANK_0 to RANK_5 represent the rank of the person earning the income.</li>
            </ul>

            <p><strong>Each cell</strong> shows the percentage (%) that an upline at a specific rank receives from a downline member at a certain depth level.</p>
            
            <p><em>For example:</em> If a user at <strong>RANK_3</strong> earns income from someone at <strong>Depth-2</strong> (Lv.B), the system uses the value in the <strong>Lv.B row, RANK_3 column</strong>.</p>

            <h6>✅ How to Use</h6>
            <ul>
              <li>Edit the payout % in any cell as needed.</li>
              <li>Changed values will be highlighted in yellow.</li>
              <li>Click the <strong>Update</strong> button to save your changes.</li>
            </ul>

            <h6>⚠️ Note</h6>
            <ul>
              <li>All values should be numbers (the '%' is automatically shown).</li>
              <li>Ensure your configuration aligns with your compensation structure.</li>
            </ul>
          </div>
          {/* ===== Description Section END ===== */}

        </div>        
      </div>
    </div>
  );
}
