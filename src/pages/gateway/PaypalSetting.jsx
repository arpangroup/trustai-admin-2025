import ReactDOM from 'react-dom';

const PaypalSetting = () => {
    return (
        <div class="modal-body">
            <div class="row">
                <form action="https://81habibi.com/admin/gateway/update/1" class="row" method="post" enctype="multipart/form-data"></form>
                <input type="hidden" name="_token" value="UxHRxI8okXCHHDgRwrJUxpenkQOC6aqZl9fbKbwJ" />
                <div class="col-xl-12">
                    <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-12">
                            <div class="site-input-groups mb-0">
                                <label class="box-input-label" for="">Upload Logo:</label>
                                <div class="wrap-custom-file">
                                    <input type="file" name="logo" id="schema-icon" accept=".gif, .jpg, .png" />
                                    <label for="schema-icon" class="file-ok" style={{ backgroundImage: 'url(https://81habibi.com/assets/global/gateway/stripe.png)' }}>
                                        <img class="upload-icon" src="https://81habibi.com/assets/global/materials/upload.svg" alt="" />
                                        <span>Update Logo</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-12">
                    <div class="site-input-groups mb-0">
                        <label class="box-input-label" for="">Name:</label>
                        <input type="text" class="box-input" name="name" value="Paypal" />
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-12">
                    <div class="site-input-groups mb-0">
                        <label class="box-input-label" for="">Code Name:</label>
                        <input type="text" class="box-input" disabled="" value="paypal" />
                    </div>
                </div>

                <div class="col-xl-12">
                    <div class="site-input-groups mb-0">
                        <label class="box-input-label" for="">Client Id :</label>
                        <input type="text" name="credentials[client_id] " class="box-input" value="AUnfkQ3v2J-d5g-ZEq8l5Oosha8FmAJ3Z9jt71BkD6l-Z3FMIR5FmkYp_6QHwaYx0LvMNvHDsB9Vh84O" />
                    </div>
                </div>
                <div class="col-xl-12">
                    <div class="site-input-groups mb-0">
                        <label class="box-input-label" for="">Client Secret :</label>
                        <input type="text" name="credentials[client_secret] " class="box-input" value="EJjci35CFj762ut15pn0VWmojEG0GwE68byyHnBq_NoAXXW9mjkjdLFYLfVQwyLs8QAbP1QJAXPl5oAl" />
                    </div>
                </div>
                <div class="col-xl-12">
                    <div class="site-input-groups mb-0">
                        <label class="box-input-label" for="">App Id :</label>
                        <input type="text" name="credentials[app_id] " class="box-input" value="APP-80W284485P519543T" />
                    </div>
                </div>
                <div class="col-xl-12">
                    <div class="site-input-groups mb-0">
                        <label class="box-input-label" for="">Mode :</label>
                        <input type="text" name="credentials[mode] " class="box-input" value="sandbox" />
                    </div>
                </div>


                <div class="col-xl-12">
                    <div class="site-input-groups mb-0">
                        <label class="box-input-label" for="">Status:</label>
                        <div class="switch-field same-type">
                            <input type="radio" id="status-enable-1" name="status" value="1" />
                            <label for="status-enable-1">Active</label>
                            <input type="radio" id="status-disable-1" name="status" value="0" checked="" />
                            <label for="status-disable-1">Deactivate</label>
                        </div>
                    </div>
                </div>
                <div class="col-xl-12">
                    <button type="submit" class="site-btn primary-btn w-100">
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
}

export default PaypalSetting;