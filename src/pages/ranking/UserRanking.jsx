import { useEffect, useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { LuAnchor, LuCast, LuPencilLine, LuPlus, LuSettings, LuUser } from 'react-icons/lu';

import PageTitle from '../../components/page_title/PageTitle';
import Badge from '../../components/Badge';
import RightPanel from '../../components/panel/RightPanel';
import RankConfigEditor from './RankConfigEditor';

import rank0 from '../../assets/icons/rank0.png';
import rank1 from '../../assets/icons/rank1.svg';
import rank2 from '../../assets/icons/rank2.svg';
import rank3 from '../../assets/icons/rank3.svg';
import rank4 from '../../assets/icons/rank4.svg';
import rank5 from '../../assets/icons/rank5.jpg';

import { usePaginatedFetch } from '../../api/usePaginatedFetch';
import { API_ROUTES } from '../../constants/apiRoutes';
import moment from 'moment';
import { CURRENCY_SYMBOL } from '../../constants/config';
import TeamIncomeConfigTable from '../income/TeamIncomeConfigTable';
import InvestmentSchemaSummary from '../schema/InvestmentSchemaSummary';
import apiClient from '../../api/apiClient';


// const fallbackIcons = {
//   1: "https://cdn-icons-png.flaticon.com/512/8037/8037137.png",
//   2: "https://81habibi.com/assets/global/images/sCQgIyl0OKzFiO73nmWF.svg",
//   3: "https://81habibi.com/assets/global/images/TQDUvbD48kmhmV9qifzh.svg",
//   4: "https://81habibi.com/assets/global/images/hGHllGGCIYfpx5Z2VKrW.svg",
//   5: "https://81habibi.com/assets/global/images/SaNfYL7WD2pzAAME8Sqb.svg",
//   6: rank5,
// };

const fallbackIcons = {
  1: rank0,
  2: rank1,
  3: rank2,
  4: rank3,
  5: rank4,
  6: rank5,
};

const sidePanelButtons = [
    { id: "team_rebate_config", label: "Team Rebate Config",  disabled: true, icon: <LuAnchor /> },
    { id: "rank_config_editor", label: "Rank Config Editor",  disabled: true, icon: <LuCast /> },
];

const UserRanking = (props) => {
  const [page, setPage] = useState(0);
    //const { data, loading } = useFetchJson(`/api/v2/rankings`);
    // const { data, totalPages, loading, error } = usePaginatedFetch(API_ROUTES.RANK_CONFIGS, page, 9999, {status: "ACTIVE"});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [panel, setPanel] = useState(null);
    const [selectedData, setSelectedData] = useState({});

    useEffect(() => {
        fetchRanks();
    }, []);


    const fetchRanks = async () => {
        const data = await apiClient.get(API_ROUTES.RANK_CONFIGS);
        setData(data);
        setLoading(false);
    }


      const ActionLinkAddNew = (props) => {
        return (
            <>
                <button className="title-btn" onClick={() => setIsPanelOpen(true)}>
                    <LuSettings />
                    <span> Rank Config</span>
                </button>

                <a href="/admin/rankings/create"
                    className="title-btn">
                    <LuPlus />
                    <span> ADD NEW</span>
                </a>
            </>
        );
      };

      const RankCodeCell = ({data}) => {
        const {code} = data;
           return <a 
            href='#' 
            onClick={() => {
                setSelectedData(data);
                setPanel("investment_summary"); 
                setIsPanelOpen(true);
            }}
            >
            {code}
           </a>
      }

    const ActionLink = (props) => {
        return (
            <NavLink to={`/admin/rankings/edit/${props.data.id}`} className="round-icon-btn purple">
                <LuPencilLine />
            </NavLink>
        );
    };

    const RankIconCell = (props) => {
        const { id, imageUrl } = props.data;
        const rankIcon = imageUrl || fallbackIcons[id] || '';

        return (
            <img src={rankIcon} style={{ width: '40px', height: '40px' }} alt="" />
        );
    };

    const ReservationRangeCell = ({data}) => {
        const {minInvestmentAmount, maxInvestmentAmount, } = data;
        return <>{`${minInvestmentAmount} - ${maxInvestmentAmount} ${CURRENCY_SYMBOL}`}</>
    }

    const [colDefs] = useState([
        { field: "code", headerName: 'Rank', width: 90, cellRenderer: RankCodeCell},
        { field: "rankIcon", width: 60, headerName: "Icon", cellRenderer: RankIconCell },
        { field: "displayName", headerName: 'Ranking Name', width: 160, filter: true, filterParams: {} },
        { field: "minDepositAmount", headerName: 'MinDeposit', width: 110, valueFormatter: (params) => `${params.value}$` },
        { field: "", headerName: 'ReservationRange', width: 150, cellRenderer: ReservationRangeCell },
        { field: "", headerName: 'Profit/Day', width: 100 },
        { field: "txnPerDay", headerName: 'Txn/Day', width: 100 },
        { field: "minTotalEarnings", headerName: "MinEarning", width: 110,  },
        { field: "rankBonus", headerName: 'BONUS', width: 100},
        { field: "active", headerName: 'STATUS', cellRenderer: Badge },
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
            {/* <PageTitle title="User Rankings"  actionLink={<ActionLinkAddNew />} />  */}

            <div className="page-title">                
                <div className='site-card-header d-flex justify-content-between align-items-center'>
                    <h4 className="title mb-0">User Rankings</h4>
                    <div>
                        {/* <button 
                            className="btn btn-outline-primary btn-sm me-2"
                        >Investment Schema</button>
                        <button 
                            className="btn btn-outline-primary btn-sm me-2"
                        >Team Rebate Configs</button>
                        <button 
                            className="btn btn-outline-secondary btn-sm me-2"
                            onClick={() => setIsPanelOpen(true)}                            
                            >Rank Config Editor</button>
                         */}

                        {sidePanelButtons.map((panel) => (
                            <a href="#" className="btn btn-outline-primary btn-sm me-2" key={panel.id}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPanel(panel.id)
                                    setIsPanelOpen(true);
                                }}
                            >
                                {panel.icon} <span className="ms-2">{panel.label}</span>
                            </a>
                        ))}
                        
                        <a href="/admin/rankings/create" className="btn btn-outline-primary btn-sm me-2">
                            <LuPlus />
                            <span> ADD NEW</span>
                        </a>
                        
                        

                    </div>
                </div>
            </div>




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
                                            paginationPageSizeSelector={[10, 20, 50, 100]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {panel === 'investment_summary' &&
                 <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
                    <InvestmentSchemaSummary rankCode={selectedData?.code} />
                </RightPanel>
            }

            {panel === 'team_rebate_config' &&
                 <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} style={{width: '800px'}}>
                    <TeamIncomeConfigTable/>
                </RightPanel>
            }

            {panel === 'rank_config_editor' &&
                 <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} style={{width: '1200px'}}>
                    <RankConfigEditor/>
                </RightPanel>
            }
        </div>
    );
};

export default UserRanking;