import React, { useState, useEffect } from "react";
import apiClient from "../../../api/apiClient";
import { API_ROUTES } from "../../../routes/apiRoutes";
import RightPanel from "../../../components/panel/RightPanel";

export default function HtmlManager() {
    const [html, setHtml] = useState(null);
    const [css, setCss] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [formData, setFormData] = useState({});
    
    useEffect(() => {
        fetchHtml();
    }, []);

    /** 🔹 Fetch all banners */
    const fetchHtml = async () => {
        const response = await apiClient.get(`${API_ROUTES.APP.HTML}/1`, {});
        const data = response.data || [];
        setHtml(data.html);
        setCss(data.css);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apiClient.put(`${API_ROUTES.APP.HTML}/1`, {
            html,
            css
        });

        fetchHtml();
        setIsPanelOpen(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this banner?")) return;
        try {
            await apiClient.delete(`${API_ROUTES.APP.HTML}/${id}`);
            fetchHtml();
        } catch (err) {
            console.error("Error deleting banner:", err);
        }
    };

    const handlePreview = () => { 
        setIsPanelOpen(true);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12">
                    <div className="site-card">

                        <div className="site-card-header d-flex justify-content-between align-items-center mb-0">
                            <h3 className="fw-bold mb-0">🎯 Html Management</h3>
                            <button className="btn btn-primary px-4" onClick={handlePreview}>
                                + Preview
                            </button>
                        </div>

                        <div className="site-card-body banner-list row g-4">
                            <textarea
                                className="form-control"
                                rows="10"
                                value={html || ""}
                                onChange={(e) => setHtml(e.target.value)}
                                placeholder="Enter HTML content here..."
                            ></textarea>    
                            <textarea
                                className="form-control"
                                rows="10"
                                value={css || ""}
                                onChange={(e) => setCss(e.target.value)}
                                placeholder="Enter CSS content here..."
                            ></textarea>    
                        </div>
                        <button type="submit" className="btn btn-primary mb-2 ms-2" onClick={handleSubmit}>Update Html</button>
                    </div>
                </div>

            </div>

            <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} style={{ width: '600px' }}>
                <div className="p-2">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold mb-0">Preview HTML Content</h4>
                    </div>

                    <iframe
                        title="HTML Preview"
                        style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
                        srcDoc={`
                            <html>
                                <head>
                                    <style>${css || ""}</style>
                                </head>
                                <body>${html || ""}</body>
                            </html>
                        `}
                    />

                </div>
            </RightPanel>

        </div>
    );
}
