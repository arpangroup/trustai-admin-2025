import React from 'react';
import PageTitle from '../../components/page_title/PageTitle';
import "./WithdrawSchedule.css"

const WithdrawSchedule = ({ name }) => {
    return (
        <div className="main-content">
            <PageTitle title="Withdraw Schedule" />


            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-7 col-md-12">
                        <div className="site-card">
                            {/* ##################### */}
                            <div class="site-card-body">
                                <form action="https://81habibi.com/admin/withdraw/schedule-update" method="post">
                                    <input type="hidden" name="_token" value="6uNwVKwHHRc8JgwVXPyPPcMCbWrA8kRaWXOJrYqQ" />
                                    <div class="site-input-groups row">
                                        <div class="col-sm-4 col-label pt-0">Sunday</div>
                                        <div class="col-sm-8">
                                            <div class="form-switch ps-0">
                                                <div class="switch-field">
                                                    <input type="radio" id="active-1" name="Sunday" value="1" checked />
                                                    <label for="active-1">Enable</label>
                                                    <input type="radio" id="disable-1" name="Sunday" value="0" />
                                                    <label for="disable-1">Disabled</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-label pt-0">Monday</div>
                                        <div class="col-sm-8">
                                            <div class="form-switch ps-0">
                                                <div class="switch-field">
                                                    <input type="radio" id="active-2" name="Monday" value="1" />
                                                    <label for="active-2">Enable</label>
                                                    <input type="radio" id="disable-2" name="Monday" value="0" checked />
                                                    <label for="disable-2">Disabled</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-label pt-0">Tuesday</div>
                                        <div class="col-sm-8">
                                            <div class="form-switch ps-0">
                                                <div class="switch-field">
                                                    <input type="radio" id="active-3" name="Tuesday" value="1" checked />
                                                    <label for="active-3">Enable</label>
                                                    <input type="radio" id="disable-3" name="Tuesday" value="0" />
                                                    <label for="disable-3">Disabled</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-label pt-0">Wednesday</div>
                                        <div class="col-sm-8">
                                            <div class="form-switch ps-0">
                                                <div class="switch-field">
                                                    <input type="radio" id="active-4" name="Wednesday" value="1" checked />
                                                    <label for="active-4">Enable</label>
                                                    <input type="radio" id="disable-4" name="Wednesday" value="0" />
                                                    <label for="disable-4">Disabled</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-label pt-0">Thursday</div>
                                        <div class="col-sm-8">
                                            <div class="form-switch ps-0">
                                                <div class="switch-field">
                                                    <input type="radio" id="active-5" name="Thursday" value="1" checked />
                                                    <label for="active-5">Enable</label>
                                                    <input type="radio" id="disable-5" name="Thursday" value="0" />
                                                    <label for="disable-5">Disabled</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-label pt-0">Friday</div>
                                        <div class="col-sm-8">
                                            <div class="form-switch ps-0">
                                                <div class="switch-field">
                                                    <input type="radio" id="active-6" name="Friday" value="1" checked />
                                                    <label for="active-6">Enable</label>
                                                    <input type="radio" id="disable-6" name="Friday" value="0" />
                                                    <label for="disable-6">Disabled</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-label pt-0">Saturday</div>
                                        <div class="col-sm-8">
                                            <div class="form-switch ps-0">
                                                <div class="switch-field">
                                                    <input type="radio" id="active-7" name="Saturday" value="1" checked />
                                                    <label for="active-7">Enable</label>
                                                    <input type="radio" id="disable-7" name="Saturday" value="0" />
                                                    <label for="disable-7">Disabled</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="offset-sm-4 col-sm-8">
                                            <button type="submit" class="site-btn-sm primary-btn w-100">
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* ################### */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WithdrawSchedule;
