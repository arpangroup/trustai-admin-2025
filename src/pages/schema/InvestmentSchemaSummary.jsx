import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CURRENCY_SYMBOL } from '../../constants/config';

const calculateDailyProfit = (min, rate, scheduleDays) => {
  if (!min || !rate || !scheduleDays) return 0;
  return ((min * rate) / 100) / scheduleDays;
};

const calculateAnnualizedReturn = (rate, periods, intervalDays) => {
  if (!rate || !periods || !intervalDays) return 0;
  const totalDays = periods * intervalDays;
  return ((rate * (365 / totalDays))).toFixed(2);
};

const getDaysFromSchedule = (intervalMinutes) => intervalMinutes / 1440;

const InvestmentSchemaSummary = ({ rankCode : propRankCode = null }) => {
  const [rankCode, setRankCode] = useState(propRankCode || "");
  const [searchInput, setSearchInput] = useState(propRankCode || "");
  const [schemas, setSchemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (propRankCode) {
      fetchSchemas(propRankCode);
    } else {
        setLoading(false);
    }
  }, [propRankCode]);

  const fetchSchemas = async (code) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/investment-schemas", {
        params: code ? { rankCode: code } : {}
      });
      setSchemas(response.data?.content || []);
    } catch (err) {
      console.error("Error fetching schemas", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setRankCode(searchInput.trim());
    fetchSchemas(searchInput.trim());
  };


  if (loading) return <div>Loading schema summary...</div>;

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Investment Schema for <a href='#' className='text-primary'>{rankCode}</a></h4>

        {!propRankCode && (
        <div className="mb-3 d-flex gap-2">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search by Rank Code"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn btn-sm btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      )}

    {loading ? (
        <div>Loading...</div>
      ) : (
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle table-sm">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Investment Range</th>
              <th>Return Rate (%)</th>
              <th>Schedule</th>
              <th>Return Periods</th>
              <th>Daily Profit</th>
              <th>Annualized Return (%)</th>
            </tr>
          </thead>
          <tbody>
            {schemas.map((schema) => {
              const intervalDays = getDaysFromSchedule(schema.returnSchedule?.intervalMinutes);
              const dailyProfit = calculateDailyProfit(
                schema.minimumInvestmentAmount,
                schema.returnRate,
                intervalDays || 1
              ).toFixed(2);
              const annualized = calculateAnnualizedReturn(
                schema.returnRate,
                schema.totalReturnPeriods || 1,
                intervalDays || 1
              );

              return (
                <tr key={schema.id}>
                  <td>{schema.title}</td>
                  <td>
                    {CURRENCY_SYMBOL}{schema.minimumInvestmentAmount.toFixed(2)}
                    {schema.maximumInvestmentAmount > 0 && ` - ${CURRENCY_SYMBOL}${schema.maximumInvestmentAmount.toFixed(2)}`}
                  </td>
                  <td>{schema.returnRate.toFixed(2)}</td>
                  <td>{schema.returnSchedule?.scheduleName}</td>
                  <td>{schema.totalReturnPeriods || '∞'}</td>
                  <td>{CURRENCY_SYMBOL}{dailyProfit}</td>
                  <td>{annualized}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default InvestmentSchemaSummary;
