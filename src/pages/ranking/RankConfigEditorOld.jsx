import React, { useEffect, useState } from 'react';
// import './RankConfigEditor.css';
import PageTitle from '../../components/page_title/PageTitle';
import { LuPlus, LuSettings } from 'react-icons/lu';
import RankConfigTabularView from './RankConfigTabularView';


export default function RankConfigEditor() {
  const ActionLinkAddNew = (props) => {
    return (
      <a href="/admin/rankings/create"
        className="title-btn">
        <LuPlus />
        <span> ADD NEW</span>
      </a>
    );
  };

  return (
    <div className="main-content">
      <PageTitle title="Rank Config Editor" actionLink={<ActionLinkAddNew />} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body table-responsive">

                <RankConfigTabularView />

                {/* <TeamConfigTabularView /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}
