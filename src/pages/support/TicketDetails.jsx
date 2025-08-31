import React from 'react';
import PageTitle from '../../components/page_title/PageTitle';

const TicketDetails = ({ name }) => {
    return (
        <div className="main-content">
            <PageTitle title="Ticket Details" />

            <div className="container-fluid">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="site-card overflow-hidden">
                            <div class="site-card-header">
                                <h3 class="title"> deposit issue - SUPT587998

                                    <span class="site-badge pending">Open</span>
                                </h3>
                                <div class="card-header-links">
                                    <a href="https://81habibi.com/admin/support-ticket/close-now/SUPT587998" class="card-header-link rounded-pill">Close it</a>
                                </div>
                            </div>
                            <div class="site-card-body">
                                <div class="support-ticket-single-message user">
                                    <div class="logo">
                                        <span class="avatar-text">M A</span>
                                    </div>
                                    <div class="message-body">
                                        hdgujfyeurykg
                                    </div>
                                    <div class="message-footer">
                                        <div class="name">Mustafa ansari</div>
                                        <div class="email"><a href="mailto:">Test@gmail.com</a></div>
                                    </div>
                                    <div class="message-attachments">
                                        <div class="title">Attachments</div>
                                        <div class="single-attachment">

                                            <div class="attach">
                                                <a href="https://81habibi.com/assets/global/images/b8cMsSNLmTxzzwKKBEG1.jpg" target="_blank"><i class="anticon anticon-picture"></i>b8cMsSNLmTxzzwKKBEG1.jpg
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="support-ticket-single-message  admin ">
                                    <div class="logo">
                                        <img class="avatar avatar-round" src="https://81habibi.com/assets/global/images/EUoylC7k0QRdvMIpRMnd.jpg" alt="" height="40" width="40" />
                                    </div>
                                    <div class="message-body">
                                        <div class="article">
                                            Solved
                                        </div>
                                    </div>
                                    <div class="message-footer">
                                        <div class="name">Supar Admin</div>
                                    </div>
                                    <div class="message-attachments">
                                        <div class="title">Attachments</div>
                                        <div class="single-attachment">
                                            <div class="attach">
                                                <a href="https://81habibi.com/assets/global/images/0qtR4RYVH9i0F03KQP7y.png" target="_blank"><i class="anticon anticon-picture"></i>0qtR4RYVH9i0F03KQP7y.png
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="site-card">

                            <div class="site-card-body">
                                <div class="progress-steps-form">
                                    <form action="https://81habibi.com/admin/support-ticket/reply" method="post" enctype="multipart/form-data">
                                        <input type="hidden" name="_token" value="RtOih6ujzDcML9cSdZ1x5oykyYyUfNL7EXkZgrod" />
                                        <input type="hidden" name="uuid" value="SUPT587998" />
                                        <div class="row mb-3">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                <div class="wrap-custom-file">
                                                    <input type="file" name="attach" id="attach" accept=".gif, .jpg, .png" />
                                                    <label for="attach">
                                                        <img class="upload-icon" src="https://81habibi.com/assets/admin-assets/images/avatar/upload.svg" alt="" />
                                                        <span>Attach Image</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-md-12">
                                                <div class="site-input-groups">
                                                    <textarea class="form-textarea" placeholder="Write Replay" name="message"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="buttons">
                                            <button type="submit" class="site-btn blue-btn">
                                                Submit<i class="anticon anticon-double-right"></i>
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetails;
