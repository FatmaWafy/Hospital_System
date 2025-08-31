import React, { useState, useEffect } from "react";
import "./DoctorDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { LuFileEdit, LuTrash2 } from "react-icons/lu";
// Assuming DeleteModal is imported from your components
import DeleteModal from "../components/DeleteModal";

const EditDoctor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctorData, setDoctorData] = useState({
    name: "Omar Essam",
    email: "omar.essam@gmail.com",
    password: "123456789",
    phone: "0123456789",
    level: "Junior",
    specialty: "Internal Medicine",
    status: "Online",
    photo: "/placeholder-avatar.svg",
  });
  const [newPhoto, setNewPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // Placeholder: fetch(`/api/doctors/${id}`).then(res => setDoctorData(res))
    console.log("Fetching doctor ID:", id);
  }, [id]);

  const handleChange = (field, value) => {
    setDoctorData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPhoto(file);
      // Placeholder: fetch('/api/upload-photo', { method: 'POST', body: file }).then(res => handleChange("photo", res.url))
      console.log("Uploading photo:", file.name);
    }
  };

  const handleSave = () => {
    if (isEditing) {
      // Placeholder: Save to backend and update table
      fetch(`/api/doctors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorData),
      })
        .then((res) => res.json())
        .then(() => {
          console.log("Doctor updated:", doctorData);
          // Simulate table update (e.g., refresh doctors tab)
          navigate("/settings?tab=doctors");
        })
        .catch((err) => console.error("Error saving:", err));
      setIsEditing(false); // Exit edit mode
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDeleteConfirm = () => {
    // Placeholder: Delete from backend
    fetch(`/api/doctors/${id}`, { method: "DELETE" })
      .then(() => {
        console.log("Doctor deleted ID:", id);
        navigate("/settings?tab=doctors");
      })
      .catch((err) => console.error("Error deleting:", err));
    setIsDeleteModalOpen(false);
  };

  const handleBack = () => {
    navigate("/settings?tab=doctors");
  };

  return (
    <div className="doctor-details-page">
      <div className="doctor-details-content">
        <div className="doctor-details-header">
          <h1 className="doctor-details-title">Doctor Details</h1>
          <button className="back-btn" onClick={handleBack}>
            ← Back to Doctors
          </button>
        </div>
        <div className="doctor-details-card">
          <div className="tab-content">
            <div className="info-section">
              <h2 className="section-title">Personal Info</h2>
              <div className="personal-info-grid">
                <div className="photo-container">
                  <label className="input-label">Profile Photo:</label>
                  <img
                    src={doctorData.photo}
                    alt="Profile"
                    className="profile-photo"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: "none" }}
                    id="photoInput"
                    disabled={!isEditing}
                  />
                  <button
                    className="change-photo-btn"
                    onClick={() => document.getElementById("photoInput").click()}
                    disabled={!isEditing}
                  >
                    <LuFileEdit />
                  </button>
                </div>
                <div className="info-item">
                  <label className="input-label">Name:</label>
                  <input
                    type="text"
                    value={doctorData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="input-field"
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-item">
                  <label className="input-label">Email:</label>
                  <input
                    type="email"
                    value={doctorData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="input-field"
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-item">
                  <label className="input-label">Password:</label>
                  <input
                    type="password"
                    value={doctorData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="input-field"
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-item">
                  <label className="input-label">Phone no.:</label>
                  <input
                    type="text"
                    value={doctorData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="input-field"
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-item">
                  <label className="input-label">Level:</label>
                  <select
                    value={doctorData.level}
                    onChange={(e) => handleChange("level", e.target.value)}
                    className="input-field"
                    disabled={!isEditing}
                  >
                    <option>Intern</option>
                    <option>Junior</option>
                    <option>Mid-Level</option>
                    <option>Senior</option>
                    <option>Specialist</option>
                    <option>Consultant</option>
                  </select>
                </div>
                <div className="info-item">
                  <label className="input-label">Specialty:</label>
                  <select
                    value={doctorData.specialty}
                    onChange={(e) => handleChange("specialty", e.target.value)}
                    className="input-field"
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
            <div className="action-buttons-group">
              <button
                className="btn-save"
                onClick={handleSave}
                disabled={!isEditing}
              >
                Save
              </button>
              <button
                className="btn-edit"
                onClick={handleEdit}
                disabled={isEditing}
              >
                Edit Doctor
              </button>
              <button
                className="btn-delete"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <LuTrash2 /> Delete Doctor
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