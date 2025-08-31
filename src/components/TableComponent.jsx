import React from 'react';

const TableComponent = ({ columns = [], data = [] }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="site-card">
            <div className="site-card-body table-responsive">
              <div className="site-datatable">
                <table id="dataTable" className="display data-table">
                  <thead>
                    <tr>
                      {columns.map((col, index) => (
                        <th key={index}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={columns.length} className="text-center">
                          No data available
                        </td>
                      </tr>
                    ) : (
                      data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {columns.map((col, colIndex) => (
                            <td key={colIndex}>{row[col.toLowerCase()]}</td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
