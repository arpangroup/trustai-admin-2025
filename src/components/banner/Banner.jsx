import React from 'react';
import './Banner.css';
import { FaCog } from 'react-icons/fa';
import { WEB_ROUTES } from "../../routes";

const Banner = ({ title, isBack = false, actionLink = null }) => {

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="admin-latest-announcements d-flex justify-content-between align-items-center">
                    <div className="content"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="zap" icon-name="zap" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>Explore what's important to review first</div>
                    <div className="content">


                        <a href={WEB_ROUTES.DEPOSIT.PENDING.path} className="site-btn-xs primary-btn">
                            <FaCog size={24} className="spinning-icon" />
                            Deposit Requests
                            (1)</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
