import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../../components/form/FormInput';
import FormTextarea from '../../components/form/FormTextarea';
import Switch from '../../components/form/Switch';
import FileInput from '../../components/form/FileInput';
import { API_ROUTES } from '../../constants/apiRoutes';

const EmailTemplateEdit = ({ type = "email" }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    axios.get(API_ROUTES.TEMPLATE_BY_ID(type, id))
      .then((res) => {
        setFormData(res.data);
        setOriginalData(res.data); // Store original for comparison
      })
      .catch((err) => console.error("Error loading template:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files.length > 0) {
      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG and PNG files are allowed!");
        return;
      }
      setScreenshotFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const changedFields = {};

    // Compare formData and originalData
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== originalData[key]) {
        changedFields[key] = formData[key];
      }
    });

    const hasFileChanged = !!screenshotFile;
    const isDataChanged = Object.keys(changedFields).length > 0;

    if (!isDataChanged && !hasFileChanged) {
      alert("No changes detected.");
      return;
    }

    try {
      if (hasFileChanged) {
        const form = new FormData();
        form.append("screenshot", screenshotFile);
        // Also append changed fields
        Object.entries(changedFields).forEach(([key, value]) => {
          form.append(key, value);
        });

        await axios.put(API_ROUTES.TEMPLATE_BY_ID(type, id), form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.put(API_ROUTES.TEMPLATE_BY_ID(type, id), changedFields);
      }

      alert("Template updated successfully.");
      setOriginalData({ ...formData }); // Update original to match saved state
      setScreenshotFile(null); // Reset file state
    } catch (error) {
      console.error("Error updating template:", error);
      alert("Failed to update template.");
    }
  };

  const handleToggle = (name, value) => {
    console.log('Toggling:', name, value); // Add this to debug
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formFields = [
    { name: "subject", label: "Email Subject", component: FormInput },
    { name: "screenshot", label: "Banner", component: FileInput, isBanner: true },
    { name: "title", label: "Title", component: FormInput },
    { name: "salutation", label: "Salutation", component: FormInput },
    { name: "messageBody", label: "Message Body", component: FormTextarea },
    { name: "buttonLevel", label: "Button Text", component: FormInput },
    { name: "buttonLink", label: "Button Link", component: FormInput },
    { name: "enableFooterStatus", label: "Newsletter Footer", component: Switch },
    { name: "footerBody", label: "Footer Message Body", component: FormTextarea },
    { name: "enableFooterBottom", label: "Newsletter Bottom", component: Switch },
    { name: "bottomTitle", label: "Newsletter Bottom Title", component: FormInput },
    { name: "bottomBody", label: "Newsletter Body", component: FormTextarea },
    { name: "templateActive", label: "Template Status", component: Switch },
  ];

  return (
    <div className="main-content">
      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-md-12">
            <div className="site-card">
              <div className="site-card-header">
                <h2 className="title" style={{ fontWeight: '800' }}>
                  {formData.code} Template
                </h2>
              </div>
              <div className="site-card-body">
                <form onSubmit={handleSubmit}>
                  {formFields.map(({ name, label, component: Component, isBanner }) => (
                    <div className="site-input-groups row" key={name}>
                      <label className="col-sm-3 col-label">{label}</label>
                      <div className="col-sm-9">
                        {isBanner ? (
                          <FileInput
                            name="screenshot"
                            file={screenshotFile}
                            previewUrl={previewUrl}
                            onChange={handleChange}
                          />
                        ) : Component === Switch ? (
                          <Switch
                            name={name}
                            labels={["Enable", "Disable"]}
                            enabled={!!formData[name]}
                            onToggle={handleToggle}
                          />
                        ) : (
                          <Component
                            name={name}
                            label=""
                            value={formData[name] || ""}
                            onChange={handleChange}
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="row">
                    <div className="offset-sm-3 col-sm-9">
                      <button type="submit" className="site-btn-sm primary-btn w-100">Save Changes</button>
                    </div>
                  </div>

                  <div className="site-input-groups row mt-2">
                    <div className="offset-sm-3 col-sm-9">
                      <p className="paragraph">
                        The Shortcuts you can use:
                        <strong> {`{{full_name}}, {{site_url}}, {{site_title}}, {{subject}}, {{message}}`} </strong>
                      </p>
                    </div>
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
