import React from "react";
import moment from "moment";

const InvestmentSummary = ({ data }) => {
  if (!data) return null;

  const {
    schemaName,
    amountRange,
    investedAmount,
    roiType,
    roiValue,
    perPeriodProfit,
    capitalBack,
    capitalReturned,
    currencyCode,
    totalPeriods,
    completedPeriods,
    remainingPeriods,
    expectedReturn,
    receivedReturn,
    profit,
    totalEarningPotential,
    earlyExitPenalty,
    nextReturnAmount,
    subscribedAt,
    nextPayoutDate,
    maturityAt,
    payoutFrequencyLabel,
    investmentStatus,
    canCancelNow,
    daysRemaining,
    withdrawableNow,
  } = data;

  const percentComplete = ((completedPeriods / totalPeriods) * 100).toFixed(1);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">{schemaName}</h5>
        <small>{payoutFrequencyLabel} Investment Summary</small>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-6">
            <p><strong>Invested Amount:</strong> ₹{investedAmount}</p>
            <p><strong>ROI:</strong> {roiValue}% ({roiType})</p>
            <p><strong>Per Period Profit:</strong> ₹{perPeriodProfit}</p>
            <p><strong>Capital Back:</strong> {capitalBack ? 'Yes' : 'No'}</p>
            <p><strong>Capital Returned:</strong> {capitalReturned ? 'Yes' : 'No'}</p>
            <p><strong>Amount Range:</strong> {amountRange}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Total Periods:</strong> {totalPeriods}</p>
            <p><strong>Remaining Periods:</strong> {remainingPeriods}</p>
            <p><strong>Expected Return:</strong> ₹{expectedReturn}</p>
            <p><strong>Total Earning Potential:</strong> ₹{totalEarningPotential}</p>
            <p><strong>Early Exit Penalty:</strong> ₹{earlyExitPenalty}</p>
            <p><strong>Next Return Amount:</strong> ₹{nextReturnAmount}</p>
          </div>
        </div>

        <hr />

        <div className="row mb-3">
          <div className="col-md-4">
            <p><strong>Status:</strong> <span className="badge bg-info">{investmentStatus}</span></p>
            <p><strong>Subscribed At:</strong> {moment(subscribedAt).format("DD MMM YYYY")}</p>
          </div>
          <div className="col-md-4">
            <p><strong>Next Payout:</strong> {moment(nextPayoutDate).format("DD MMM YYYY")}</p>
            <p><strong>Maturity Date:</strong> {moment(maturityAt).format("DD MMM YYYY")}</p>
          </div>
          <div className="col-md-4">
            <p><strong>Days Remaining:</strong> {daysRemaining} days</p>
            <p><strong>Withdrawable Now:</strong> {withdrawableNow ? 'Yes' : 'No'}</p>
            <p><strong>Can Cancel Now:</strong> {canCancelNow ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="mb-2"><strong>Progress:</strong></div>
        <div className="progress" style={{ height: '20px' }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-success"
            role="progressbar"
            style={{ width: `${percentComplete}%` }}
            aria-valuenow={percentComplete}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {percentComplete}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSummary;
