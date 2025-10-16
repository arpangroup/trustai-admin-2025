import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../../../routes";
import apiClient from "../../../api/apiClient";

const PrintLogViewer = ({ userId }) => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchLogs = (pageNum = 0) => {
    const params = { page: pageNum, size };
    if (userId) params.userId = userId;

    
    apiClient.get(API_ROUTES.LOGS, { params })
    .then(res => {
        setLogs(res.data.content);
        setTotalPages(res.data.totalPages);
        setPage(res.data.number);
    })
    .catch(err => console.error(err));

  };

  useEffect(() => {
    fetchLogs();
  }, [userId]);

  return (
    <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", padding: "1rem" }}>
      {logs.length === 0 ? (
        <p>No logs available</p>
      ) : (
        logs.map(log => (
          <div key={log.id} style={{ marginBottom: "2rem", borderBottom: "1px solid #ccc" }}>
            <div>{log.logContent}</div>
            <small>{new Date(log.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}

      {/* Pagination */}
      <div style={{ marginTop: "1rem" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => fetchLogs(i)}
            disabled={i === page}
            style={{ marginRight: "0.5rem" }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrintLogViewer;
