import React, { useEffect, useState } from 'react';
// import './RankConfigEditor.css';
import { LuPlus } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';
import { API_ROUTES } from '../../constants/apiRoutes';
import apiClient from '../../api/apiClient';

const incomeConfigBaseUrl = '/api/v1/config/income';

export default function RankConfigTabularView() {
  const [rankConfigData, setRankConfigData] = useState([]);
  const [rankChanged, setRankChanged] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    fetchRankConfigData();
  }, []);

  const fetchRankConfigData = async () => {
    try {
      const data = await apiClient.get(API_ROUTES.RANK_CONFIGS);
      setRankConfigData(data.content);
      setRankChanged(false);
    } catch (err) {
      setAlertMsg('Failed to load rank data.');
    }
  };

  const handleInputChange = (rank, field, value) => {
    setRankConfigData(prev =>
      prev.map(r => {
        if (r.rank !== rank) return r;

        const updated = { ...r };
        if (field.startsWith('requiredLevelCounts.')) {
          const level = parseInt(field.split('.')[1], 10);
          updated.requiredLevelCounts = {
            ...updated.requiredLevelCounts,
            [level]: +value,
          };
        } else {
          updated[field] = +value;
        }
        return updated;
      })
    );
    setRankChanged(true);
  };

  const updateRankConfig = async () => {
    try {
      const resp = await fetch(`${incomeConfigBaseUrl}/rank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rankConfigData),
      });

      if (resp.ok) {
        setAlertMsg('Rank config updated successfully');
        setRankChanged(false);
      } else {
        setAlertMsg('Failed to update rank config');
      }
    } catch (e) {
      setAlertMsg('Server error: ' + e.message);
    }
  };

  const renderInput = (rank, field, value) => (
    <input
      type="number"
      value={value}
      disabled={true}
      onChange={e => handleInputChange(rank.rank, field, e.target.value)}
    />
  );

  return (
    <section>
      <div className="table-toolbar">
        <a href="/admin/rankings/create" className="title-btn">
          <LuPlus /> <span>ADD NEW</span>
        </a>
      </div>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Min Deposit Balance ($)</th>
            <th>Transactions /Day</th>
            <th>Bonus</th>
            <th>Level-A Required (Direct Referrals)</th>
            <th>Level-B Required</th>
            <th>Level-C Required</th>
            <th>Commission %</th>
            <th>Min Investment Amt in Stake</th>
          </tr>
        </thead>
        <tbody>
          {rankConfigData.map(rank => (
            <tr key={rank.code}>
              <td><NavLink to={`/admin/rankings/edit/${rank.id}`}>{rank.code}</NavLink></td>
              <td>{renderInput(rank, 'minDepositAmount', rank.minDepositAmount)}</td>
              <td>{renderInput(rank, 'txnPerDay', rank.txnPerDay || 0)}</td>
              <td>{renderInput(rank, 'rankBonus', rank.rankBonus || 0)}</td>
              {[1, 2, 3].map(level => (
                <td key={level}>
                  {renderInput(
                    rank,
                    `requiredLevelCounts.${level}`,
                    rank.requiredLevelCounts?.[level] || 0
                  )}
                </td>
              ))}
              <td>{renderInput(rank, 'commissionPercentage', rank.commissionPercentage)}</td>
              <td>{renderInput(rank, 'minInvestmentAmount', rank.minInvestmentAmount || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="alert">{alertMsg}</div>

      <button
        onClick={updateRankConfig}
        className="update-button"
        disabled={!rankChanged}
      >
        Update
      </button>
    </section>
  );
}
