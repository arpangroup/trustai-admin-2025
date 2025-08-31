import React from 'react';
import PageTitle from "../../components/page_title/PageTitle";
import InvestmentTable from './InvestmentTable';

const Investments = () => {
  return (
    <div className="main-content">
      <PageTitle title="All Investments" />
      
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body table-responsive">
                <InvestmentTable pageSize={9999} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;
