import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuList, LuBellRing, LuGlobe, LuUser } from "react-icons/lu";

// import logo from '../assets/logo.png'; // adjust the path
// import logo from './logo.png'; // adjust the path
import logo from './../../assets/images/logo.webp'
import { AuthContext } from '../../context/AuthContext';

const Header = ({ onToggleSidebar }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);


  const handleLanguageChange = (e) => {
    const selectedUrl = e.target.value;
    window.location.href = selectedUrl;
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();                  // Clear auth tokens
    navigate('/login');        // Redirect to login page
  };

  return (
    <div className="header">
      <div className="logo">
        <a href="/admin">
          <img className="logo-unfold" src={logo} alt="Logo" style={{width: '80px', height: '80px'}} />
          <img className="logo-fold" src={logo} alt="Logo" style={{width: '80px'}}/>
        </a>
      </div>
      <div className="nav-wrap">
        <div className="nav-left">
          <button 
            className="sidebar-toggle"            
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <LuList/>
          </button>
        </div>
        <div className="nav-right">
          {/* <div className="single-nav-right admin-language-switch">
            <select name="language" className="form-select" onChange={handleLanguageChange} defaultValue="/language-update?name=en">
              <option value="/language-update?name=en">English</option>
              <option value="/language-update?name=es">Spanish</option>
              <option value="/language-update?name=fr">French</option>
              <option value="/language-update?name=hi">Hindi</option>
            </select>
          </div> */}

          <div className="single-nav-right admin-notifications">
            <button
              type="button"
              className="item notification-dot"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <LuBellRing className="bell-ringng" style={{height: '24px', width: '24px'}}/>
              <div className="number">15</div>
            </button>
            {notificationsOpen && (
              <div className="dropdown-menu dropdown-menu-end notification-pop show">
                <div className="noti-head">Notifications <span>15</span></div>
                <div className="all-noti">
                  {/* Notification items (should ideally be mapped from data) */}
                  {[195, 194, 192].map((id) => (
                    <div className="single-noti" key={id}>
                      <a href={`/admin/notification-read/${id}`} className="">
                        <div className="icon"><i icon-name="newspaper"></i></div>
                        <div className="content">
                          <div className="main-cont">
                            <span>Test Test</span> The manual deposit request details: TRX{id}
                          </div>
                          <div className="time">3 days ago</div>
                        </div>
                      </a>
                    </div>
                  ))}
                  {/* Add more items or loop based on actual data */}
                </div>
                <div className="noti-footer mt-3">
                  <a className="noti-btn-1 me-1 w-100" href="/admin/notification-read/0">Mark All as Read</a>
                  <a className="noti-btn-2 ms-1 w-100" href="/admin/notification/all">See all Notifications</a>
                </div>
              </div>
            )}
          </div>

          <div className="single-nav-right">
            <a
              href="#"
              // target="_blank"
              rel="noopener noreferrer"
              className="item"
              title="Visit Landing Page"
            >
              <LuGlobe style={{height: '24px', width: '24px'}}/>
            </a>
          </div>

          <div className="single-nav-right">
            <button type="button" className="item" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <LuUser style={{height: '24px', width: '24px'}}/>
            </button>
            {userMenuOpen && (
              <ul className="dropdown-menu dropdown-menu-end show">
                {/* <li>
                  <a href="/admin/profile" className="dropdown-item"><i icon-name="user"></i> Profile</a>
                </li>
                <li>
                  <a href="/admin/password-change" className="dropdown-item"><i icon-name="lock"></i> Change Password</a>
                </li> */}
                <li className="logout">
                  <a href="/logout" className="dropdown-item" onClick={handleLogout}>
                    <i icon-name="log-out"></i> Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
