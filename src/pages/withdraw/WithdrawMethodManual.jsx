import React, { useState } from 'react';
import { LuEye } from "react-icons/lu";
import PageTitle from "../../components/page_title/PageTitle";
import Badge from "../../components/Badge";
import WithdrawApproveForm from './WithdrawApproveForm';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css"; // Add your preferred theme
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { NavLink } from 'react-router-dom';
import RightPanel from '../../components/panel/RightPanel';
ModuleRegistry.registerModules([AllCommunityModule]);


const WithdrawMethodManual = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

    const ActionLink = (props) => {
      console.log("CLICKED....");
      return (
        <button className='round-icon-btn primary-btn' type='button' onClick={handleWithdrawApprovalClick}>
          <LuEye />
        </button>
      );
    };

    const handleWithdrawApprovalClick = () => {
      //setSelectedKyc(kycObj);
      setIsPanelOpen(true);
    }

  const UserCell = ({ data }) => {
    const { userId, user } = data;
    return (
      <NavLink to={`/admin/users/${userId}/edit`}>
        {user}
      </NavLink>
    )
  }

  const AmountCell = ({ value }) => {
    if (!value) return null;

    // Remove currency and commas, just check for minus sign
    const isNegative = value.trim().startsWith('-');

    const style = {
      color: isNegative ? '#ef476f' : '#06d6a0', // red or green
      fontWeight: 'bold',
    };

    return <span style={style}>{value}</span>;
  };

  const [rowData] = useState([
    { date: "Jun 07 2025 05:26", userId: 1, user: "TestTest2362", txnId: "TRXSV7ZJA1U0R", amount: "-25000 INR", charge: "1 INR", gateway: "Admin", status: "Pending", "action": "" },
  ]);

  const [colDefs] = useState([
    { field: "date", width: 150 },
    { field: "user", width: 150 , cellRenderer: UserCell},
    { field: "txnId", width: 150 },
    { field: "amount", width: 120, cellRenderer: AmountCell },
    { field: "charge", width: 100},
    { field: "gateway", width: 100},
    { field: "status", width: 120, cellRenderer: Badge },
    { field: "action", width: 100, cellRenderer: ActionLink},
  ]);




  return (
    <div className="main-content">
      <PageTitle title="Pending Withdraws" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body table-responsive">
                <div className="site-datatable">
                  <div style={{ height: 500 }} className="ag-theme-alpine">
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

      <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} style={{width: '600px'}}>
        <h2>Withdraw Approval Action</h2>
        <WithdrawApproveForm/>
      </RightPanel>


    </div>
  )
};

export default WithdrawMethodManual;
