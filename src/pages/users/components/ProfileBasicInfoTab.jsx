import React, { useState } from 'react';

import FormInput from "../../../components/form/FormInput";

const ProfileBasicInfoTab = ({ activeTab, userInfo, onFormChange }) => {
  const isActive = activeTab === "info";

  const basicFields = [
    { label: "First Name", name: "firstname" },
    { label: "Last Name", name: "lastname" },
    { label: "Country", name: "country", disabled: true },
    { label: "Phone", name: "mobile", disabled: true, valueKey: "phone" },
    { label: "Username", name: "username", disabled: true },
    { label: "Email", name: "email", disabled: true },
    { label: "Gender", name: "gender", disabled: true },
    { label: "Date of Birth", name: "dob", disabled: true },
    { label: "City", name: "city" },
    { label: "Zip Code", name: "zipCode", disabled: true },
    { label: "Address", name: "address", disabled: true },
    { label: "Joining Date", name: "createdAt", disabled: true },
  ];

  const passwordFields = [
    { label: "New Password", name: "new_password", type: "password" },
    { label: "Confirm Password", name: "new_confirm_password", type: "password" },
  ];


 const handleFormChange = (e) => {
    const { name, value } = e.target;
    // setuserInfo(prev => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example API call — "/api/profile/update"
      const response = await fetch(`/api/v1/users/${userInfo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      const result = await response.json();
      console.log("Success:", result);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      // Example API call — "/api/profile/update"
      const response = await fetch(`/api/v1/users/${userInfo.id}/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: "",
          newPassword: ""
        }),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      const result = await response.json();
      console.log("Success:", result);
      alert("password updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the password.");
    }
  }

  return (
    <div
      className={`tab-pane fade ${isActive ? "show active" : ""}`}
      id="pills-informations"
      role="tabpanel"
      aria-labelledby="pills-informations-tab"
    >
      {/* Basic Info */}
      <div className="row">
        <div className="col-xl-12">
          <div className="site-card">
            <div className="site-card-header">
              <h3 className="title">Basic Info</h3>
            </div>
            <div className="site-card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {basicFields.map((field) => (
                    <div
                      className="col-xl-4 col-lg-6 col-md-6 col-sm-6"
                      key={field.name}
                    >
                      <FormInput
                        label={field.label}
                        name={field.name}
                        type={field.type || "text"}
                        value={userInfo[field.name || field.valueKey] || ""}
                        required
                        disabled={field.disabled}
                        onChange={onFormChange}
                      />
                    </div>
                  ))}

                  <div className="col-xl-12">
                    <button type="submit" className="site-btn-sm primary-btn w-100 centered"> Save Changes </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="row">
        <div className="col-xl-12">
          <div className="site-card">
            <div className="site-card-header">
              <h3 className="title">Change Password</h3>
            </div>
            <div className="site-card-body">
              <form onSubmit={handlePasswordUpdate}>
                <div className="row">
                  {passwordFields.map((field) => (
                    <div
                      className="col-xl-6 col-lg-6 col-md-6 col-sm-6"
                      key={field.name}
                    >
                      <FormInput
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        required
                      />
                    </div>
                  ))}

                  <div className="col-xl-12">
                    <button
                      type="submit"
                      className="site-btn-sm primary-btn w-100 centered"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBasicInfoTab;