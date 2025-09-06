import { useCallback, useState } from "react";

import { API_ROUTES, WEB_ROUTES } from "../../routes";
import { generatePath } from 'react-router-dom';

import { usePaginatedFetch } from "../../api/usePaginatedFetch";
import { NavLink } from "react-router-dom";
import { LuArrowBigRight } from "react-icons/lu";
import { formatDate } from "../../utils/dateUtils";
import Badge from "../../components/Badge";
import TimelineCell from "./TimelineCell";
import { AgGridReact } from "ag-grid-react";
import './Investments.css';
import RightPanel from "../../components/panel/RightPanel";
import InvestmentSummary from "./InvestmentSummary";



// Main component
const InvestmentTable = ({ userId = null, pageSize = 9999 }) => {
  const [page, setPage] = useState(0);
  const { data, totalPages, loading, error } = usePaginatedFetch(API_ROUTES.INVESTMENTS.BASE, page, pageSize);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});


  const UserCell = ({ data }) => {
    const { userId, user } = data;
    const url = generatePath(WEB_ROUTES.USERS.USER_EDIT.path, { userId });

    WEB_ROUTES
    return (
      <NavLink to={url}>
        {user}
      </NavLink>
    )
  }

  const SchemaCell = ({ data }) => {
    if (!data) return null;
    const { schemaName, investedAmount, subscribedAt, currencyCode = 'INR' } = data;    
    /*return (
      <div>
        <div style={{ fontWeight: 'bold' }}>{schemaName}</div>
        <div style={{ fontSize: '12px', color: '#555' }}>
          ₹{investedAmount?.toLocaleString()} • {subscribedAt}
        </div>
      </div>
    );*/

    return (
      <div className="schema-cell mt-2">
        <strong>
          {schemaName} <LuArrowBigRight  /> ₹{investedAmount}
        </strong>
        <div className="invested-date">{formatDate(subscribedAt)}</div>
      </div>
    )    
  }

  
  // const RoiCell = ({ data }) => {
  //   const roi = data?.roiValue ?? 0;
  //   // return <span>{roi}%</span>;
  //   return <span style={{ display: 'block', textAlign: 'center', fontWeight: 'bold' }}>{roi}%</span>;
  // };

  const RoiCell = ({ data }) => {
    const roi = data?.roiValue ?? 0;
    return (
      <div className="centered-cell">
        <b>{roi}%</b>
      </div>
    );
  };

  const ProfitCell = ({ data }) => {
    const received = data?.receivedReturn ?? 0;
    const perPeriod = data?.perPeriodProfit ?? 0;
    const currency = data?.currencyCode ?? 'INR';

    return (
      <span className="centered-cell">
        <strong>{received} x {perPeriod} = {(received * perPeriod).toFixed(2)} {currency}</strong>
      </span>
    );
  };

  const PeriodRemainingCell = ({ data }) => {
     return (
      <div className="centered-cell">
        {data.remainingPeriods} times
      </div>
    );
  }

  const CapitalBackCell = ({ data }) => {
    return (
      <div style={{paddingTop: '12px'}}>
        <Badge value={data.capitalBack} />
      </div>
    );
  }

  
  // const [rowData] = useState([
  //   { userId: 1, planId: 1, user: "John Doe", currency: "USDT", investmentAmount: "5000", roi: "2%", profit: "0 x 100 = 0 INR", capitalBack: "No", periodRemaining: "654 Times", createdAt: "Jun 08 2025 02:32", timeline: "" },
  //   { userId: 1, planId: 2, user: "Mustafa ansari", currency: "Crypto investment", investmentAmount: "5000", roi: "20%", profit: "0 x 100 = 0 INR", capitalBack: "Yes", periodRemaining: "654 Times", createdAt: "Jun 08 2025 02:32", timeline: "" },
  //   { userId: 1, planId: 2, user: "Mustafa ansari", currency: "Crypto investment", investmentAmount: "5000", roi: "20%", profit: "0 x 100 = 0 INR", capitalBack: "Yes", periodRemaining: "654 Times", createdAt: "Jun 08 2025 02:32", timeline: "Pending" },
  // ]);

  const [colDefs] = useState([
    ...(!userId ? [{ field: "user", headerName: "USER", width: 120, cellRenderer: UserCell }] : []),
    { field: "schemaName", headerName: "SCHEMA", width: 250, cellRenderer: SchemaCell },
    { field: "roiValue", headerName: "ROI", width: 80, cellRenderer: RoiCell},
    { field: "profit", headerName: "PROFIT", width: 150, cellRenderer: ProfitCell },
    { field: "capitalBack", headerName: "CAPITAL BACK", width: 130, cellRenderer: CapitalBackCell, },
    { field: "remainingPeriods", headerName: "REMAINING", width: 120, cellRenderer: PeriodRemainingCell},
    { field: "timeline", width: 180, cellRenderer: TimelineCell },
  ]);

  const defaultColDef = {
    minWidth: 80,
    resizable: true,
  };

  const onPaginationChanged = useCallback((params) => {
    const newPage = params.api.paginationGetCurrentPage();
    setPage(newPage);
  }, []);

  return (
    <>
      <div style={{ height: 500, width: '100%' }} className="ag-theme-alpine">      
          <AgGridReact
          theme={"legacy"}
          rowData={data}
          loading={loading}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          onPaginationChanged={onPaginationChanged}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          onRowDoubleClicked={(event) => {
            const rowData = event.data;
            setIsPanelOpen(true);
            setSelectedRow(rowData);
          }}
          rowHeight={70}
          />
          <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
            <h3>Investment Summary</h3>
            <InvestmentSummary data={selectedRow}/>
          </RightPanel>
      </div>
    </>
  );
};

export default InvestmentTable;
