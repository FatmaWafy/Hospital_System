import React, { useState } from "react";
import "./DoctorDetails.css";
import { useNavigate } from "react-router-dom";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import DeleteModal from "../components/DeleteModal";

const AddDoctor = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    level: "Junior",
    specialty: "Triage Doctor",
    status: "Online",
    photo: "/placeholder-avatar.svg",
  });
  const [newPhoto, setNewPhoto] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleChange = (field, value) => {
    setDoctorData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPhoto(file);
      console.log(newPhoto)
      // Placeholder: fetch('/api/upload-photo', { method: 'POST', body: file }).then(res => handleChange("photo", res.url))
      console.log("Uploading photo:", file.name);
    }
  };

  const handleSave = () => {
    // Placeholder: Save to backend and update table
    fetch("/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctorData),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Doctor added:", doctorData);
        // Simulate table update (e.g., refresh doctors tab)
        navigate("/settings?tab=doctors");
      })
      .catch((err) => console.error("Error saving:", err));
  };

  const handleClear = () => {
    setDoctorData({
      name: "",
      email: "",
      password: "",
      phone: "",
      level: "Junior",
      specialty: "Triage Doctor",
      status: "Online",
      photo: "/placeholder-avatar.svg",
    });
    setNewPhoto(null);
  };

  const handleDeleteConfirm = () => {
    // Placeholder: Delete from backend (if adding then canceling)
    console.log("Clearing added doctor data");
    handleClear();
    setIsDeleteModalOpen(false);
    navigate("/settings?tab=doctors");
  };

  const handleBack = () => {
    navigate("/settings?tab=doctors");
  };

  return (
    <div className="doctor-details-page">
      <div className="doctor-details-content">
        <div className="doctor-details-header">
          <h1 className="doctor-details-title">Add New Doctor</h1>
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
                  />
                  <button
                    className="change-photo-btn"
                    onClick={() => document.getElementById("photoInput").click()}
                  >
                    <LuPlus />
                  </button>
                </div>
                <div className="info-item">
                  <label className="input-label">Name:</label>
                  <input
                    type="text"
                    value={doctorData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="info-item">
                  <label className="input-label">Email:</label>
                  <input
                    type="email"
                    value={doctorData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="info-item">
                  <label className="input-label">Password:</label>
                  <input
                    type="password"
                    value={doctorData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="info-item">
                  <label className="input-label">Phone no.:</label>
                  <input
                    type="text"
                    value={doctorData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="info-item">
                  <label className="input-label">Level:</label>
                  <select
                    value={doctorData.level}
                    onChange={(e) => handleChange("level", e.target.value)}
                    className="input-field"
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
              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
              <button className="btn-edit" onClick={handleClear}>
                Clear
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

export default AddDoctor;