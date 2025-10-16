import React, { useEffect, useState } from "react";
import { API_ROUTES } from "../../../routes";
import apiClient from "../../../api/apiClient";
import "./UplineViewer.css";

const UplineViewer = ({ userId, currentUser }) => {
  const [uplines, setUplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    let mounted = true;
    const fetchUplines = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.get(API_ROUTES.UPLINE_TREE(userId));
        if (!mounted) return;
        let data = Array.isArray(res.data) ? res.data : [];
        // Remove current user if included in uplines
        data = data.filter(u => u.userId !== userId);
        // Sort descending by depth: depthN → depth2 → depth1
        data.sort((a, b) => (b.depth ?? 0) - (a.depth ?? 0));
        setUplines(data);
      } catch (err) {
        console.error("Failed to load upline data", err);
        if (mounted) setError("Failed to load upline");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUplines();
    return () => { mounted = false; };
  }, [userId]);

  if (loading) return <p className="uv-small text-muted">Loading upline...</p>;
  if (error) return <p className="uv-small text-danger">{error}</p>;
  if (!uplines.length && !currentUser) return <p className="uv-small text-muted">No upline data found.</p>;

  const renderCard = (u, isCurrent = false) => {
    const balance = typeof u.walletBalance === "number" ? u.walletBalance.toFixed(2) : (u.walletBalance ?? "0.00");
    return (
      <div className={`uv-card ${u.active ? "uv-active" : ""} ${isCurrent ? "uv-current" : ""}`} key={isCurrent ? `current-${u.userId || "you"}` : `u-${u.userId}`}>
        <div className="uv-top">
          <div className="uv-name">{u.username || (isCurrent ? "You" : "—")}</div>
          <div className="uv-id">#{u.userId ?? "-"}</div>
        </div>
        <div className="uv-meta">
          <span className="uv-rank">{u.userRank ?? ""}</span>
          <span className="uv-balance">₹{balance}</span>
        </div>
        <div className="uv-depth">Depth {u.depth ?? "-"}</div>
      </div>
    );
  };

  return (
    <div className="upline-viewer-compact">
      {uplines.map((u, idx) => (
        <div className="uv-node" key={`node-${u.userId}-${u.depth ?? idx}`}>
          {renderCard(u)}
          <div className="uv-arrow">↓</div>
        </div>
      ))}

      {/* Current user - always last */}
      <div className="uv-node current-node">
        {renderCard(currentUser ?? { userId, username: "You", walletBalance: currentUser?.walletBalance ?? 0, userRank: currentUser?.userRank ?? "" }, true)}
      </div>
    </div>
  );
};

export default UplineViewer;
