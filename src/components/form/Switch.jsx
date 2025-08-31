// components/FormInput.jsx
import React, { useEffect, useState } from 'react';

const Switch = ({
    enabled,
    name,
    onToggle,
    labels = ['On', 'Off'],
    disabled = false,
    style = {}
}) => {
    const [internalEnabled, setInternalEnabled] = useState(!!enabled);

    // Keep local state in sync with prop
    useEffect(() => {
        setInternalEnabled(enabled);
    }, [enabled]);

    const handleChange = (e) => {
        if (disabled) return; // prevent change if disabled
        const value = e.target.value === '1'; // Convert "1"/"0" to true/false
        onToggle(name, value);  // Call the parent handler
    };

    // Combine passed-in style with disabled style
    const combinedLabelStyle = {
        ...style,
        ...(disabled ? { backgroundColor: '#cdd2d1' } : {})
    };

    return (

        <div className="switch-field">
            <input
                type="radio"
                id={`${name}-active`}
                name={name}
                value="1"
                checked={enabled === true}
                disabled={disabled}
                onChange={handleChange} />
            <label htmlFor={`${name}-active`} style={enabled === true ? combinedLabelStyle : style}>{labels[0]}</label>
            <input
                type="radio"
                id={`${name}-disabled`}
                name={name}
                value="0"
                checked={enabled === false}
                disabled={disabled}
                onChange={handleChange} />
            <label htmlFor={`${name}-disabled`} style={enabled === false ? combinedLabelStyle : style}>{labels[1]}</label>
        </div>
    );
};

export default Switch;
