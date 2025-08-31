import React from 'react';
import PageTitle from "../../components/page_title/PageTitle";
import TransactionTable from '../../components/TransactionTable';

const Transactions = () => {
  return (
    <div className="main-content">
      <PageTitle title="All Transactions" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body table-responsive">
                <TransactionTable pageSize={9999} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
