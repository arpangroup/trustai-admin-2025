import React from 'react';
import { LuPlus, LuPencilLine, LuTrash } from "react-icons/lu";
import PageTitle from '../../components/page_title/PageTitle';


import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css"; // Add your preferred theme
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeBalham } from 'ag-grid-community';
import { useState } from "react";
import { NavLink } from "react-router-dom";


const KycForms = () => {

  const styleActionButtonEdit = {
    background: "#ef476f",
    width: "30px",
    height: "30px",
    lineHeight: "30px",
    borderRadius: "50%",
    marginRight: "3px",
    color: "#ffffff",
    display: "inline-block",
    textAlign: "center",
    color: "#ffffff",
    background: "#5e3fc9",
  };

  const styleActionButtonDelete = {
    background: "#ef476f",
    width: "30px",
    height: "30px",
    lineHeight: "30px",
    borderRadius: "50%",
    marginRight: "3px",
    color: "#ffffff",
    display: "inline-block",
    textAlign: "center",
    color: "#ffffff",
    background: "#ef476f",
  };

  const ActionLinkAddNew = (props) => {
    return (
      <a href="/admin/kyc_forms/create"
        class="title-btn">
        <LuPlus />
        <span> ADD NEW</span>
      </a>
    );
  };

  
  const ActionLink = (props) => {
    return (
       <>
       <NavLink to={`/admin/kyc/${props.data.id}/edit`} style={styleActionButtonEdit} class="round-icon-btn red-btn editKyc">
       <LuPencilLine/>
      </NavLink>

      <NavLink to={`#`} style={styleActionButtonDelete} class="round-icon-btn red-btn deleteKyc">
       <LuTrash/>
      </NavLink>
       </>
    );
  };

  
      const [rowData] = useState([
        { verificationName: "PAN Verify", id: "1", status: "Active", action: "" },
        { verificationName: "John Doe", id: "1", status: "Active", action: "" },
      ]);
    
      const [colDefs] = useState([
        { field: "verificationName" },
        { field: "status" },
        {
          field: "action",
          headerName: "Action",
          cellRenderer: ActionLink
        },
      ]);


  return (
    <div className="main-content">
      <PageTitle
        title="KYC Forms"
        actionLink={<ActionLinkAddNew />}
      />



      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body table-responsive">
                <div className="site-datatable">
                  <div style={{ height: 500, width: '100%' }} className="ag-theme-alpine">
                    <AgGridReact
                      theme={"legacy"}
                      rowData={rowData}
                      columnDefs={colDefs}
                      pagination={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





    </div>
  )
};


export default KycForms;