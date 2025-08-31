import React, { useEffect, useState } from 'react';
import Switch from '../../components/form/Switch';

const switchFields = [
    { label: 'Account Status', name: 'accountActive' },
    { label: 'Email Verification', name: 'emailVerified', disabled: true },
    { label: 'Phone Verification', name: 'phoneVerified', disabled: true },
    { label: 'KYC Verification', name: 'kycVerified', disabled: true },
    // { label: '2FA Verification', name: '2FAVerified' },
];

const AccountStatusForm = ({ initialStatus, userId }) => {
    const [formData, setFormData] = useState(initialStatus);
    const [loadingField, setLoadingField] = useState(null);
    //console.log("ACCOUNT_STATUS: ", initialStatus);

    useEffect(() => {
        setFormData(initialStatus); // Sync if props change
    }, [initialStatus]);

    // const [formData, setFormData] = useState({
    //     accountStatus: false,
    //     emailVerified: true,
    //     kycVerified: true,
    //     '2FAVerified': false,
    // });

    const handleToggle = async (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setLoadingField(field);
        console.log("UPDATE_ACCOUNT: ", field, value);
        
        let url = '';
        if(field === 'accountActive') {
            url = `/api/v1/users/${userId}/account-status?status=${value === true ? 'ACTIVE' : 'DISABLED'}`
        }

         try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    [field]: value
                }),
            });

            if (!response.ok) throw new Error('Failed to update');

            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        } catch (err) {
            alert(`Failed to update ${field}`);
        } finally {
            setLoadingField(null);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Here you can POST formData or handle it as needed    

        // const requestBody = {
        //     "accountActive": accountActive,
        //     "emailVerified": emailVerified,
        //     "phoneVerified": phoneVerified,
        //     "kycVerified": kycVerified,
        // }        
    };

    const toLetterCase = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    
    const getLabels = (field) => {
        const {accountStatus, emailVerifyStatus, phoneVerifyStatus, kycStatus} = formData;
        const {accountActive, emailVerified, phoneVerified, kycVerified} = formData;
        if(field === 'accountActive') {
            if(accountStatus != 'ACTIVE') return ['Active', toLetterCase(accountStatus)];
            else return ['Active', "Disabled"];
        } else if(field === 'emailVerified' || field === 'phoneVerified' || field === 'addressVerified') {
            return ['Verified', "Unverified"];
        } else if(field === 'kycVerified') {
            return ['Verified', toLetterCase(kycStatus)];            
        }
        return ['On', 'Off'];
    };

    
    

    return (
        <div className="site-card mb-16">
            <div className="site-card-header">
                <h3 className="title-small">Account Informations</h3>
            </div>
            <div className="site-card-body">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        {switchFields.map(({ label, name, disabled=false }) => (
                            <div className="col-xl-12" key={name}>
                                <div className="profile-card-single" >
                                    <h5 className="heading">{label}</h5>
                                    <Switch
                                        name={name}
                                        enabled={formData[name]}
                                        labels={getLabels(name)}
                                        disabled={disabled}
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

export default AccountStatusForm;
