import React, { useEffect, useState } from "react";
import { LuMail } from "react-icons/lu";
import PageTitle from "../../components/page_title/PageTitle";
import RightPanel from "../../components/panel/RightPanel";
import FormInput from "../../components/form/FormInput";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../constants/apiRoutes";
import './Loader.css';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const EmailSetting = () => {
  const [formData, setFormData] = useState({
    mail_from_name: "",
    mail_from_address: "",
    mailing_driver: "smtp",
    mail_username: "",
    mail_password: "",
    mail_host: "",
    mail_port: "",
    mail_secure: "",
  });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState("");
  const [checking, setChecking] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get(API_ROUTES.CONFIG_PROPERTIES);
        console.log("RESPONSE_DATA: ", res);
        const config = res?.propertySources?.[0]?.source || {};
        setFormData({
          mail_from_name: config["mail.from.name"] || "",
          mail_from_address: config["mail.from.address"] || "",
          mailing_driver: "smtp", // Default
          mail_username: config["mail.username"] || "",
          mail_password: config["mail.password"] || "",
          mail_host: config["mail.host"] || "",
          mail_port: config["mail.port"] || "",
          mail_secure: config["mail.starttls.enable"] === "true" ? "starttls" : "", // example conversion
        });
      } catch (err) {
        console.error("Failed to fetch email settings:", err);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post(API_ROUTES.UPDATE_CONFIG, formData);
      setAlert({ message: "Settings saved successfully", type: "success" });
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Error saving settings");
      setAlert({ message: "Error saving settings", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleConnectionCheck = async (e) => {
    e.preventDefault();
    setChecking(true);
    setAlert({ message: "", type: "" }); // clear alert before checking  
    try {
      const payload = { recipient: checkEmail };
      const response = await apiClient.post(API_ROUTES.MAIL_CONNECTION_TEST, payload);
      setAlert({ message: "Connection test success : " + response.message, type: "success" });
    } catch (err) {
      console.error("Connection test failed:", err);
      alert("Connection test failed: " + err.message);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="main-content">
      <PageTitle title="Mail Settings" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-8">
            <div className="site-card">
              <div className="site-card-header">
                <h3 className="title">Mail Settings</h3>
                <div className="card-header-links">
                  <button className="card-header-link" onClick={() => setIsPanelOpen(true)}>
                    <LuMail style={{ marginTop: "-4px", marginRight: "12px" }} />
                    <span>Connection Check</span>
                  </button>
                </div>
              </div>

              <div className="site-card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-6">
                      <FormInput
                        label="Email From Name"
                        name="mail_from_name"
                        value={formData.mail_from_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-xl-6">
                      <FormInput
                        label="Email From Address"
                        name="mail_from_address"
                        type="email"
                        value={formData.mail_from_address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-xl-6">
                      <FormInput
                        label="Mail Username"
                        name="mail_username"
                        value={formData.mail_username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-xl-6">
                      <FormInput
                        label="Mail Password"
                        name="mail_password"
                        type="password"
                        value={formData.mail_password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-xl-6">
                      <FormInput
                        label="SMTP Host"
                        name="mail_host"
                        value={formData.mail_host}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-xl-3">
                      <FormInput
                        label="SMTP Port"
                        name="mail_port"
                        value={formData.mail_port}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-xl-3">
                      <FormInput
                        label="SMTP Secure"
                        name="mail_secure"
                        value={formData.mail_secure}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="offset-xl-3 col-xl-9">
                    <button type="submit" className="site-btn-sm primary-btn w-100" disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} style={{ width: "600px" }}>
        <h2>SMTP Connection</h2>
        <form onSubmit={handleConnectionCheck}>
          <div className="row">
            <div className="col-xl-12">
              <FormInput
                label="Your Email"
                name="email"
                type="email"
                onChange={(e) => { setCheckEmail(e.target.value) }}
                required
              />
            </div>
            <div className="col-xl-12">
              {/*<button type="submit" className="site-btn-sm primary-btn w-100" disabled={checking}>
                {checking ? "Checking...." : "Check Now"}
              </button>*/}

              <button type="submit" className="site-btn-sm primary-btn w-100" disabled={checking}>
                {checking ? (
                  <>
                    <AiOutlineLoading3Quarters className="spin-icon" style={{ marginRight: 8 }} />
                    Checking...
                  </>
                ) : (
                  "Check Now"
                )}
              </button>

            </div>
          </div>
        </form>
        {/* Alert Message */}
        {alert.message && (
          <div className={`alert alert-${alert.type} mt-4`} role="alert">
            {alert.message}
          </div>
        )}
      </RightPanel>
    </div>
  );
};

export default EmailSetting;
