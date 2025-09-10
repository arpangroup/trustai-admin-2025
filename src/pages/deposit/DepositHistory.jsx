import React, { useCallback, useState } from 'react';
import PageTitle from "../../components/page_title/PageTitle";
import Badge from "../../components/Badge";

import { AgGridReact } from "ag-grid-react";
import { NavLink } from 'react-router-dom';
import { API_ROUTES } from '../../routes';
import { usePaginatedFetch } from '../../api/usePaginatedFetch';
import { formatDate } from '../../utils/dateUtils';
import { LuEye } from 'react-icons/lu';
import DepositApproveForm from './DepositApproveForm';
import RightPanel from '../../components/panel/RightPanel';


const DepositHistory = ({ status = '', pageSize = 9999 }) => {
  const [page, setPage] = useState(0);
  const { data, totalPages, loading, error } = usePaginatedFetch(API_ROUTES.DEPOSITS.BASE, page, pageSize, {status});
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState({});

  const UserCell = ({ data }) => {
    const { userId, user } = data;
    return (
      <NavLink to={`/admin/users/${userId}/edit`}>
        {user}
      </NavLink>
    )
  }

  
  const ActionLink = ({data}) => {
    return (
      <button className='round-icon-btn primary-btn' type='button' onClick={() => {setSelectedDeposit(data); setIsPanelOpen(true)}}>
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

    return <span style={style}>{sign}{amount} {currencyCode}</span>;
  };

  const DateCell = ({ value }) => {
    if (!value) return null;    
    //return formatDate(value);
    return value;
  }

  const colDefs = () => {
    const baseCols = [
      { field: "txnDate", headerName: "DATE", width: 220, cellRenderer: DateCell },
      { field: "txnRefId", headerName: "TRANSACTION ID", width: 230 },
      { field: "amount", headerName: "AMOUNT", width: 120, cellRenderer: AmountCell },
      { field: "paymentGateway", headerName: "GATEWAY", width: 120 },
      { field: "txnFee", headerName: "CHARGE", width: 100, valueFormatter: ({ value }) => value != null ? value : 0},
      { field: "status", headerName: "STATUS", width: 120, cellRenderer: Badge },
    ];

    if (status === 'PENDING') {
      baseCols.push({ field: "action", headerName: "ACTION", width: 120, cellRenderer: ActionLink });
    }

    return baseCols;
  };



  const onPaginationChanged = useCallback((params) => {
    const newPage = params.api.paginationGetCurrentPage();
    setPage(newPage);
  }, []);



  return (
    <div className="main-content">
      <PageTitle title={status === 'PENDING' ? 'Pending Manual Deposit' : 'Deposit History'} />

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
                      pagination={true}
                      paginationPageSize={10}
                      onPaginationChanged={onPaginationChanged}
                      paginationPageSizeSelector={[10, 20, 50, 100]}
                      rowHeight={40}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <h2>Deposit Approval Action</h2>
        <DepositApproveForm 
          depositData={selectedDeposit}
          onClose={() => setIsPanelOpen(false)}
        />
      </RightPanel>
    </div>
  )
};

export default DepositHistory;

