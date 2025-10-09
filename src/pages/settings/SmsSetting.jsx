import React from 'react';
import PageTitle from '../../components/page_title/PageTitle';

const SmsSetting = ({ name }) => {
  return (
    <div className="main-content">
      <PageTitle title="SMS Settings" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div class="site-card-header">
                <h3 class="title">All Plugins adds the ability to send SMS</h3>
              </div>


              <div class="site-card-body">
                <p class="paragraph">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="info" icon-name="info" class="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>You can
                  <strong>Enable or Disable</strong> any of the plugin
                </p>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/plugin/nexmo.png" alt="" />
                    </div>
                    <div class="gateway-title">
                      <h4>Nexmo</h4>
                      <p>Programmatically send and receive high volumes of SMS globally


                      </p>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status">
                      <div class="site-badge pending">Deactivated</div>
                    </div>
                    <div class="gateway-edit">
                      <a type="button" class="editPlugin" data-id="5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings-2" icon-name="settings-2" class="lucide lucide-settings-2"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg></a>
                    </div>
                  </div>
                </div>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/plugin/twilio.png" alt="" />
                    </div>
                    <div class="gateway-title">
                      <h4>Twilio</h4>
                      <p>Build agility into your customer engagement


                      </p>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status">
                      <div class="site-badge pending">Deactivated</div>
                    </div>
                    <div class="gateway-edit">
                      <a type="button" class="editPlugin" data-id="6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings-2" icon-name="settings-2" class="lucide lucide-settings-2"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg></a>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsSetting;
