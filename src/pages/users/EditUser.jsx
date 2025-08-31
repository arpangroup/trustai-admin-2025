import PageTitle from "../../components/page_title/PageTitle";

const EditUser = () => {
    return (
        <div className="main-content">

            <PageTitle title="ssss" isBack="true" actionLink=""/>


            <div className="container-fluid">
                
                <div className="row justify-content-center">
                    <div className="col-xxl-3 col-xl-6 col-lg-8 col-md-6 col-sm-12">
                        <div className="profile-card">
                            <div className="top">
                                <div className="avatar">
                                    <span className="avatar-text">MK</span>
                                </div>
                                <div className="title-des">
                                    <h4>Monuking1000k King</h4>
                                    <p>India</p>
                                </div>
                                <div className="btns">
                                        <span type="button" data-bs-toggle="modal" data-bs-target="#sendEmail"><a
                                                href="javascript:void(0);" className="site-btn-round blue-btn"
                                                data-bs-toggle="tooltip" title="" data-bs-original-title="Send Email"><i
                                                icon-name="mail"></i></a></span>
                                    <a href="/admin/user/login/19" target="_blank"
                                       className="site-btn-round red-btn" data-bs-toggle="tooltip" title=""
                                       data-bs-placement="top" data-bs-original-title="Login As User">
                                        <i icon-name="user-plus"></i>
                                    </a>
                                    <span data-bs-toggle="modal" data-bs-target="#addSubBal">
                                            <a href="javascript:void(0);" type="button"
                                               className="site-btn-round primary-btn" data-bs-toggle="tooltip" title=""
                                               data-bs-placement="top" data-bs-original-title="Fund Add or Subtract">
                                                <i icon-name="wallet"></i></a></span>
                                </div>
                            </div>
                            <div className="site-card">
                                <div className="site-card-body">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="admin-user-balance-card">
                                                <div className="wallet-name">
                                                    <div className="name">Main Wallet</div>
                                                    <div className="chip-icon">
                                                        <img className="chip"
                                                             src="/assets/backend/materials/chip.png"
                                                             alt="" />
                                                    </div>
                                                </div>
                                                <div className="wallet-info">
                                                    <div className="wallet-id">USD</div>
                                                    <div className="balance">₹0</div>
                                                </div>
                                            </div>
                                            <div className="admin-user-balance-card">
                                                <div className="wallet-name">
                                                    <div className="name">Profit Wallet</div>
                                                    <div className="chip-icon">
                                                        <img className="chip"
                                                             src="/assets/backend/materials/chip.png"
                                                             alt="" />
                                                    </div>
                                                </div>
                                                <div className="wallet-info">
                                                    <div className="wallet-id">USD</div>
                                                    <div className="balance">₹8</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* User Status Update */}
                            <div className="site-card mb-0">
                                <div className="site-card-header">
                                    <h3 className="title-small">Account Informations</h3>
                                </div>
                                <div className="site-card-body">
                                    <div className="row">
                                        <form action="/admin/user/status-update/19"
                                              method="post">
                                            <input type="hidden" name="_token"
                                                   value="tAlWAwzyEa2XNDEaOQGfJURs5sqf66BiknGdP3Yk"/>
                                            <div className="col-xl-12">
                                                <div className="profile-card-single">
                                                    <h5 className="heading">Account Status</h5>
                                                    <div className="switch-field">
                                                        <input type="radio" id="accSta1" name="status" value="1" />
                                                        <label for="accSta1">Active</label>
                                                        <input type="radio" id="accSta2" name="status" value="0"
                                                               checked />
                                                        <label for="accSta2">Disabled</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="profile-card-single">
                                                    <h5 className="heading">Email Verification</h5>
                                                    <div className="switch-field">
                                                        <input type="radio" id="emaSta1" name="email_verified"
                                                               value="1" />
                                                        <label for="emaSta1">Verified</label>
                                                        <input type="radio" id="emaSta2" name="email_verified"
                                                               value="0" checked />
                                                        <label for="emaSta2">Unverified</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="profile-card-single">
                                                    <h5 className="heading">KYC Verification</h5>
                                                    <div className="switch-field">
                                                        <input type="radio" id="kyc1" name="kyc" value="1" />
                                                        <label for="kyc1">Verified</label>
                                                        <input type="radio" id="kyc2" name="kyc" value="0"
                                                               checked />
                                                        <label for="kyc2">Unverified</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="profile-card-single">
                                                    <h5 className="heading">2FA Verification</h5>
                                                    <div className="switch-field">
                                                        <input type="radio" id="2fa1" name="two_fa" value="1" />
                                                        <label for="2fa1">Active</label>
                                                        <input type="radio" id="2fa2" name="two_fa" value="0"
                                                               checked />
                                                        <label for="2fa2">Disabled</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="profile-card-single">
                                                    <h5 className="heading">Deposit Status</h5>
                                                    <div className="switch-field">
                                                        <input type="radio" id="depo1" name="deposit_status"
                                                               value="1" checked />
                                                        <label for="depo1">Active</label>
                                                        <input type="radio" id="depo2" name="deposit_status"
                                                               value="0" />
                                                        <label for="depo2">Disabled</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="profile-card-single">
                                                    <h5 className="heading">Withdraw Status</h5>
                                                    <div className="switch-field">
                                                        <input type="radio" id="wid1" name="withdraw_status"
                                                               value="1" checked />
                                                        <label for="wid1">Active</label>
                                                        <input type="radio" id="wid2" name="withdraw_status"
                                                               value="0" />
                                                        <label for="wid2">Disabled</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="profile-card-single">
                                                    <h5 className="heading">Send Money Status</h5>
                                                    <div className="switch-field">
                                                        <input type="radio" id="trans1" name="transfer_status"
                                                               value="1" checked />
                                                        <label for="trans1">Active</label>
                                                        <input type="radio" id="trans2" name="transfer_status"
                                                               value="0" />
                                                        <label for="trans2">Disabled</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button type="submit"
                                                        className="site-btn-sm primary-btn w-100 centered">
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                            {/* User Status Update End */}

                        </div>
                    </div>


                    <div className="col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="site-tab-bars">
                            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a href="" className="nav-link active" id="pills-informations-tab"
                                       data-bs-toggle="pill" data-bs-target="#pills-informations" type="button"
                                       role="tab" aria-controls="pills-informations" aria-selected="true"><i
                                            icon-name="user"></i>Informations</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a href="" className="nav-link" id="pills-transfer-tab" data-bs-toggle="pill"
                                       data-bs-target="#pills-transfer" type="button" role="tab"
                                       aria-controls="pills-transfer" aria-selected="true"><i
                                            icon-name="anchor"></i>Investments</a>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <a href="" className="nav-link" id="pills-deposit-tab" data-bs-toggle="pill"
                                       data-bs-target="#pills-deposit" type="button" role="tab"
                                       aria-controls="pills-deposit" aria-selected="true"><i
                                            icon-name="credit-card"></i>Earnings</a>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <a href="" className="nav-link" id="pills-transactions-tab" data-bs-toggle="pill"
                                       data-bs-target="#pills-transactions" type="button" role="tab"
                                       aria-controls="pills-transactions" aria-selected="true"><i
                                            icon-name="cast"></i>Transactions</a>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <a href="" className="nav-link" id="pills-ticket-tab" data-bs-toggle="pill"
                                       data-bs-target="#pills-tree" type="button" role="tab"
                                       aria-controls="pills-transfer" aria-selected="true"><i
                                            icon-name="network"></i>Referral Tree</a>
                                </li>


                                <li className="nav-item" role="presentation">
                                    <a href="" className="nav-link" id="pills-ticket-tab" data-bs-toggle="pill"
                                       data-bs-target="#pills-ticket" type="button" role="tab"
                                       aria-controls="pills-transfer" aria-selected="true"><i
                                            icon-name="wrench"></i>Ticket</a>
                                </li>
                            </ul>
                        </div>

                        <div className="tab-content" id="pills-tabContent">
                            {/* basic Info */}
                            <div className="tab-pane fade show active" id="pills-informations" role="tabpanel"
                                 aria-labelledby="pills-informations-tab">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="site-card">
                                            <div className="site-card-header">
                                                <h3 className="title">Basic Info</h3>
                                            </div>
                                            <div className="site-card-body">
                                                <form action="/admin/user/19" method="post">
                                                    <input type="hidden" name="_method" value="PUT"/> 
                                                    <input
                                                        type="hidden" name="_token"
                                                        value=""/>
                                                    <div className="row">

                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for="" className="box-input-label">First
                                                                    Name:</label>
                                                                <input type="text" className="box-input"
                                                                       value="Monuking1000k" name="first_name"
                                                                       required=""/>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for="" className="box-input-label">Last
                                                                    Name:</label>
                                                                <input type="text" className="box-input" value="King"
                                                                       required="" name="last_name"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for=""
                                                                       className="box-input-label">Country:</label>
                                                                <input type="text" className="box-input" value="India"
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for="" className="box-input-label">Phone:</label>
                                                                <input type="text" className="box-input" value="+91 "
                                                                       disabled />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for=""
                                                                       className="box-input-label">Username:</label>
                                                                <input type="text" className="box-input" name="username"
                                                                       value="Monuking1000kKing2638" required="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for="" className="box-input-label">Email:</label>
                                                                <input type="email" className="box-input"
                                                                       value="Anitarani3774@gamil.com" disabled />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for=""
                                                                       className="box-input-label">Gender:</label>
                                                                <input type="text" className="box-input" value=""
                                                                       required="" disabled />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for="" className="box-input-label">Date of
                                                                    Birth:</label>
                                                                <input type="text" className="box-input" value=""
                                                                       disabled />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for="" className="box-input-label">City:</label>
                                                                <input type="text" name="city" className="box-input"
                                                                       value="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for="" className="box-input-label">Zip
                                                                    Code:</label>
                                                                <input type="text" className="box-input" name="zip_code"
                                                                       value="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for=""
                                                                       className="box-input-label">Address:</label>
                                                                <input type="text" className="box-input" name="address"
                                                                       value="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for="" className="box-input-label">Joining
                                                                    Date:</label>
                                                                <input type="text" className="box-input"
                                                                       value="Tue, May 27, 2025 1:28 PM" required=""
                                                                       disabled />
                                                            </div>
                                                        </div>

                                                        <div className="col-xl-12">
                                                            <button type="submit"
                                                                    className="site-btn-sm primary-btn w-100 centered">Save
                                                                Changes</button>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="site-card">
                                            <div className="site-card-header">
                                                <h3 className="title">Change Password</h3>
                                            </div>
                                            <div className="site-card-body">
                                                <form action="/admin/user/password-update/19"
                                                      method="post">
                                                    <input type="hidden" name="_token"
                                                           value="" />
                                                    <div className="row">
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for="" className="box-input-label">New
                                                                    Password:</label>
                                                                <input type="password" name="new_password"
                                                                       className="box-input" required=""/>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="site-input-groups">
                                                                <label for="" className="box-input-label">Confirm
                                                                    Password:</label>
                                                                <input type="password" name="new_confirm_password"
                                                                       className="box-input" required=""/>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12">
                                                            <button type="submit"
                                                                    className="site-btn-sm primary-btn w-100 centered">Change
                                                                Password</button>
                                                        </div>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            {/* investments */}
                            <div className="tab-pane fade" id="pills-transfer" role="tabpanel"
                                 aria-labelledby="pills-transfer-tab">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="site-card">
                                            <div className="site-card-header">
                                                <h4 className="title">Investments</h4>
                                            </div>
                                            <div className="site-card-body table-responsive">
                                                <div className="site-datatable">
                                                    <table id="user-investment-dataTable"
                                                           className="display data-table">
                                                        <thead>
                                                        <tr>
                                                            <th>Icon</th>
                                                            <th>Schema</th>
                                                            <th>ROI</th>
                                                            <th>Profit</th>
                                                            <th>Capital Back</th>
                                                            <th>Timeline</th>
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

                            {/* earnings */}
                            <div className="tab-pane fade" id="pills-deposit" role="tabpanel"
                                 aria-labelledby="pills-deposit-tab">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="site-card">
                                            <div className="site-card-header">
                                                <h4 className="title">Earnings</h4>
                                                <div className="card-header-info">Total Earnings 8 USD</div>
                                            </div>
                                            <div className="site-card-body table-responsive">
                                                <div className="site-datatable">
                                                    <table id="user-profit-dataTable" className="display data-table">
                                                        <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Amount</th>
                                                            <th>Type</th>
                                                            <th>Profit From</th>
                                                            <th>Description</th>
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

                            {/* transaction */}
                            <div className="tab-pane fade" id="pills-transactions" role="tabpanel"
                                 aria-labelledby="pills-transactions-tab">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="site-card">
                                            <div className="site-card-header">
                                                <h4 className="title">Transactions</h4>
                                            </div>
                                            <div className="site-card-body table-responsive">
                                                <div className="site-datatable">
                                                    <table id="user-transaction-dataTable"
                                                           className="display data-table">
                                                        <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Transaction ID</th>
                                                            <th>Type</th>
                                                            <th>Amount</th>
                                                            <th>Gateway</th>
                                                            <th>Status</th>
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

                            {/* Referral Tree */}
                            <div className="tab-pane fade" id="pills-tree" role="tabpanel"
                                 aria-labelledby="pills-transactions-tab">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="site-card">
                                            <div className="site-card-header">
                                                <h4 className="title">Referral Tree</h4>
                                            </div>
                                            <div className="site-card-body table-responsive">


                                                <p>No Referral user found</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* ticket */}
                            <div className="tab-pane fade" id="pills-ticket" role="tabpanel"
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
                        </div>


                    </div>
                </div>
            </div>





        </div>
    )
}

export default EditUser;