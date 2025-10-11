import React, { useState, useEffect } from "react";
import "./BannerManager.css";
import apiClient from "../../../api/apiClient";
import { API_ROUTES } from "../../../routes/apiRoutes";
import RightPanel from "../../../components/panel/RightPanel";

const defaultFormData = {
    id: null,
    type: "",
    title: "",
    description: "",
    link: "",
    image: "",
}

export default function BannerManager() {
    const [banners, setBanners] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        fetchBanners();
    }, []);

    /** 🔹 Fetch all banners */
    const fetchBanners = async () => {
        const response = await apiClient.get(API_ROUTES.APP.BANNERS, {});
        const data = response.data || [];
        setBanners(data);
    };


    /** 🔹 Handle form field changes */
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) =>
                setFormData({ ...formData, image: e.target.result });
            reader.readAsDataURL(files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    /** 🔹 Add or Update Banner */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await apiClient.put(
                    `${API_ROUTES.APP.BANNERS}/${formData.id}`,
                    formData
                );
            } else {
                await apiClient.post(API_ROUTES.APP.BANNERS, formData);
            }

            setFormData({
                id: null,
                title: "",
                description: "",
                link: "",
                image: "",
            });
            setIsEditing(false);
            fetchBanners();
            setIsPanelOpen(false);
        } catch (err) {
            console.error("Error saving banner:", err);
        }
    };

    /** 🔹 Populate form for edit */
    const handleEdit = (banner) => {
        setFormData(banner);
        setIsEditing(true);
        setIsPanelOpen(true);
    };

    const handleAdd = () => {
        setFormData(defaultFormData);
        setIsEditing(false);
        setIsPanelOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this banner?")) return;
        try {
            await apiClient.delete(`${API_ROUTES.APP.BANNERS}/${id}`);
            fetchBanners();
        } catch (err) {
            console.error("Error deleting banner:", err);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12">
                    <div className="site-card">

                        <div className="site-card-header d-flex justify-content-between align-items-center mb-0">
                            <h3 className="fw-bold mb-0">🎯 Banner Management</h3>
                            <button className="btn btn-primary px-4" onClick={handleAdd}>
                                + Add Banner
                            </button>
                        </div>

                        <div className="site-card-body banner-list row g-4">
                            {banners.length === 0 ? (
                                <p className="text-muted text-center">No banners found.</p>
                            ) : (
                                banners.map((b) => (
                                    <div className="col-md-4" key={b.id}>
                                        <div className="banner-card shadow-sm">
                                            {b.image && (
                                                <div className="banner-img">
                                                    <img src={b.image} alt={b.title} className="img-fluid rounded-top" />
                                                </div>
                                            )}
                                            <div className="banner-body p-3">
                                                <h5 className="fw-semibold">{b.title}</h5>
                                                <p className="text-muted small">{b.description}</p>
                                                {b.link && (
                                                    <a href={b.link} target="_blank" rel="noreferrer" className="text-primary text-decoration-none fw-semibold">
                                                        Visit →
                                                    </a>
                                                )}
                                            </div>
                                            <div className="banner-actions mt-3 d-flex justify-content-end gap-2 p-4">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => handleEdit(b)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(b.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} style={{ width: '600px' }}>
                <div className="p-2">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold mb-0">
                            {isEditing ? "Edit Banner" : "Add New Banner"}
                        </h4>
                    </div>

                    <form className="banner-form" onSubmit={handleSubmit}>
                        {/* Type */}
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label fw-semibold">
                                Banner Type
                            </label>
                            <select
                                id="type"
                                name="type"
                                className="form-select"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="default">Default</option>
                                <option value="primary">Primary</option>
                                <option value="hero">Hero</option>
                                <option value="featured">Featured</option>
                                <option value="wallet">Wallet</option>
                                <option value="carousel">Carousel</option>
                            </select>
                        </div>

                        {/* Title */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label fw-semibold">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Enter banner title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label fw-semibold">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                placeholder="Enter banner description"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        {/* Link */}
                        <div className="mb-3">
                            <label htmlFor="link" className="form-label fw-semibold">
                                Link (optional)
                            </label>
                            <input
                                id="link"
                                type="url"
                                name="link"
                                className="form-control"
                                placeholder="https://example.com"
                                value={formData.link}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label fw-semibold">
                                Upload Image
                            </label>
                            <input
                                id="image"
                                type="file"
                                name="image"
                                className="form-control"
                                accept="image/*"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Image Preview */}
                        {formData.image && (
                            <div className="mb-3 text-center">
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="img-thumbnail rounded banner-preview"
                                    style={{ maxHeight: "180px", objectFit: "cover" }}
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg">
                                {isEditing ? "Update Banner" : "Add Banner"}
                            </button>
                        </div>
                    </form>
                </div>
            </RightPanel>

        </div>
    );
}
