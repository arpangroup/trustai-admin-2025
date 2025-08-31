import React from 'react';
import chipIcon from '../../../assets/icons/chip-icon.png';
import { LuMail, LuUserPlus, LuWallet } from "react-icons/lu";
import BalanceCard from '../../../components/card/BalanceCard';
import Switch from '../../../components/form/Switch';
import AccountStatusForm from '../AccountStatusForm';
import TransactionStatusForm from '../TransactionStatusForm';
import WalletStatus from '../WalletStatus';
import './ProfileCard.css'
import ButtonsWithTooltips from '../ButtonsWithTooltips';

const ProfileCard = () => {
    const userId = 19;
    const data = {
        username: "JohnDoe",
        firstName: "John",
        lastName: "Doe",
        country: "India",
        walletBalance: 0,
        profitBalance: 0,
        currency: "USD"
    }

    const userStatus = {
        accountStatus: false,
        emailVerified: true,
        kycVerified: true,
        '2FAVerified': false,
    };
    const transactionStatus = {
        depositStatus: false,
        withdrawStatus: true,
        sendMoneyStatus: true,
    };


    return (
        <div className="profile-card">
            <div className="top">
                <div className="avatar">
                    <span className="avatar-text">JD</span>
                </div>
                <div className="title-des">
                    <h4>{data.username}</h4>
                    <p>{data.country}</p>
                </div>

                <ButtonsWithTooltips/>


            </div>

            <WalletStatus
                walletBalance="0"
                profitBalance="0"
                currency="USD" />

            {/* Account Status Update */}
            <AccountStatusForm
                initialStatus={userStatus}
                userId={userId} />


            {/* Transaction Status Update */}
            <TransactionStatusForm
                initialStatus={transactionStatus}
                userId={userId} />


        </div>
    );
};

export default ProfileCard;
