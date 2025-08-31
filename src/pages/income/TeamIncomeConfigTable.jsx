import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormInputWithUnit from '../../components/form/FormInputWithUnit';
import './TeamIncomeConfigTable.css';
import { API_ROUTES } from '../../constants/apiRoutes';

const RANKS = ['RANK_1', 'RANK_2', 'RANK_3', 'RANK_4', 'RANK_5'];
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

  // Fetch and pivot
  useEffect(() => {
    axios.get(API_ROUTES.TEAM_INCOME_CONFIGS).then(res => {
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
      await axios.put(API_ROUTES.TEAM_INCOME_CONFIGS, unpivoted);
      alert('Update successful');
      setOriginalData(unpivoted);
      setHasChanges(false);
    } catch (e) {
      alert('Update failed');
      console.error(e);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-xl-12 col-md-12'>
          <h3 className="card-title mb-4" style={{ fontWeight: '800' }}>Team Income Config Editor</h3>
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
                            inputClassName={`${isChanged ? 'border-yellow-500 bg-yellow-100' : 'border-gray-300'} w-full`}
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
            className={`mt-3 px-4 py-2 rounded text-white ${hasChanges ? 'site-btn-sm primary-btn' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
