import React, { useState } from 'react';

const LabelWithInfo = ({ label, info }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <label className="box-input-label d-flex align-items-center gap-1">
      {label}
      {info && (
        <span style={{ position: 'relative' }} className="info-wrapper">
          <span
            onClick={() => setShowTooltip(!showTooltip)}
            onMouseLeave={() => setShowTooltip(false)}
            className="text-info"
            style={{ cursor: 'pointer', fontSize: '14px' }}
          >
            ℹ️
          </span>

          {showTooltip && (
            <div
              className="tooltip-box"
              style={{
                position: 'absolute',
                top: '120%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                zIndex: 1000,
                width: '250px',
                color: '#333',
                whiteSpace: 'normal',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Tooltip Arrow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderBottom: '6px solid #ccc',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '-5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderBottom: '5px solid #fff',
                  zIndex: 1001,
                }}
              />
              <div dangerouslySetInnerHTML={{ __html: info }} />
            </div>
          )}
        </span>
      )}
    </label>
  );
};

export default LabelWithInfo;
