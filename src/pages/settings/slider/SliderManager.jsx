import React, { useEffect, useState } from "react";
import apiClient from "../../../api/apiClient";
import { API_ROUTES } from "../../../routes/apiRoutes";
import RightPanel from "../../../components/panel/RightPanel";

const defaultSlide = { title: "", caption: "", imageUrl: "", link: "" };
const defaultSlider = { id: null, name: "", description: "", slides: [defaultSlide] };

export default function SliderManager() {
    const [sliders, setSliders] = useState([]);
    const [formData, setFormData] = useState(defaultSlider);
    const [isEditing, setIsEditing] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => { fetchSliders(); }, []);

    const fetchSliders = async () => {
        const res = await apiClient.get(API_ROUTES.APP.SLIDERS);
        setSliders(res.data || []);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        //setFormData(prev => ({ ...prev, [name]: value }));
         setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSlideChange = (index, field, value) => {
        const updatedSlides = [...formData.slides];
        updatedSlides[index][field] = value;
        setFormData({ ...formData, slides: updatedSlides });
    };

    const addSlide = () => {
        setFormData(prev => ({ ...prev, slides: [...prev.slides, { ...defaultSlide }] }));
    };

    const removeSlide = (index) => {
        const updated = [...formData.slides];
        updated.splice(index, 1);
        setFormData({ ...formData, slides: updated });
    };

    const handleImageUpload = (index, file) => {
        const reader = new FileReader();
        reader.onload = (e) => handleSlideChange(index, "imageUrl", e.target.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) await apiClient.put(`${API_ROUTES.APP.SLIDERS}/${formData.id}`, formData);
        else await apiClient.post(API_ROUTES.APP.SLIDERS, formData);

        fetchSliders();
        setFormData(defaultSlider);
        setIsPanelOpen(false);
        setIsEditing(false);
    };

    const handleEdit = (slider) => {
        setFormData(slider);
        setIsEditing(true);
        setIsPanelOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this slider?")) return;
        await apiClient.delete(`${API_ROUTES.APP.SLIDERS}/${id}`);
        fetchSliders();
    };
    
    const toggleActive = async (slider) => {
        console.log("Toggling active for slider:", slider);
        const updated = { ...slider, active: !slider.active };
        console.log("Updated slider data:", updated);
        await apiClient.put(`${API_ROUTES.APP.SLIDERS}/${slider.id}`, updated);
        fetchSliders();
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="site-card">
                    <div className="site-card-header d-flex justify-content-between align-items-center mb-2">
                        <h3 className="fw-bold">🎞️ Slider Management</h3>
                        <button className="btn btn-primary" onClick={() => { setFormData(defaultSlider); setIsPanelOpen(true); }}>+ Add Slider</button>
                    </div>


                    <div className="site-card-body row g-4">
                        {sliders.length === 0 ? (
                            <p className="text-muted">No sliders found.</p>
                        ) : (
                            sliders.map((slider) => (
                                <div className="col-md-4" key={slider.id}>
                                    <div className="card shadow-sm">
                                        <div id={`carousel-${slider.id}`} className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-inner">
                                                {slider.slides.map((s, i) => (
                                                    <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
                                                        <img src={s.imageUrl} className="d-block w-100 rounded-top" style={{ height: "180px", objectFit: "cover" }} />
                                                        <div className="carousel-caption bg-dark bg-opacity-50 rounded">
                                                            <h6>{s.title}</h6>
                                                            <p className="small">{s.caption}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${slider.id}`} data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon"></span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${slider.id}`} data-bs-slide="next">
                                                <span className="carousel-control-next-icon"></span>
                                            </button>
                                        </div>
                                        <div className="card-body">
                                            <h5>{slider.name}</h5>
                                            <p className="text-muted">{slider.description}</p>
                                            {/* Active/Inactive Badge */}
                                            <span className={`badge ${slider.active ? "bg-success" : "bg-secondary"}`}>
                                                {slider.active ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-end gap-2 p-3">
                                            <button className="btn btn-sm btn-outline-warning" onClick={() => toggleActive(slider)}>
                                                {slider.active ? "Deactivate" : "Activate"}
                                            </button>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEdit(slider)}>Edit</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(slider.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

            <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} style={{ width: "700px" }}>
                <h5 className="fw-bold mb-3">{isEditing ? "Edit Slider" : "Add New Slider"}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Slider Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows="2"></textarea>
                    </div>

                    <hr />
                    <h6 className="fw-bold mb-2">Slides</h6>

                    {formData.slides.map((slide, i) => (
                        <div key={i} className="border rounded p-3 mb-3 bg-light">
                            <div className="row g-2">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="form-control"
                                        value={slide.title}
                                        onChange={(e) => handleSlideChange(i, "title", e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        placeholder="Caption"
                                        className="form-control"
                                        value={slide.caption}
                                        onChange={(e) => handleSlideChange(i, "caption", e.target.value)}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="url"
                                        placeholder="Link (optional)"
                                        className="form-control"
                                        value={slide.link}
                                        onChange={(e) => handleSlideChange(i, "link", e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(i, e.target.files[0])}
                                    />
                                </div>
                            </div>
                            {slide.imageUrl && (
                                <div className="text-center mt-2">
                                    <img src={slide.imageUrl} alt="preview" className="img-thumbnail" style={{ maxHeight: "120px" }} />
                                </div>
                            )}
                            <div className="text-end mt-2">
                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeSlide(i)}>
                                    Remove Slide
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mb-3">
                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={addSlide}>+ Add Slide</button>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">{isEditing ? "Update Slider" : "Add Slider"}</button>
                    </div>
                </form>
            </RightPanel>
        </div>
    );
}
