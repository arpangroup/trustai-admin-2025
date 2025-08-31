import React, { useCallback, useMemo, useState } from "react";
import { LuPencilLine, LuMail, LuTrash } from "react-icons/lu";
import './Users.css';

import { AgGridReact } from "ag-grid-react";

import PageTitle from "../../components/page_title/PageTitle";
import { NavLink, useParams } from "react-router-dom";
import SendEmailPanel from "./SendEmailPanel";
import Badge from "../../components/Badge";
import RightPanel from "../../components/panel/RightPanel";
import { API_ROUTES } from "../../constants/apiRoutes";
import { usePaginatedFetch } from "../../api/usePaginatedFetch";
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';

// ModuleRegistry.registerModules([AllCommunityModule]);

const Users = ({status = ""}) => {
  const [page, setPage] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");  
  const { data, totalPages, loading, error } = usePaginatedFetch(API_ROUTES.USERS, page, 9999, {status: status});
  const [searchText, setSearchText] = useState('');

  const ActionLink = (props) => {
    return (
      <>
        <NavLink to={`/admin/users/${props.data.id}/edit`} className="round-icon-btn purple">
          <LuPencilLine />
        </NavLink>

        <button className="round-icon-btn red" type='button' onClick={() => handleSendEmailClisk(props.data)} >
          <LuMail />
        </button>
      </>
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'accountId', headerName: 'Account ID', width: 130 },
    { field: 'username', headerName: 'Username', width: 130 },
  ];

  const rows = [
    { id: 1, accountId: 'Snow', username: 'Jon' },
    { id: 2, accountId: 'Lannister', username: 'Cersei' },
    { id: 3, accountId: 'Stark', username: 'Arya' },
    { id: 4, accountId: 'Targaryen', username: 'Daenerys' },
    { id: 5, accountId: 'Melisandre', username: null },
    { id: 6, accountId: 'Clifford', username: 'Ferrara' },
    { id: 7, accountId: 'Frances', username: 'Rossini' },
    { id: 8, accountId: 'Roxie', username: 'Harvey' },
  ];



  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const handleSendEmailClisk = (user) => {
    console.log("USER: ", user);  
    setSelectedUser(user);    
    setIsPanelOpen(true);
  }



  const Avatar = (props) => {
    const rowIndex = props.node?.rowIndex ?? 0;
    const colorIndex = rowIndex % 10;
    const fullName = props.data?.firstname ?? props.data.username;
    const nameParts = fullName.trim().split(' ');
    const initials = nameParts
      .slice(0, 2) // only take the first 2 words
      .map(part => part.charAt(0).toUpperCase())
      .join('');

    return (
      <span className={`avatar-text color-${colorIndex}`}>
        {initials || '?'}
      </span>
    );
  };

  const [colDefs, setColumnDefs] = useState([
      { field: "avatar", cellRenderer: Avatar, width: 80, resizable: false, sortable: false, filter: false, suppressSizeToFit: true},
      { field: "username", width: 200, filter: true},
      { field: "email", width: 160},
      { field: "walletBalance", headerName: "Balance", width: 90},
      { field: "profitBalance", headerName: "Profit", width: 90},
      { field: "kycStatus", cellRenderer: Badge, headerName: "Kyc", width: 140},
      { field: "accountStatus", cellRenderer: Badge, headerName: "Status", width: 140},
      { field: "Action", cellRenderer: ActionLink, width: 120}
    ]);

    // const defaultColDef = useMemo(() => {
    //   return {
    //     flex: 1,
    //     minWidth: 100,
    //   };
    // }, []);

  const defaultColDef = {
    // flex: 1,    
    minWidth: 80,
    resizable: true,
  };

  const onPaginationChanged = useCallback((params) => {
    const newPage = params.api.paginationGetCurrentPage();
    setPage(newPage);
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  return (
    <div className="main-content">
      <PageTitle title={`${status || 'All '} Customers`} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body table-responsive">
                <div className="site-datatable">
                  <div style={{ height: 400 }} className="ag-theme-alpine">
                     <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    <DataGrid rows={filteredRows} columns={columns} pageSize={5} rowsPerPageOptions={[3]} />
                    {/* <AgGridReact
                      theme={"legacy"}
                      rowData={data}
                      loading={loading}
                      columnDefs={colDefs}
                      defaultColDef={defaultColDef}
                      pagination={true}                      
                      paginationPageSize={10}
                      paginationPageSizeSelector={[10, 20, 50, 100]}
                      onPaginationChanged={onPaginationChanged} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <h2>{`Send Mail to ${selectedUser.username}`}</h2>
        <SendEmailPanel username={selectedUser.username} email={selectedUser.email}/>
      </RightPanel>


    </div>
  );
};

export default Users;
