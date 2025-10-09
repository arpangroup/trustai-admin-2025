import React, { useEffect, useState } from "react";
import "./Toast.css";

export default function Toast({ message, type = "info", duration = 3000, onClose }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 500); // start fade-out a bit before onClose

    const closeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type} ${fadeOut ? "fade-out" : "fade-in"}`}>
      {message}
    </div>
  );
}
