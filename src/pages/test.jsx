import React, { useState } from "react";
import "./Settings.css"; // Use old Settings.css for no conflict
import { useNavigate } from "react-router-dom";
import { LuPlus, LuTrash2 } from "react-icons/lu";

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
    photo: "avatar.svg",
  });
  const [newPhoto, setNewPhoto] = useState(null);

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
    // Placeholder: fetch('/api/doctors', { method: 'POST', body: JSON.stringify(doctorData) })
    console.log("Adding doctor:", doctorData);
    navigate("/settings?tab=doctors");
  };

  const handleDelete = () => {
    // Placeholder for delete if needed
    console.log("Deleting doctor");
    navigate("/settings?tab=doctors");
  };

  const handleBack = () => {
    navigate("/settings?tab=doctors");
  };

  return (
    <div className="settings-page">
      <h1>Add New Doctor</h1>
      <button onClick={handleBack} className="btn-edit">Back to Doctors</button>
      <div className="profile-section">
        <div className="photo-container">
          <label className="input-label">Profile Photo:</label>
          <img src={doctorData.photo} alt="Profile" className="profile-photo" />
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
            <LuPlus />
          </button>
        </div>
        <div className="personal-info-stack">
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
        <button className="btn-save" onClick={handleSave}>Save</button>
        <button className="btn-edit">Edit Doctor</button>
        <button className="btn-delete" onClick={handleDelete}>
          <LuTrash2 /> Delete Doctor
        </button>
      </div>
    </div>
  );
};

export default AddDoctor;