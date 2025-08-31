import React from 'react';
import './Card.css';

const Card = ({ title, count = 0, backgroundColor, isBack = false, actionLink = null }) => {

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="data-card" style={{ backgroundColor }}>
                <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="users" icon-name="users" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div className="content">
                    <h4 className="count">{count}</h4>
                    <p>{title}</p>
                </div>
                <a className="link" href="https://81habibi.com/admin/user"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="external-link" icon-name="external-link" className="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg></a>
            </div>
        </div>
    );
};

export default Card;
