import React from 'react';

const Banner = ({ title, isBack = false, actionLink = null }) => {

    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="admin-latest-announcements">
                        <div className="content"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="zap" icon-name="zap" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>Explore what's important to review first</div>
                        <div className="content">


                            <a href="https://81habibi.com/admin/deposit/manual-pending" className="site-btn-xs primary-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="loader" icon-name="loader" className="lucide lucide-loader spining-icon"><line x1="12" x2="12" y1="2" y2="6"></line><line x1="12" x2="12" y1="18" y2="22"></line><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"></line><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"></line><line x1="2" x2="6" y1="12" y2="12"></line><line x1="18" x2="22" y1="12" y2="12"></line><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"></line><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"></line></svg>Deposit Requests
                                (1)</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
