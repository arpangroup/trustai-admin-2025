import React from 'react';
import PageTitle from '../../components/page_title/PageTitle';

const NotificationTuneSetting = ({ name }) => {
  return (
    <div className="main-content">
      <PageTitle title="Notification Tune" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div class="site-card-header d-flex">
                <h3 class="title">Notification Tune Settings</h3>
                <div class="card-header-links">
                  <a href="#" class="card-header-link new-referral" type="button" data-type="investment">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="corner-down-left" icon-name="corner-down-left" class="lucide lucide-corner-down-left"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>Back</a>
                </div>
              </div>

              <div class="site-card-body">
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/tune-icon/bewitched.png" alt="" />
                    </div>
                    <div class="gateway-title">
                      <h4>Bewitched</h4>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status m-0 me-2">
                      <button type="button" value="1" data-tune-preview="https://trustai.co.in/assets/global/tune/bewitched.mp3" class="site-btn-xs primary-btn audioPlay">
                        <span class="play-1 play"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="play" class="lucide lucide-play play" icon-name="play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></span>
                        <span class="stop-1 hidden stop"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="pause" icon-name="pause" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg></span>
                        <span class="tune-status-1 status-text">Play</span>
                      </button>
                    </div>
                    <div class="gateway-status m-0">
                      <a href="#" class="site-btn-xs green-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="check" icon-name="check" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"></polyline></svg>Active in</a>
                    </div>

                  </div>
                </div>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/tune-icon/crunchy.png" alt="" />
                    </div>
                    <div class="gateway-title">
                      <h4>Crunchy</h4>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status m-0 me-2">
                      <button type="button" value="2" data-tune-preview="https://trustai.co.in/assets/global/tune/crunchy.mp3" class="site-btn-xs primary-btn audioPlay">
                        <span class="play-2 play"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="play" class="lucide lucide-play play" icon-name="play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></span>
                        <span class="stop-2 hidden stop"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="pause" icon-name="pause" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg></span>
                        <span class="tune-status-2 status-text">Play</span>
                      </button>
                    </div>
                    <div class="gateway-status m-0">
                      <a href="" class="site-btn-xs red-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" icon-name="x" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>Inactive</a>
                    </div>

                  </div>
                </div>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/tune-icon/expert_notification.png" alt="" />
                    </div>
                    <div class="gateway-title">
                      <h4>Expert Notification</h4>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status m-0 me-2">
                      <button type="button" value="3" data-tune-preview="https://trustai.co.in/assets/global/tune/expert_notification.mp3" class="site-btn-xs primary-btn audioPlay">
                        <span class="play-3 play"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="play" class="lucide lucide-play play" icon-name="play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></span>
                        <span class="stop-3 hidden stop"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="pause" icon-name="pause" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg></span>
                        <span class="tune-status-3 status-text">Play</span>
                      </button>
                    </div>
                    <div class="gateway-status m-0">
                      <a href="#" class="site-btn-xs red-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" icon-name="x" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>Inactive</a>
                    </div>

                  </div>
                </div>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/tune-icon/knock_knock.png" alt="" />
                    </div>
                    <div class="gateway-title">
                      <h4>knock knock</h4>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status m-0 me-2">
                      <button type="button" value="4" data-tune-preview="https://trustai.co.in/assets/global/tune/knock_knock.mp3" class="site-btn-xs primary-btn audioPlay">
                        <span class="play-4 play"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="play" class="lucide lucide-play play" icon-name="play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></span>
                        <span class="stop-4 hidden stop"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="pause" icon-name="pause" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg></span>
                        <span class="tune-status-4 status-text">Play</span>
                      </button>
                    </div>
                    <div class="gateway-status m-0">
                      <a href="#" class="site-btn-xs red-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" icon-name="x" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>Inactive</a>
                    </div>

                  </div>
                </div>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/tune-icon/silencer.png" alt="" />
                    </div>
                    <div class="gateway-title">
                      <h4>Silencer</h4>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status m-0 me-2">
                      <button type="button" value="5" data-tune-preview="https://trustai.co.in/assets/global/tune/silencer.mp3" class="site-btn-xs primary-btn audioPlay">
                        <span class="play-5 play"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="play" class="lucide lucide-play play" icon-name="play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></span>
                        <span class="stop-5 hidden stop"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="pause" icon-name="pause" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg></span>
                        <span class="tune-status-5 status-text">Play</span>
                      </button>
                    </div>
                    <div class="gateway-status m-0">
                      <a href="#" class="site-btn-xs red-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" icon-name="x" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>Inactive</a>
                    </div>

                  </div>
                </div>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/tune-icon/sticky.png" alt="" />
                    </div>
                    <div class="gateway-title">
                      <h4>Sticky</h4>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status m-0 me-2">
                      <button type="button" value="6" data-tune-preview="https://trustai.co.in/assets/global/tune/sticky.mp3" class="site-btn-xs primary-btn audioPlay">
                        <span class="play-6 play"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="play" class="lucide lucide-play play" icon-name="play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></span>
                        <span class="stop-6 hidden stop"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="pause" icon-name="pause" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg></span>
                        <span class="tune-status-6 status-text">Play</span>
                      </button>
                    </div>
                    <div class="gateway-status m-0">
                      <a href="#" class="site-btn-xs red-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" icon-name="x" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>Inactive</a>
                    </div>

                  </div>
                </div>
                <div class="single-gateway">
                  <div class="gateway-name">
                    <div class="gateway-icon">
                      <img src="https://trustai.co.in/assets/global/tune-icon/vopvoopvooop.png" alt="" />
                    </div>
                    <div class="gateway-title">
                      <h4>Vopvoopvooop</h4>
                    </div>
                  </div>
                  <div class="gateway-right">
                    <div class="gateway-status m-0 me-2">
                      <button type="button" value="7" data-tune-preview="https://trustai.co.in/assets/global/tune/vopvoopvooop.mp3" class="site-btn-xs primary-btn audioPlay">
                        <span class="play-7 play"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="play" class="lucide lucide-play play" icon-name="play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></span>
                        <span class="stop-7 hidden stop"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="pause" icon-name="pause" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg></span>
                        <span class="tune-status-7 status-text">Play</span>
                      </button>
                    </div>
                    <div class="gateway-status m-0">
                      <a href="#" class="site-btn-xs red-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" icon-name="x" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>Inactive</a>
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

export default NotificationTuneSetting;