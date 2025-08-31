import React, { useState } from "react";
import ReactDOM from 'react-dom';
import FormInput from "../../components/form/FormInput";
import { LuSend } from "react-icons/lu";
import './DepositSuccess.css';
import { LuPlus, LuCheck  } from "react-icons/lu";

const DepositSuccess = ({ userId, username }) => {
    return (
        <div>
            <div className="progress-steps-form">
                <div className="transaction-status centered">
                    <div className="icon success">
                        <span className="anticon anticon-check"><LuCheck/></span>
                    </div>
                    <h2>₹ 100 Deposit Pending</h2>
                    <p>The amount has been Pending added into your account</p>
                    <p>Transaction ID: TRXIU1NL7RPT1</p>
                    <a href="https://81habibi.com/user/deposit" class="site-btn">
                        <LuPlus/>Deposit again
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DepositSuccess;
