import React from 'react';
import chipIcon  from '../../assets/icons/chip-icon.png';
// import chipIcon  from '../../assets/icons/chip-icon.png';

const BalanceCard = ({ cardTitle, amount, currency = "USD", actionLink = null }) => {

    return (
        <div className="admin-user-balance-card">
            <div className="wallet-name">
                <div className="name">{cardTitle}</div>
                <div className="chip-icon">
                    <img src={chipIcon} alt="Chip Icon" width={36} height={28} />
                </div>
            </div>
            <div className="wallet-info">
                <div className="wallet-id">{currency}</div>
                <div className="balance">₹{amount}</div>
            </div>
        </div>
    );
};

export default BalanceCard;
