import { useState, useCallback } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { LuEye } from 'react-icons/lu';

import kycDoc from '../../assets/images/kyc_doc.jpg';
import PageTitle from '../../components/page_title/PageTitle';
import Badge from '../../components/Badge';

import KycDetailsPanel from './KycDetailsPanel';

import { usePaginatedFetch } from '../../api/usePaginatedFetch';
import { API_ROUTES } from '../../routes';
import RightPanel from '../../components/panel/RightPanel';


const KycList = ({ status = "" }) => {
  const [page, setPage] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedKyc, setSelectedKyc] = useState(null);
  const { data, totalPages, loading, error } = usePaginatedFetch(API_ROUTES.KYC_LIST, page, 9999, {status: status});

  const ActionLink = ({data}) => {
    return (
      <button className='round-icon-btn primary-btn' type='button' onClick={() => handleKycDetailsClisk(data)}>
        <LuEye />
      </button>
    );
  };

  const handleKycDetailsClisk = (kycData) => {
    console.log("KYC_DATA: ", kycData);
    setSelectedKyc(kycData);
    setIsPanelOpen(true);
  }

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const [colDefs, setColumnDefs] = useState([
    { field: "createdAt", headerName: "Date" },
    { field: "fullname", filter: true, filterParams: {} },
    { field: "documentType", headerName: "Type" },
    { field: "status", cellRenderer: Badge },
    { field: "action", cellRenderer: ActionLink, headerName: "Action" },
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
      <PageTitle title="All KYC" />

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
                      onPaginationChanged={onPaginationChanged}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        {selectedKyc && <KycDetailsPanel kycId={selectedKyc.kycId}/> }
      </RightPanel>

    </div>
  )
}

export default KycList;