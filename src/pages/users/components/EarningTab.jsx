import React from 'react';

const EarningTab = ({ activeTab }) => {
  const isActive = activeTab === "earnings";

  return (
    <div 
    className={`tab-pane fade ${isActive ? "show active" : ""}`}
    id="pills-deposit" role="tabpanel"
      aria-labelledby="pills-deposit-tab">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="site-card">
            <div className="site-card-header">
              <h4 className="title">Earnings</h4>
              <div className="card-header-info">Total Earnings 8 USD</div>
            </div>
            <div className="site-card-body table-responsive">
              <div className="site-datatable">
                <table id="user-profit-dataTable" className="display data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th>Profit From</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>

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

export default EarningTab;