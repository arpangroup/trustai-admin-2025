import React, { useState } from 'react';
// import './SideNavV1.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { FiUsers } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


import menuData from '../../constants/menuData'; // Adjust path as needed

const SideNavV1 = ({ navFolded }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();


  const toggleDropdown = (e, index) => {
    e.preventDefault();
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Add side-nav-hover only if navFolded AND hovered
  const sideNavClass = `side-nav ${navFolded && isHovered ? 'side-nav-hover' : ''} ${navFolded ? 'side-nav-collapsed' : ''}`;


  return (
    <div
      className={sideNavClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="side-nav-inside">
        <ul className="side-nav-menu">
          {menuData.map((item, index) => {
            if (item.type === 'link') {
              // return (
              //   <li 
              //     className="side-nav-item"
              //     key={index}>
              //     {/* <a href={item.href}>
              //       {item.icon}
              //       <span>{item.label}</span>
              //     </a> */}
              //     <NavLink 
              //       to={item.href} 
              //       className={({ isActive }) => `side-nav-link ${isActive ? 'active' : ''}`}
              //     >
              //       {item.icon}
              //       <span>{item.label}</span>
              //     </NavLink>
              //   </li>
              // );
              return (
                <li
                  key={index}
                  className={`side-nav-item ${location.pathname === item.href ? 'active' : ''}`}
                >
                  <NavLink to={item.href} className="side-nav-link">
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            }

            if (item.type === 'sectionTitle') {
              return (
                <li className="side-nav-item category-title" key={index}>
                  <span>{item.label}</span>
                </li>
              );
            }

            if (item.type === 'dropdown') {
              const isOpen = openDropdowns[index];
              // return (
              //   <li
              //     className={`side-nav-item side-nav-dropdown ${isOpen ? 'show' : ''}`}
              //     key={index}
              //   >
              //     <a
              //       href="#!"
              //       className="dropdown-link"
              //       onClick={(e) => toggleDropdown(e, index)}
              //     >
              //       {item.icon}
              //       <span>{item.label}</span>
              //       <span className="right-arrow">
              //         {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              //       </span>
              //     </a>
              //     <ul className={`dropdown-items ${isOpen ? 'show' : ''}`}>
              //       {item.items.map((subItem, subIndex) => (
              //         <li
              //         className={location.pathname === item.href ? 'active' : ''} 
              //         key={subIndex}
              //         >
              //           <a href={subItem.href}>
              //             {subItem.icon}
              //             <span>{subItem.label}</span>
              //           </a>
              //         </li>
              //       ))}
              //     </ul>
              //   </li>
              // );
              const isSubRouteActive = item.items.some(
                (subItem) => location.pathname === subItem.href
              );

              return (
                <li
                  className={`side-nav-item side-nav-dropdown ${isOpen ? 'show' : ''} ${isSubRouteActive ? 'active' : ''}`}
                  key={index}
                >
                  <a
                    href="#!"
                    className="dropdown-link"
                    onClick={(e) => toggleDropdown(e, index)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <span className="right-arrow">
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </a>
                  <ul className={`dropdown-items ${isOpen ? 'show' : ''}`}>
                    {item.items.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={location.pathname === subItem.href ? 'active' : ''}
                      >
                        <NavLink to={subItem.href}>
                          {subItem.icon}
                          <span>{subItem.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              )

            }

            return null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideNavV1;
