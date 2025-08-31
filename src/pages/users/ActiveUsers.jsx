// import React, { useMemo, useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Add your preferred theme
// import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// import { themeBalham } from 'ag-grid-community';

// import PageTitle from "../../components/page_title/PageTitle";
// import { useFetchJson } from "../../hooks/useFetchJson";

// ModuleRegistry.registerModules([ AllCommunityModule]);


// const ActiveUsers = () => {
//   const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
//   const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  
//   const [columnDefs, setColumnDefs] = useState([
//     {
//       field: "athlete",
//       minWidth: 170,
//     },
//     { field: "age" },
//     { field: "country" },
//     { field: "date" },
//     { field: "total" },
//   ]);
//   const defaultColDef = useMemo(() => {
//     return {
//       flex: 1,
//       minWidth: 100,
//     };
//   }, []);

//   const { data, loading } = useFetchJson(
//     "https://www.ag-grid.com/example-assets/olympic-winners.json",
//   );


//   return (
//     <div className="main-content">
//       <PageTitle title="All Customers" />
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="site-card">
//               <div className="site-card-body table-responsive">
//                 <div className="site-datatable">
//                   <div style={{ height: 500 }} className="ag-theme-alpine">
//                     <AgGridReact
//                       theme={"legacy"}
//                       rowData={data}
//                       loading={loading}
//                       columnDefs={columnDefs}
//                       defaultColDef={defaultColDef}
//                       pagination={true}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActiveUsers;
