import React from 'react';
import Investments from '../../investment/Investments';
import InvestmentTable from '../../investment/InvestmentTable';

const InvestmentTab = ({ userId }) => {  
  return (
    <div       
      className="tab-pane fade show active"
      id="pills-transactions"
      role="tabpanel"
      aria-labelledby="pills-transactions-tab"
    >
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="site-card">
            <div className="site-card-header">
              <h4 className="title">Investments</h4>
            </div>
            <div className="site-card-body table-responsive">
              <InvestmentTable userId={userId} />
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default InvestmentTab;