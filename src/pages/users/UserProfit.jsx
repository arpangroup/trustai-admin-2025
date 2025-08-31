import React, { useCallback, useState } from 'react';
import PageTitle from "../../components/page_title/PageTitle";
import Badge from "../../components/Badge";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css"; // Add your preferred theme
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { NavLink } from 'react-router-dom';
import { usePaginatedFetch } from '../../api/usePaginatedFetch';
ModuleRegistry.registerModules([AllCommunityModule]);

const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Format: "Jul 06 2025 08:03"
  const options = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formatted = date.toLocaleString('en-US', options);
  // Reorder the parts to match: "Jul 06 2025 08:03"
  const [monthDay, year, time] = formatted.split(', ');
  return `${monthDay} ${year} ${time}`;
}

const UserProfit = () => {
  const pageSize = 9999;
  const [page, setPage] = useState(0);
  const { data, totalPages, loading } = usePaginatedFetch(`/api/v1/profits`, page, pageSize, null);


  const UserCell = ({ data }) => {
    const { userId, user } = data;
    return (
      <NavLink to={`/admin/users/${userId}/edit`}>
        {user}
      </NavLink>
    )
  }

  const DateCell = ({ value }) => {
    if (!value) return null;
    return <span>{formatDate(value)}</span>;
  };

  const AmountCell = ({ value }) => {
    if (value === null || value === undefined) return null;

    const strValue = String(value); // Convert number to string
    const isNegative = strValue.trim().startsWith('-');

    const style = {
      color: isNegative ? '#ef476f' : '#2a9d8f', // red or green
      fontWeight: 'bold',
    };

    return <span style={style}>{strValue}{" INR"}</span>;
  };

  // const [rowData] = useState([
  //   { date: "Jun 07 2025 05:26", userId: 1, user: "TestTest2362", type: "Signup Bonus", amount: "-+8 INR", profitFrom: "System", description: "Signup Bonus" },
  //   { date: "Jun 07 2025 05:26", userId: 2, user: "JohnDoe123", type: "Signup Bonus", amount: "+8 INR", profitFrom: "System", description: "Signup Bonus" },
  //   { date: "Jun 07 2025 05:26", userId: 2, user: "JohnDoe123", type: "Referral", amount: "+50 INR", profitFrom: "test2test27066", description: "Deposit Referral Bonus Via Test2 Test2 - Level 1" },
  //   { date: "Jun 07 2025 05:26", userId: 2, user: "JohnDoe123", type: "Referral", amount: "+100 INR", profitFrom: "test2test27066", description: "Deposit Referral Bonus Via Test2 Test2 - Level 2" },
  //   { date: "Jun 07 2025 05:26", userId: 2, user: "JohnDoe123", type: "Referral", amount: "+100 INR", profitFrom: "test2test27066", description: "Deposit Referral Bonus Via Test2 Test2 - Level 1" },
  //   { date: "Jun 07 2025 05:26", userId: 2, user: "JohnDoe123", type: "Referral", amount: "+250 INR", profitFrom: "MinalPal6996 ", description: "Deposit Referral Bonus Via Minal Pal - Level 1" },
  //   { date: "Jun 07 2025 05:26", userId: 2, user: "JohnDoe123", type: "Interest", amount: "+1 INR", profitFrom: "System ", description: "Crypto investment Plan Interest" },
  //   { date: "Jun 07 2025 05:26", userId: 2, user: "JohnDoe123", type: "Interest", amount: "+1 INR", profitFrom: "System ", description: "Crypto investment Plan Interest" },
  //   { date: "Jun 07 2025 05:26", userId: 2, user: "JohnDoe123", type: "Bonus", amount: "+10 INR", profitFrom: "System ", description: "Referral Bonus by Level 2" },
  //   { date: "Jun 07 2025 05:26", userId: 2, user: "JohnDoe123", type: "Bonus", amount: "+20 INR", profitFrom: "System ", description: "Referral Bonus by Level 2" },
  // ]);



  const [colDefs] = useState([
    { field: "txnDate", headerName: 'DATE', width: 150, cellRenderer: DateCell },
    { field: "user", headerName: 'USER', width: 200, cellRenderer: UserCell },
    { field: "txnRefId", headerName: 'TXN_ID', width: 150 },
    { field: "txnType", headerName: 'TYPE', width: 150, cellRenderer: (params) => <Badge value={params.value} style={{ background: '#5e3fc9' }} /> },
    { field: "amount", headerName: 'AMOUNT', width: 120, cellRenderer: AmountCell },
    { field: "gateway", width: 150 },
    { field: "status", width: 120, cellRenderer: Badge },
  ]);

  const defaultColDef = {
    // flex: 1,    
    minWidth: 80,
    resizable: true,
  };


  const onPaginationChanged = useCallback((params) => {
    const newPage = params.api.paginationGetCurrentPage();
    setPage(newPage);
  }, []);




  return (
    <div className="main-content">
      <PageTitle title="All Profits" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body table-responsive">
                <div className="site-datatable">
                  <div style={{ height: 500 }} className="ag-theme-alpine">
                    <AgGridReact
                      theme={"legacy"}
                      rowData={data}
                      loading={loading}
                      columnDefs={colDefs}
                      defaultColDef={defaultColDef}
                      pagination={true}
                      paginationPageSize={10}
                      paginationPageSizeSelector={[10, 20, 50, 100]}
                      onPaginationChanged={onPaginationChanged} />
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

export default UserProfit;
