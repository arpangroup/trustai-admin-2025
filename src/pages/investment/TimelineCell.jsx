import React, { useEffect, useState } from "react";

const TimelineCell = (params) => {
  const rowData = params?.data;
  const [timeLeft, setTimeLeft] = useState({});
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!rowData?.subscribedAt || !rowData?.maturityAt) return;

    const updateCountdown = () => {
      const now = new Date();
      const subscribedAt = new Date(rowData.subscribedAt);
      const maturityAt = new Date(rowData.maturityAt);

      const totalDuration = maturityAt - subscribedAt;
      const elapsed = now - subscribedAt;
      const remaining = maturityAt - now;

      const percent = Math.min(100, ((elapsed / totalDuration) * 100).toFixed(2));
      setPercentage(percent);

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remaining / (1000 * 60)) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [rowData]);

  const format = (v) => (typeof v === "number" && !isNaN(v) ? v.toString().padStart(2, "0") : "00");

  if (!rowData?.subscribedAt || !rowData?.maturityAt) return null;

  return (
    <div className="schema-cell" style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "4px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong>
          <span>
            {format(timeLeft.days)}D : {format(timeLeft.hours)}H : {format(timeLeft.minutes)}M : {format(timeLeft.seconds)}S
          </span>
        </strong>
        <div
          className="site-badge primary-bg ms-2-date"
          style={{
            width: "70px",
            textAlign: "center",
            fontSize: "12px",
            background: "#007bff",
            color: "white",
            padding: "2px 6px",
            borderRadius: "6px",
          }}
        >
          {percentage}%
        </div>
      </div>
      <div className="progress investment-timeline" style={{ height: "6px", width: "100%" }}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-success"
          role="progressbar"
          style={{ width: `${percentage}%`, transition: "width 1s ease-in-out" }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default TimelineCell;
