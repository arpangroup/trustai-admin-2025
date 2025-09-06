import { useState } from "react";
import './SupportTicket.css';
import { LuEye, LuPlus, LuMegaphone } from "react-icons/lu";
import PageTitle from "../../components/page_title/PageTitle";
import { NavLink } from "react-router-dom";
import Badge from "../../components/Badge";


import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css"; // Add your preferred theme
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeBalham } from 'ag-grid-community';


export default function SupportTicket() {

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
      <a href="/ranking/create"
        class="title-btn">
        <LuPlus />
        <span> ADD NEW</span>
      </a>
    );
  };

  const ActionLink = (props) => {
    return (
      <NavLink to={`/tickets/${props.data.id}/details`} style={styleActionButtonEdit} class="round-icon-btn red-btn editKyc">
        <LuEye />
      </NavLink>
    );
  };
    

  const TicketNameCell = ({ data }) => {
    const { ticketName, username, userId } = data;
    return (
      <div className="table-description">
        <div className="icon-wrapper">
          <LuMegaphone style={{width: '24px', height: '24px'}}/>
        </div>
        
        <div className="schema-cell">
          {ticketName}
          <NavLink to={`/tickets/${userId}/details`}>
            <strong>{username}</strong>
          </NavLink>
        </div>
      </div>
      )
  }


  const [rowData] = useState([
    { id: 1, userId: 1, username: "John Doe", ticketName: "deposit issue - SUPT587998", openingDate: "May 30 2025 01:39", status: "Open" },
    { id: 1, userId: 1, username: "John Doe", ticketName: "dusherhara - SUPT926714", openingDate: "May 30 2025 01:39", status: "Open" },
    { id: 1, userId: 1, username: "John Doe", ticketName: "test - SUPT502443", openingDate: "May 30 2025 01:39", status: "Completed" },
  ]);

  const [colDefs] = useState([
    { field: "ticketName", width: 500, cellRenderer: TicketNameCell },
    { field: "openingDate"},
    { field: "status", cellRenderer: Badge },
    {
      field: "action",
      width: 80,
      headerName: "Action",
      cellRenderer: ActionLink
    },
  ]);

  const defaultColDef = {
    // flex: 1,    
    minWidth: 80,
    resizable: true,
  };



  return (
    <div className="main-content">
      <PageTitle title="All Support Tickets" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body">

                <div className="site-datatable">
                  <div style={{ height: 500 }} className="ag-theme-alpine">
                    <AgGridReact
                      theme={"legacy"}
                      rowData={rowData}
                      columnDefs={colDefs}
                      defaultColDef={defaultColDef}
                      rowHeight={70}
                      pagination={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}