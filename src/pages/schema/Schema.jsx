import { LuPencilLine, LuPlus } from "react-icons/lu";

import { AgGridReact } from "ag-grid-react";
import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";

import PageTitle from "../../components/page_title/PageTitle";
import Badge from '../../components/Badge';
import { useFetchJson } from '../../api/useFetchJson';
import { API_ROUTES } from "../../routes";
import { usePaginatedFetch } from "../../api/usePaginatedFetch";

const Schema = (props) => {
    const [page, setPage] = useState(0);
    const { data, totalPages, loading, error } = usePaginatedFetch(API_ROUTES.SCHEMAS.BASE, page, 9999);
    
    const ActionLinkAddNew = (props) => {
        return (
            <a href="/schemas/create"
                className="title-btn">
                <LuPlus />
                <span> ADD NEW</span>
            </a>
        );
    };

    const StatusBadge = ({data}) => {
        console.log("PROPS_DATA: ", data);
        return (
            <Badge value={data.active ? 'Active' : 'Deactivated'}/>
        );
    };

    const AmountRangeCell = (props) => {
        const { investmentType, schemaType, minimumInvestmentAmount, maximumInvestmentAmount, stakePrice, currency } = props.data;
        const minAmount = investmentType === 'STAKE' ?  stakePrice : minimumInvestmentAmount;

        let amountRangeStr = `${minAmount} ${currency}`;
        if (schemaType == 'RANGE' && (maximumInvestmentAmount !== null && maximumInvestmentAmount !== 0)) {
            amountRangeStr += ` - ${maximumInvestmentAmount} ${currency}`;
        }

        return (
           <b>{amountRangeStr}</b>
        );
    };

    const ActionLink = (props) => {
        return (
            <NavLink to={`/schemas/edit/${props.data.id}`} className="round-icon-btn purple">
                <LuPencilLine />
            </NavLink>
        );
    };

     const IconCell = (props) => {
        const { id, imageUrl } = props.data;
        const rankIcon = imageUrl || '';

        return (
            <img src={rankIcon} style={{ width: '40px', height: '40px' }} alt="" />
        );
    };

    const [colDefs] = useState([
        { field: "icon", headerName: 'ICON', width: 80, cellRenderer: IconCell },
        { field: "name", headerName: 'PLAN NAME' },
        { field: "amountRange", headerName: 'AMOUNT', cellRenderer: AmountRangeCell, filter: true, filterParams: {} },
        { field: "schemaBadge", headerName: 'BADGE', width: 150, cellRenderer: Badge },
        { field: "status", headerName: 'STATUS', cellRenderer: StatusBadge },
        { field: "action", headerName: "Action", cellRenderer: ActionLink },
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
            <PageTitle title="All Schemas" actionLink={<ActionLinkAddNew />} />
        

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
                                            // onPaginationChanged={onPaginationChanged}
                                            // paginationPageSizeSelector={[10, 20, 50, 100]}                                             
                                            // rowModelType="infinite" // or "serverSide"
                                            // datasource={data}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schema;
