// External imports
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';

// Internal project imports
import { API_ROUTES } from '../routes';
import { formatDate } from '../utils/dateUtils';
import { usePaginatedFetch } from '../api/usePaginatedFetch';
import Badge from './Badge';

// Cell renderers
const UserCell = ({ data }) => {
  const { userId, user } = data;
  return <NavLink to={`/admin/users/${userId}/edit`}>{user}</NavLink>;
};

const DateCell = ({ value }) => {
  if (!value) return null;
  return <span>{formatDate(value)}</span>;
};

const AmountCell = ({ data }) => {
  const {amount, balance, credit, currencyCode} = data;
  if (amount === null || amount === undefined) return null;

  const strValue = String(amount);
  const isNegative = !credit || strValue.trim().startsWith('-');
  const sign = credit? '+' : '-';

  const style = {
    color: isNegative ? '#ef476f' : '#2a9d8f',
    fontWeight: 'bold',
  };

  return <span style={style}>{sign} {strValue}{` ${currencyCode}`}</span>;
};

const BalanceCell = ({ data }) => {
  const {balance, currencyCode} = data;
  if (balance === null || balance === undefined) return null;

  const style = {
    color: '#2a9d8f',
    fontWeight: 'bold',
  };

  return <span style={style}>{balance}{` ${currencyCode}`}</span>;
};


// Main component
const TransactionTable = ({ userId = null, pageSize = 9999 }) => {
  const [page, setPage] = useState(0);  
  const url = userId ? API_ROUTES.TRANSACTIONS.BY_USER(userId) : API_ROUTES.TRANSACTIONS.BASE;
  const { data, totalPages, loading, error } = usePaginatedFetch(url, page, pageSize);

  const colDefs = [
    { field: "createdAt", headerName: 'DATE', width: 150, cellRenderer: DateCell },
    ...(!userId ? [{ field: "user", headerName: 'USER', width: 100, cellRenderer: UserCell }] : []),
    { field: "txnRefId", headerName: 'TXN_ID', width: 220 },
    {
      field: "txnType",
      headerName: 'TYPE',
      width: 150,
      cellRenderer: (params) => (
        <Badge value={params.value} style={{ background: '#5e3fc9' }} />
      ),
    },
    { field: "gateway", width: 150 },
    { field: "amount", headerName: 'AMOUNT', width: 120, cellRenderer: AmountCell },
    { field: "balance", headerName: 'BALANCE', width: 120, cellRenderer: BalanceCell },
    { field: "status", width: 120, cellRenderer: Badge },
  ];

  const defaultColDef = {
    minWidth: 80,
    resizable: true,
  };

  const onPaginationChanged = useCallback((params) => {
    const newPage = params.api.paginationGetCurrentPage();
    setPage(newPage);
  }, []);

  return (
    <div style={{ height: 500, width: '100%' }} className="ag-theme-alpine">
      <AgGridReact
        theme={"legacy"}
        rowData={data}
        loading={loading}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        onPaginationChanged={onPaginationChanged}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        rowHeight={40}
      />
    </div>
  );
};

export default TransactionTable;
