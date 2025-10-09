import React, { useState } from 'react';
import { generatePath, NavLink } from 'react-router-dom';
import PageTitle from "../../components/page_title/PageTitle";
import Badge from "../../components/Badge";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css"; // Add your preferred theme
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { API_ROUTES, WEB_ROUTES } from '../../routes';
import { usePaginatedFetch } from '../../api/usePaginatedFetch';
import { LuEye } from 'react-icons/lu';
import RightPanel from '../../components/panel/RightPanel';
import WithdrawApproveForm from './WithdrawApproveForm';
import { CURRENCY_SYMBOL } from '../../constants/config';
ModuleRegistry.registerModules([AllCommunityModule]);


const WithdrawHistory = ({ status = '', pageSize = 9999 }) => {
  const [page, setPage] = useState(0);
  const { data, totalPages, loading, error } = usePaginatedFetch(API_ROUTES.WITHDRAWAL.BASE, page, pageSize, { status });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedWithdraw, setSelectedWithdraw] = useState({});

  const UserCell = ({ data }) => {
    const { createdBy } = data;
    if (!createdBy) return;

    const url = generatePath(WEB_ROUTES.USERS.USER_EDIT.path, { userId: createdBy });
    return <NavLink to={url}>{createdBy}</NavLink>;
  };

  const ActionLink = ({ data }) => {
    return (
      <button className='round-icon-btn primary-btn' type='button' onClick={() => { setSelectedWithdraw(data); setIsPanelOpen(true) }}>
        <LuEye />
      </button>
    );
  };

  const AmountCell = ({ data }) => {
    const { amount, currencyCode } = data;
    if (!amount) return null;
    //return value;

    // Remove currency and commas, just check for minus sign
    const isNegative = amount < 0;
    const sign = isNegative ? '-' : '+';

    const style = {
      color: isNegative ? '#ef476f' : '#2a9d8f', // red or green
      fontWeight: 'bold',
    };

    return <span style={style}>{CURRENCY_SYMBOL}{amount} {currencyCode}</span>;
  };

  const defaultColDef = {
    minWidth: 80,
    resizable: true,
  };


  const colDefs = () => {
    const allCols = [
      { field: "txnDate", width: 200 },
      { field: "createdBy", headerName: "User", width: 100, cellRenderer: UserCell },
      // { field: "txnRefId", width: 150 },
      { field: "type", width: 150, cellRenderer: (params) => <Badge value={params.value ?? "WITHDRAW"} style={{ background: '#5e3fc9' }} /> },
      { field: "amount", width: 120, cellRenderer: AmountCell },
      { field: "txnFee", width: 120, cellRenderer: (params)  => (<span style={{ color: 'red' }}>{CURRENCY_SYMBOL}{params.value}</span>) },
      { field: "walletAddress", width: 180 },
      { field: "status", width: 130, cellRenderer: Badge },
      { field: "action", headerName: "ACTION", width: 120, cellRenderer: ActionLink }
    ];

    return allCols.filter(col => {
      if (status === 'PENDING') {
        return !['txnRefId', 'type', 'status'].includes(col.field);
      } else {
        return !['walletAddress', 'action'].includes(col.field);
      }
    });
  };


  return (
    <div className="main-content">
      <PageTitle title={status === 'PENDING' ? 'Pending Withdraws' : 'Withdraw History'} />

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
                      columnDefs={colDefs()}
                      defaultColDef={defaultColDef}
                      pagination={true}
                      paginationPageSize={10}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} style={{width: '600px'}}>
        <h2>Withdraw Approval Action</h2>
        <WithdrawApproveForm
          withdrawRequest={selectedWithdraw}
          onClose={() => setIsPanelOpen(false)}
        />
      </RightPanel>
    </div>
  )
};

export default WithdrawHistory;
