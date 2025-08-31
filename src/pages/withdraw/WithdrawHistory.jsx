import React, { useState } from 'react';
import PageTitle from "../../components/page_title/PageTitle";
import Badge from "../../components/Badge";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css"; // Add your preferred theme
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { NavLink } from 'react-router-dom';
ModuleRegistry.registerModules([AllCommunityModule]);


const WithdrawHistory = () => {

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
      color: isNegative ? '#ef476f' : '#2a9d8f', // red or green
      fontWeight: 'bold',
    };

    return <span style={style}>{value}</span>;
  };

  const [rowData] = useState([
    { date: "Jun 07 2025 05:26", userId: 1, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Withdraw", amount: "-2000 INR", gateway: "WITHDRAWAL", status: "Pending" },
    { date: "Jun 07 2025 05:26", userId: 2, user: "JohnDoe123", txnId: "TRXPOZ5ZZYDTJ", type: "Investment", amount: "-5000 INR", gateway: "System", status: "Success" },
    { date: "Jun 07 2025 05:26", userId: 3, user: "ElonMusk9897", txnId: "TRXPOZ5ZZYDTJ", type: "Refund", amount: "5000 INR", gateway: "System", status: "Success" },
    { date: "Jun 07 2025 05:26", userId: 4, user: "SteveJobs5454", txnId: "TRXPOZ5ZZYDTJ", type: "Subtract", amount: "-5000 INR", gateway: "System", status: "Success" },
    { date: "Jun 07 2025 05:26", userId: 5, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Withdraw", amount: "-5000 INR", gateway: "WITHDRAWAL", status: "Cancelled" },
    { date: "Jun 07 2025 05:26", userId: 6, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Investment", amount: "-5000 INR", gateway: "System", status: "Success" },
    { date: "Jun 07 2025 05:26", userId: 7, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Signup Bonus", amount: "-5000 INR", gateway: "System", status: "Success" },
    { date: "Jun 07 2025 05:26", userId: 8, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Deposit", amount: "-5000 INR", gateway: "System", status: "Success" },
    { date: "Jun 07 2025 05:26", userId: 9, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Refund", amount: "-5000 INR", gateway: "System", status: "Success" },
    { date: "Jun 07 2025 05:26", userId: 10, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Referral", amount: "-5000 INR", gateway: "System", status: "Success" },
    { date: "Jun 07 2025 05:26", userId: 11, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Exchange", amount: "-5000 INR", gateway: "System", status: "Success" },
    { date: "Jun 07 2025 05:26", userId: 12, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Manual Deposit", amount: "100 INR", gateway: "Cytugi", status: "Cancelled" },
    { date: "Jun 07 2025 05:26", userId: 13, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Interest", amount: "-5000 INR", gateway: "System", status: "Success" },
    { date: "Jun 07 2025 05:26", userId: 14, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Bonus", amount: "-5000 INR", gateway: "System", status: "Success" },
    { date: "Jun 07 2025 05:26", userId: 15, user: "TestTest2362", txnId: "TRXPOZ5ZZYDTJ", type: "Manual Deposit", amount: "100 INR", gateway: "Testbep201234567890", status: "Cancelled" },
  ]);

  const [colDefs] = useState([
    { field: "date", width: 150 },
    { field: "user", width: 200 , cellRenderer: UserCell},
    { field: "txnId", width: 150 },
    { field: "type", width: 150, cellRenderer: (params) => <Badge value={params.value} style={{ background: '#5e3fc9' }} /> },
    { field: "amount", width: 120, cellRenderer: AmountCell },
    { field: "gateway", width: 150 },
    { field: "status", width: 120, cellRenderer: Badge },
  ]);




  return (
    <div className="main-content">
      <PageTitle title="Withdraw History" />

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
    </div>
  )
};

export default WithdrawHistory;
