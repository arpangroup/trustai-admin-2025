import React from "react";
import PageTitle from "../../components/page_title/PageTitle";
import { WEB_ROUTES } from "../../routes";

export default function CustomCss() {
  return (
    <div className="main-content">
      <PageTitle title="Add Custom CSS" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body">
                <div className="paragraph mb-4 d-flex align-items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-alert-triangle"
                  >
                    <path d="M21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                  <span>
                    You can add <strong>Custom CSS</strong> below. It will affect the{' '}
                    <strong>User Front End Pages</strong>.
                  </span>
                </div>

                <form
                  action={WEB_ROUTES.CUSTOM_CSS.path}
                  method="POST"
                >
                  <input
                    type="hidden"
                    name="_token"
                    value="RtOih6ujzDcML9cSdZ1x5oykyYyUfNL7EXkZgrod"
                  />

                  <div className="site-input-groups">
                    {/* Replace this textarea with a React CodeMirror component */}
                    <textarea
                      name="custom_css"
                      className="form-textarea editorContainer"
                      placeholder={`/* Your custom CSS here */\n.site-head-tag {\n  margin: 0;\n  padding: 0;\n}`}
                      rows="10"
                    />
                  </div>

                  <button type="submit" className="site-btn-sm primary-btn">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
