
import { useState } from "react";

const ProfileTab = ({ userData, setUserData, isEditing, setIsEditing, handleSave, handlePhotoChange }) => {
  const [newPhoto, setNewPhoto] = useState(null);

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <p className="profile-title">Personal Info</p>
      <div className="profile-section">
        <div className="photo-container">
          <label className="input-label-profile">Profile Photo:</label>
          <img
            src={newPhoto ? URL.createObjectURL(newPhoto) : userData.photo}
            alt="Profile"
            className="profile-photo"
          />
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setNewPhoto(file);
                    handlePhotoChange(e);
                  }
                }}
                style={{ display: "none" }}
                id="photoInput"
              />
              <button
                className="btn-edit-photo"
                onClick={() => document.getElementById("photoInput").click()}
              >
                <img src="/f2.svg" alt="Change Photo" className="change-photo-icon" />
              </button>
            </>
          )}
        </div>
        <div className="personal-info-stack">
          <div className="info-item">
            <label className="input-label-profile">Name:</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              readOnly={!isEditing}
              className={`input-field ${!isEditing ? "readonly" : ""}`}
            />
          </div>
          <div className="info-item">
            <label className="input-label-profile">Job Title:</label>
            <input
              type="text"
              value={userData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              readOnly={!isEditing}
              className={`input-field ${!isEditing ? "readonly" : ""}`}
            />
          </div>
          <div className="info-item">
            <label className="input-label-profile">Email:</label>
            <input
              type="text"
              value={userData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              readOnly={!isEditing}
              className={`input-field ${!isEditing ? "readonly" : ""}`}
            />
          </div>
          <div className="info-item">
            <label className="input-label-profile">Password:</label>
            <input
              type="password"
              value={userData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              readOnly={!isEditing}
              className={`input-field ${!isEditing ? "readonly" : ""}`}
            />
          </div>
          <div className="info-item">
            <label className="input-label-profile">Phone no.:</label>
            <input
              type="text"
              value={userData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              readOnly={!isEditing}
              className={`input-field ${!isEditing ? "readonly" : ""}`}
            />
          </div>
        </div>
        <div className="action-buttons-group">
          <div className="save-edit-buttons">
            <button className="btn-save" onClick={handleSave} disabled={!isEditing}>
              Save
            </button>
            <button className="btn-edit" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
