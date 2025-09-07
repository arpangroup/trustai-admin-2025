import React from 'react';
import './Card.css';
import * as FaIcons from 'react-icons/fa'; // Import all FontAwesome icons

const Card = ({ title, count = 0, backgroundColor, actionLink, icon }) => {
    // Map icon string to React component or fallback icon
    const IconComponent = icon && FaIcons[icon] ? FaIcons[icon] : FaIcons.FaQuestionCircle;

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="data-card" style={{ backgroundColor }}>
                <div className="icon">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="users" icon-name="users" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> */}
                    <IconComponent size={24} color={backgroundColor} />
                </div>
                <div className="content">
                    <h4 className="count">{count}</h4>
                    <p>{title}</p>
                </div>
                {actionLink && (
                    <a className="link" href={actionLink} target="_blank" rel="noopener noreferrer">
                        <FaIcons.FaExternalLinkAlt size={16} color="#fff" />
                    </a>
                )}

                {/* <a className="link" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="external-link" icon-name="external-link" className="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg></a> */}
            </div>
        </div>
    );
};

export default Card;
