import React, { useState } from "react";
import "./DoctorDetails.css";
import { useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";

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
    photo: "/avatar.svg", // نفس الصورة الافتراضية بتاعت EditDoctor
  });
  const [newPhoto, setNewPhoto] = useState(null);

  const handleChange = (field, value) => {
    setDoctorData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPhoto(file);
      const photoUrl = URL.createObjectURL(file); // عشان أظهر الـ preview
      setDoctorData((prev) => ({ ...prev, photo: photoUrl }));
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
      photo: "/avatar.svg",
    });
    setNewPhoto(null);
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
            <p className="profile-title">Personal Info</p>
            <div className="profile-section">
              <div className="photo-container">
                <label className="input-label-profile">Profile Photo:</label>
                <img
                  src={newPhoto ? URL.createObjectURL(newPhoto) : doctorData.photo}
                  alt="Profile"
                  className="profile-photo"
                />
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
              </div>
              <div className="personal-info-stack">
                <div className="info-item">
                  <label className="input-label-profile">Name:</label>
                  <input
                    type="text"
                    value={doctorData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="info-item">
                  <label className="input-label-profile">Email:</label>
                  <input
                    type="email"
                    value={doctorData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="info-item">
                  <label className="input-label-profile">Password:</label>
                  <input
                    type="password"
                    value={doctorData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="info-item">
                  <label className="input-label-profile">Phone no.:</label>
                  <input
                    type="text"
                    value={doctorData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="info-item">
                  <label className="input-label-profile">Level:</label>
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
                  <label className="input-label-profile">Specialty:</label>
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
              <div className="save-edit-buttons">
                <button className="btn-save" onClick={handleSave}>
                  Save
                </button>
                <button className="btn-edit" onClick={handleClear}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
