import React from 'react';
import PageTitle from '../../components/page_title/PageTitle';

const PluginSetting = ({ name }) => {
  return (
    <div className="main-content">
      <PageTitle title="Plugin Settings" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">

              <div class="site-card-header">
                <h3 class="title">Third Party System Plugins</h3>
              </div>

              <div class="site-card-body">
                <p class="paragraph">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="info" icon-name="info" class="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>You can
                  <strong>Enable or Disable</strong> any of the plugin
                </p>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/plugin/tawk.png" alt=""/>
                    </div>
                    <div class="gateway-title">
                      <h4>Tawk Chat</h4>
                      <p>Free Instant Messaging system

                      </p>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status">
                      <div class="site-badge pending">Deactivated</div>
                    </div>
                    <div class="gateway-edit">
                      <a type="button" class="editPlugin" data-id="1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings-2" icon-name="settings-2" class="lucide lucide-settings-2"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg></a>
                    </div>
                  </div>
                </div>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/plugin/reCaptcha.png" alt=""/>
                    </div>
                    <div class="gateway-title">
                      <h4>Google reCaptcha</h4>
                      <p>reCAPTCHA protects your website from fraud and abuse without creating friction



                      </p>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status">
                      <div class="site-badge pending">Deactivated</div>
                    </div>
                    <div class="gateway-edit">
                      <a type="button" class="editPlugin" data-id="2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings-2" icon-name="settings-2" class="lucide lucide-settings-2"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg></a>
                    </div>
                  </div>
                </div>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/plugin/analytics.png" alt=""/>
                    </div>
                    <div class="gateway-title">
                      <h4>Google Analytics</h4>
                      <p>Analytics will help you to collect data for your website



                      </p>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status">
                      <div class="site-badge pending">Deactivated</div>
                    </div>
                    <div class="gateway-edit">
                      <a type="button" class="editPlugin" data-id="3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings-2" icon-name="settings-2" class="lucide lucide-settings-2"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg></a>
                    </div>
                  </div>
                </div>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/plugin/fb.png" alt=""/>
                    </div>
                    <div class="gateway-title">
                      <h4>Facebook Messenger</h4>
                      <p>Messenger is a proprietary instant messaging app and platform developed by Meta


                      </p>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status">
                      <div class="site-badge pending">Deactivated</div>
                    </div>
                    <div class="gateway-edit">
                      <a type="button" class="editPlugin" data-id="4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings-2" icon-name="settings-2" class="lucide lucide-settings-2"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg></a>
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

export default PluginSetting;
