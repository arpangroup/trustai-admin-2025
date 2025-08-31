import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormTextarea from '../../components/form/FormTextarea';
import Switch from '../../components/form/Switch';
import { API_ROUTES } from '../../constants/apiRoutes';
import FormInput from '../../components/form/FormInput';

const PushNotificationTemplateEdit = ({ type = "push" }) => {
    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        axios.get(API_ROUTES.TEMPLATE_BY_ID(type, id))
            .then((res) => {
                setFormData(res.data);
                setOriginalData(res.data);
            })
            .catch((err) => console.error("Error loading template:", err));
    }, [id, type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const changedFields = {};
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== originalData[key]) {
                changedFields[key] = formData[key];
            }
        });

        if (Object.keys(changedFields).length === 0) {
            alert("No changes detected.");
            return;
        }

        try {
            await axios.put(API_ROUTES.TEMPLATE_BY_ID(type, id), changedFields);
            alert("Template updated successfully.");
            setOriginalData({ ...formData });
        } catch (error) {
            console.error("Error updating template:", error);
            alert("Failed to update template.");
        }
    };

    const formFields = [
        { name: "title", label: "Title", component: FormInput },
        { name: "messageBody", label: "Message Body", component: FormTextarea, warning: 'The Shortcuts you can use: [[full_name]], [[message]]' }, 
        { name: "templateActive", label: "Template Status", component: Switch }
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
                                    {formFields.map(({ name, label, component: Component, warning }) => (
                                        <div className="site-input-groups row" key={name}>
                                            <label className="col-sm-3 col-label">{label}</label>
                                            <div className="col-sm-9">
                                                {Component === Switch ? (
                                                    <Switch
                                                        name={name}
                                                        labels={["Enable", "Disable"]}
                                                        enabled={!!formData[name]}
                                                        onToggle={handleToggle}
                                                    />
                                                ) : (
                                                    <Component
                                                        name={name}
                                                        value={formData[name] || ""}
                                                        warning={warning}
                                                        onChange={handleChange}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="row">
                                        <div className="offset-sm-3 col-sm-9">
                                            <button type="submit" className="site-btn-sm primary-btn w-100">
                                                Save Changes
                                            </button>
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

export default PushNotificationTemplateEdit;
