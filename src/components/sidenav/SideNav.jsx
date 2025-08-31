import React, { useState } from 'react';
import './SideNav.css';

import { FaChevronDown , FaChevronUp} from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";


const SideNav = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (e, index) => {
    e.preventDefault(); // Prevent anchor default behavior
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="side-nav">
      <div className="side-nav-inside">
        <ul className="side-nav-menu">

          {/* Static item */}
          <li className="side-nav-item active">
            <a href="/admin">
              <i icon-name="layout-dashboard"></i>
              <span>Dashboard</span>
            </a>
          </li>

          {/* Example: Section Title */}
          <li className="side-nav-item category-title">
            <span>Customer Management</span>
          </li>

          {/* Dropdown Example */}
          <li className={`side-nav-item side-nav-dropdown ${openDropdowns[1] ? 'open' : ''}`}>
            <a
              href="#!"
              className="dropdown-link"
              onClick={(e) => toggleDropdown(e, 1)}
            >
              <FiUsers />
              <span>Customers</span>
              <span className="right-arrow">
                 {openDropdowns[1] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </a>
            <ul className={`dropdown-items ${openDropdowns[1] ? 'show' : ''}`}>
              <li><a href="users.html"><FiUsers /><span>All Customers</span></a></li>
              <li><a href="/admin/user/active"><FiUsers/><span>Active Customers</span></a></li>
              <li><a href="/admin/user/disabled"><FiUsers /><span>Disabled Customers</span></a></li>
              <li><a href="notification_all.html"><FiUsers /><span>Notifications</span></a></li>
              <li><a href="mail-send-all.html"><FiUsers /><span>Send Email to all</span></a></li>
            </ul>
          </li>

          {/* KYC Dropdown */}
          <li className={`side-nav-item side-nav-dropdown ${openDropdowns[2] ? 'open' : ''}`}>
            <a href="#!" 
              className="dropdown-link" 
              onClick={(e) => toggleDropdown(e, 2)}>
              <FiUsers />
              <span>KYC Management</span>
              <span className="right-arrow">
                 {openDropdowns[2] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </a>

            <ul className={`dropdown-items ${openDropdowns[2] ? 'show' : ''}`}>
              <li><a href="users.html"><FiUsers /><span>Pending KYC</span></a></li>
              <li><a href="/admin/user/active"><FiUsers/><span>Rejected KYC</span></a></li>
              <li><a href="/admin/user/disabled"><FiUsers /><span>All KYC Logs</span></a></li>
              <li><a href="notification_all.html"><FiUsers /><span>KYC Form</span></a></li>
            </ul>
          </li>

          {/* Repeat for all other sections */}
          {/* You can extract each dropdown into its own component for cleaner code. */}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
