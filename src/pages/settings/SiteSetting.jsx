import React from 'react';
import PageTitle from '../../components/page_title/PageTitle';
import BannerManager from './banner/BannerManager';
import SliderManager from './slider/SliderManager';
import HtmlManager from './html/HtmlManager';

const SiteSetting = ({ name }) => {
  return (
    <div className="main-content">
      <PageTitle title="Site Settings" />

      <BannerManager/>
      <SliderManager/>
      <HtmlManager/>

    </div>
  );
};

export default SiteSetting;
