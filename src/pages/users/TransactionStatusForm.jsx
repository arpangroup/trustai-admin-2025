import React, { useEffect, useState } from 'react';
import Switch from '../../components/form/Switch';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../routes';

const switchFields = [
    { label: 'Deposit Status', name: 'depositEnabled' },
    { label: 'Withdraw Status', name: 'withdrawEnabled' },
    { label: 'Send Money Status', name: 'sendMoneyEnabled' },
];

const TransactionStatusForm = ({ initialStatus, userId }) => {
    const [formData, setFormData] = useState(initialStatus);
    const [loadingField, setLoadingField] = useState(null);

     useEffect(() => {
        setFormData(initialStatus); // Sync if props change
    }, [initialStatus]);

    // const [formData, setFormData] = useState({
    //     depositStatus: false,
    //     withdrawStatus: true,
    //     sendMoneyStatus: true,
    // });

    const handleToggle = async (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        setLoadingField(field);
        //console.log("UPDATE_TRANSACTION_STARTUS: ", field, value);
        let url = API_ROUTES.USERS.TRANSACTION_STATUS(userId);

        // Build params object conditionally based on the field
        const params = {};
        const newStatus = value === true ? 'ENABLED' : 'DISABLED';
        if (field === 'depositEnabled') params.depositStatus = newStatus;
        if (field === 'withdrawEnabled') params.withdrawStatus = newStatus;
        if (field === 'sendMoneyEnabled') params.sendMoneyStatus = newStatus;

        try {
            await apiClient.put(url, null, { params });

            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        } catch (err) {
            console.error('Error updating transaction status:', err);
            alert(`Failed to update ${field}: ${err.message}`);
        } finally {
            setLoadingField(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can POST formData or handle it as needed
        console.log('Form submitted with data:', formData);
    };

    return (
        <div className="site-card mb-0">
            <div className="site-card-header">
                <h3 className="title-small">Transaction Informations</h3>
            </div>
            <div className="site-card-body">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                         {switchFields.map(({ label, name }) => (
                            <div className="col-xl-12" key={name}>
                                <div className="profile-card-single">
                                    <h5 className="heading">{label}</h5>
                                    <Switch
                                        name={name}
                                        enabled={formData[name]}
                                        onToggle={handleToggle}
                                    />
                                    {loadingField === name && <p>Saving...</p>}
                                </div>
                            </div>
                        ))}

                        {/* <div className="col-12">
                            <button type="submit" className="site-btn-sm primary-btn w-100 centered">
                                Save Changes
                            </button>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TransactionStatusForm;
