import React, { act } from 'react';
import { useNavigate } from "react-router-dom";
import { LuCornerDownLeft } from "react-icons/lu";

const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const PageTitle = ({ title, isBack = false, actionLink = null }) => {
    const navigate = useNavigate();

    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1); // Go back one step
    };

    return (
        <div className="page-title">
            <div className="container-fluid">
                <div className="row">
                     <div className="col">
                        <div className="title-content">
                            <h2 className="title">{capitalizeWords(title)}</h2>
                            {isBack &&                             
                                <a href="#" onClick={handleBack} className="title-btn">
                                    <LuCornerDownLeft/>
                                    <span>Back</span>
                                </a>
                            }
                            {actionLink}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageTitle;
