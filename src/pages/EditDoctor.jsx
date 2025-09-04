import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { LuFileEdit, LuTrash2 } from "react-icons/lu";
import "./Settings.css";


const EditDoctor = () => {
  const [newPhoto, setNewPhoto] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleChange = (field, value) => {
    setDoctorData((prev) => ({ ...prev, [field]: value }));
  };
  const handleInputChange = (field, value) => {
    setDoctorData((prev) => ({ ...prev, [field]: value }));
  };
  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    level: "Junior",
    specialty: "Triage Doctor",
    status: "Online",
    photo: "/avatar.svg", // Correct path for initial avatar
  });

  const handleDeleteConfirm = () => {
    // Placeholder: Delete from backend (if adding then canceling)
    console.log("Clearing added doctor data");
    setIsDeleteModalOpen(false);
    navigate("/settings?tab=doctors");
  };

  const handleBack = () => {
    navigate("/settings?tab=doctors");
  };

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Handling Functions
  const handleSave = () => {
    console.log("Saving doctor data:", doctorData);
    setIsEditing(false);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPhoto(file);
      const photoUrl = URL.createObjectURL(file); // Preview the new photo
      setDoctorData((prev) => ({ ...prev, photo: photoUrl }));
      console.log("Uploading photo:", file.name);
    }
  };

  return (
    <div className="doctor-details-page">
      <div className="doctor-details-header">
        <h1 className="doctor-details-title">Doctor Details</h1>
        <button className="back-btn" onClick={handleBack}>
          ← Back to Doctors
        </button>
      </div>

      <div className="doctor-details-card">
        <div className="tab-content">
          <p className="profile-title">Personal Info</p>
          <div className="profile-section">
            <div className="photo-container">
              <label className="input-label-profile">Profile Photo:</label>
              <img
                src={newPhoto ? URL.createObjectURL(newPhoto) : doctorData.photo}
                alt="Profile"
                className="profile-photo"
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: "none" }}
                    id="photoInput"
                  />
                  <button
                    className="btn-edit-photo"
                    onClick={() => document.getElementById("photoInput").click()}
                  >
                    <img
                      src="/f2.svg"
                      alt="Change Photo"
                      className="change-photo-icon"
                    />
                  </button>
                </>
              )}
            </div>
            <div className="personal-info-stack">
              <div className="info-item">
                <label className="input-label-profile">Name:</label>
                <input
                  type="text"
                  value={doctorData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`input-field ${!isEditing ? "readonly" : ""}`}
                  disabled={!isEditing}
                />
              </div>
              <div className="info-item">
                <label className="input-label-profile">Email:</label>
                <input
                  type="email"
                  value={doctorData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`input-field ${!isEditing ? "readonly" : ""}`}
                  disabled={!isEditing}
                />
              </div>
              <div className="info-item">
                <label className="input-label-profile">Phone:</label>
                <input
                  type="tel"
                  value={doctorData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={`input-field ${!isEditing ? "readonly" : ""}`}
                  disabled={!isEditing}
                />
              </div>
              <div className="info-item">
                <label className="input-label-profile">Password:</label>
                <input
                  type="password"
                  value={doctorData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={`input-field ${!isEditing ? "readonly" : ""}`}
                  disabled={!isEditing}
                />
              </div>
              <div className="info-item">
                <label className="input-label-profile">Level:</label>
                <select
                  value={doctorData.level}
                  onChange={(e) => handleChange("level", e.target.value)}
                  className={`input-field ${!isEditing ? "readonly" : ""}`}
                  disabled={!isEditing}
                >
                  <option>Junior</option>
                  <option>Mid-Level</option>
                  <option>Senior</option>
                  <option>Specialist</option>
                  <option>Consultant</option>
                </select>
              </div>
              <div className="info-item">
                <label className="input-label-profile">Specialty:</label>
                <select
                  value={doctorData.specialty}
                  onChange={(e) => handleChange("specialty", e.target.value)}
                  className={`input-field ${!isEditing ? "readonly" : ""}`}
                  disabled={!isEditing}
                >
                  <option>Triage Doctor</option>
                  <option>Internal Medicine</option>
                  <option>G. Surgery</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                </select>
              </div>
            </div>
          </div>
          <div className="info-section">
            <h3 className="section-title">Status</h3>
            <div className="status-toggle-group">
              <button
                onClick={() => isEditing && handleInputChange("status", "Online")}
                disabled={!isEditing}
                className={`status-toggle-btn ${doctorData.status === "Online" ? "active online" : ""}`}
              >
                Online
              </button>
              <button
                onClick={() => isEditing && handleInputChange("status", "Offline")}
                disabled={!isEditing}
                className={`status-toggle-btn ${doctorData.status === "Offline" ? "active offline" : ""}`}
              >
                Offline
              </button>
            </div>
          </div>
          <div className="action-buttons-group">
            <div className="save-edit-buttons">
              <button
                className="btn-save"
                onClick={handleSave}
                disabled={!isEditing}
              >
                Save
              </button>
              <button
                className="btn-edit"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel Edit" : "Edit Doctor"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemType="doctor"
      />
    </div>
  );
};

export default EditDoctor;