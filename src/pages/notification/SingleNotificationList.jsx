import React from 'react';
import { LuExternalLink } from "react-icons/lu";

const SingleNotificationList = ({ notification }) => {// isRead
    
    return (
         <div className={`single-list ${notification.isRead ? 'read' : ''}`}>
            <div className="cont">
                <div className="icon">{notification.icon}</div>
                <div className="contents">{notification.message}
                    <div className="time">3 days ago</div>
                </div>
            </div>
            <div className="link">
                <a href={notification.link}
                    className="site-btn-xs red-btn">
                        <LuExternalLink/>
                        <span>Explore</span>
                    </a>
            </div>
        </div>

    );
};

export default SingleNotificationList;