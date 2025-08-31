import PageTitle from '../../components/page_title/PageTitle';
import FormInput from '../../components/form/FormInput';
import FormTextarea from '../../components/form/FormTextarea';
import Switch from '../../components/form/Switch';
import { useState } from 'react';

const EmailTemplateEdit = () => {
  const [formData, setFormData] = useState({});
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" }); // type: 'success' | 'danger'

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setAlert({ message: "Only JPG and PNG files are allowed!", type: "danger" });
        e.target.value = null;
        setScreenshotFile(null);
        setPreviewUrl("");
        return;
      }
      setScreenshotFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAlert({ message: "", type: "" }); // Clear previous alert
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setAlert({ message: "", type: "" }); // Clear previous alert
    }
  }

  return (

    <div className="main-content">
      <div className='container-fluid mt-4'>
        <div className='row justify-content-center'>
          <div className='col-xl-8 col-md-12'>
            <div className='site-card'>
              <div className='site-card-header'>
                <h2 className="title" style={{ fontWeight: '800' }}>Edit User Mail Send Template</h2>
                <div className="card-header-links">
                  <a href="#" className="card-header-link">Back</a>
                </div>
              </div>


              <div className='site-card-body'>
                <form>
                  <div class="site-input-groups row">
                    <label for="" className="col-sm-3 col-label">Email Subject</label>
                    <div className="col-sm-9">
                      {/* <input type="text" name="subject" className="box-input" value="[[subject]] for [[full_name]]" required=""/> */}
                      <FormInput
                        label=""
                        name="subject"
                        value=""
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className='site-input-groups row mb-0'>
                    <label for="" className="col-sm-3 col-label">Banner</label>
                    <div className="col-sm-9">
                      <div className="wrap-custom-file">
                        <input
                          type="file"
                          name="screenshot"
                          id="myUpload"
                          accept=".jpg, .jpeg, .png"
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="myUpload"
                          className={previewUrl ? "file-ok" : ""}
                          style={{
                            backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
                          }}
                        >
                          <img
                            className="upload-icon"
                            src="https://81habibi.com/assets/global/materials/upload.svg"
                            alt=""
                          />
                          <span>
                            {screenshotFile
                              ? screenshotFile.name
                              : "Select Screenshot (Required)"}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>


                  <div className='site-input-groups row mb-0'>
                    <label for="" className="col-sm-3 col-label">Title</label>
                    <div className="col-sm-9">
                      <FormInput
                        label=""
                        name="title"
                        value="Sample Email"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>


                  <div className='site-input-groups row mb-0'>
                    <label for="" className="col-sm-3 col-label">Salutation</label>
                    <div className="col-sm-9">
                      <FormInput
                        label=""
                        name="salutation"
                        value="Hi [[full_name]],"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className='site-input-groups row mb-0'>
                    <label for="" className="col-sm-3 col-label">Message Body</label>
                    <div className="col-sm-9">
                      <FormTextarea
                        name="messageBody"
                        onChange={handleChange}
                      />
                    </div>
                  </div>


                  <div className='site-input-groups row mb-0'>
                    <label for="" className="col-sm-3 col-label">Button</label>
                    <div class="col-sm-4">
                      <FormInput
                        label=""
                        name="buttonLevel"
                        value="Login Your Account"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div class="col-sm-5">
                      <FormInput
                        label=""
                        name="buttonLink"
                        value="https://trustai.co.in/login"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>


                  <div className='site-input-groups row mb-0'>
                    <label for="" className="col-sm-3 col-label">Newsletter Footer</label>
                    <div className="col-sm-6">
                      <Switch
                        name="enableFooterStatus"
                        enabled={true}
                        labels={['Enable', 'Disable']}
                        onToggle={handleChange}
                      // onToggle={handleToggle}
                      />
                    </div>
                  </div>

                  <div className='site-input-groups row mb-4'>
                    <label for="" className="col-sm-3 col-label">Footer Message Body</label>
                    <div className="col-sm-9">
                      <FormTextarea
                        name="footerBody"
                        onToggle={handleChange}
                      />
                    </div>
                  </div>

                  <div className='site-input-groups row mb-0'>
                    <label for="" className="col-sm-3 col-label">Newsletter Bottom</label>
                    <div className="col-sm-6">
                      <Switch
                        name="enableFooterBottom"
                        labels={['Enable', 'Disable']}
                        enabled={true}
                        onToggle={handleChange}
                      // onToggle={handleToggle}
                      />
                    </div>
                  </div>

                  <div className='site-input-groups row mb-0'>
                    <label for="" className="col-sm-3 col-label">Newsletter Bottom Title</label>
                    <div className="col-sm-9">
                      <FormInput
                        label=""
                        name="bottomTitle"
                        value="What is {{site_title}}"
                        onToggle={handleChange}
                      />
                    </div>
                  </div>


                  <div className='site-input-groups row mb-4'>
                    <label for="" className="col-sm-3 col-label">Newsletter Body</label>
                    <div className="col-sm-9 mb-0">
                      <FormTextarea
                        name="bottomBody"
                        onToggle={handleChange}
                      />
                      <p className="paragraph mb-2 mt-2">The Shortcuts you can use
                        <strong>[[full_name]], [[site_url]], [[site_title]], [[subject]], [[message]]</strong>
                      </p>
                    </div>
                  </div>

                  <div className='site-input-groups row mb-0'>
                    <label for="" className="col-sm-3 col-label">Template Status</label>
                    <div className="col-sm-6">
                      <Switch
                        name="templateActive"
                        labels={['Enable', 'Disable']}
                        enabled={true}
                        onToggle={handleChange}
                      // onToggle={handleToggle}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="offset-sm-3 col-sm-9">
                      <button type="submit" className="site-btn-sm primary-btn w-100">Save Changes</button>
                    </div>
                  </div>



                  <div className='site-input-groups row'>
                  </div>


                  <div className='site-input-groups row'>
                  </div>


                </form>
              </div>



            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateEdit;
