import React from 'react';

const TicketsTab = ({ activeTab }) => {
  const isActive = activeTab === "tickets";

  return (
    <div 
    className={`tab-pane fade ${isActive ? "show active" : ""}`}
    id="pills-ticket" 
    role="tabpanel"
      aria-labelledby="pills-ticket-tab">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="site-card">
            <div className="site-card-header">
              <h4 className="title">Support Tickets</h4>
            </div>
            <div className="site-card-body table-responsive">
              <div className="site-datatable">
                <table id="user-ticket-dataTable" className="display data-table">
                  <thead>
                    <tr>
                      <th>Ticket Name</th>
                      <th>Opening Date</th>
                      <th>Status</th>
                      <th>Action</th>
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

export default TicketsTab;