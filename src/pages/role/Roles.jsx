import React from 'react';
import { LuPencilLine  } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";


import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css"; // Add your preferred theme
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeBalham } from 'ag-grid-community';
import { useState } from "react";
import { NavLink } from "react-router-dom";

import PageTitle from "../../components/page_title/PageTitle";


ModuleRegistry.registerModules([AllCommunityModule]);

const Roles = ({ name }) => {
  const styleEditPermission = {
    padding: '6px 16px',
    lineHeight: '1',
    color: '#ffffff',
    background: '#5e3fc9'
  }


  const ActionLink = (props) => {
    const isSuperAdmin = props.data.id === 1;

    const buttonClass = `site-btn-xs table-btn ${isSuperAdmin ? 'red-btn' : 'primary-btn'}`;
    const commonStyle = { padding: '0px 18px' };

    if (isSuperAdmin) {
      // Just a red button (editable styling), no link
      return (
        <button className={buttonClass} style={commonStyle}>
          <FiAlertTriangle />
          <span>Not Editable</span>
        </button>
      );
    } else {
      // A link with primary button styling
      return (
        <NavLink
          to={`/admin/roles/${props.data.id}/edit`}
          className={buttonClass}
          style={commonStyle}
        >
          <LuPencilLine />
          <span>Edit Permission</span>
        </NavLink>
      );
    }
  };


  const [rowData] = useState([
    { id: 1, name: "Super Admin", action: "" },
    { id: 2, name: "Manager", action: "" },
    { id: 3, name: "Editor", action: "" },
  ]);

  const [colDefs] = useState([
    { field: "id" },
    { field: "name" },
    {
      field: "action",
      headerName: "Action",
      cellRenderer: ActionLink
    },
  ]);


  return (
    <div className="main-content">
      <PageTitle title="All KYC" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body table-responsive">
                <div className="site-datatable">
                  <div style={{ height: 400 }} className="ag-theme-alpine">
                    <AgGridReact
                      theme={"legacy"}
                      rowData={rowData}
                      columnDefs={colDefs} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
