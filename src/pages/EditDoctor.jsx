import { useState } from "react";
import "./DoctorDetails.css";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import "./Settings.css";
 
const EditDoctor = () => {
  const [newPhoto, setNewPhoto] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleChange = (field, value) => {
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
    photo: "avatar.svg",
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
  const [userData, setUserData] = useState({
    name: "Ahmed Safwat Mohamed",
    jobTitle: "Er Manager",
    email: "i.asafwat@gmail.com",
    phone: "0123456789",
    photo: "avatar.svg",
    password: "*****", // Added password field
  });


  // Handling Functions
  const handleSave = () => {
    console.log("Saving user data:", userData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPhoto(file);
      console.log("Uploading photo:", file.name);
      console.log(newPhoto);
    }
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
            <div>
              <p className='profile-title'>Personal Info</p>
              <div className='profile-section'>
                <div className='photo-container'>
                  <label className='input-label-profile'>Profile Photo:</label>
                  <img
                    src={userData.photo}
                    alt='Profile'
                    className='profile-photo'
                  />
                  {isEditing && (
                    <>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={handlePhotoChange}
                        style={{ display: "none" }}
                        id='photoInput'
                      />
                      <button
                        className='btn-edit-photo'
                        onClick={() =>
                          document.getElementById("photoInput").click()
                        }
                      >
                        <img
                          src='f2.svg'
                          alt='Change Photo'
                          className='change-photo-icon'
                        />
                      </button>
                    </>
                  )}
                </div>
                <div className='personal-info-stack-details'>
                  <div>
                    <div className='info-item'>
                    <label className='input-label-profile'>Name:</label>
                    <input
                      type='text'
                      value={userData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      readOnly={!isEditing}
                      className={`input-field ${!isEditing ? "readonly" : ""}`}
                    />
                  </div>
                  <div className='info-item'>
                    <label className='input-label-profile'>Job Title:</label>
                    <input
                      type='text'
                      value={userData.jobTitle}
                      onChange={(e) =>
                        handleInputChange("jobTitle", e.target.value)
                      }
                      readOnly={!isEditing}
                      className={`input-field ${!isEditing ? "readonly" : ""}`}
                    />
                  </div>
                  <div className='info-item'>
                    <label className='input-label-profile'>Email:</label>
                    <input
                      type='text'
                      value={userData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      readOnly={!isEditing}
                      className={`input-field ${!isEditing ? "readonly" : ""}`}
                    />
                  </div>
                  </div>
                  <div>
                    <div className='info-item'>
                    <label className='input-label-profile'>Password:</label>
                    <input
                      type='password'
                      value={userData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      readOnly={!isEditing}
                      className={`input-field ${!isEditing ? "readonly" : ""}`}
                    />
                  </div>
                  <div className='info-item'>
                    <label className='input-label-profile'>Phone no.:</label>
                    <input
                      type='text'
                      value={userData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      readOnly={!isEditing}
                      className={`input-field ${!isEditing ? "readonly" : ""}`}
                    />
                  </div>
                  </div>
                  <div>
                    <div className="info-item">
                      <label className="input-label-profile">Level:</label>
                      <select
                        value={doctorData.level}
                        onChange={(e) => handleChange("level", e.target.value)}
                        className={`input-field ${!isEditing ? "readonly" : ""}`}
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
                        className={`input-field ${!isEditing ? "readonly" : ""}`}
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
               
              </div>
               <div className="info-section">
                <h3 className="section-title">Status</h3>
                <div className="status-toggle-group">
                  <button
                    onClick={() => isEditing && handleInputChange("status", "online")}
                    disabled={!isEditing}
                    className={`status-toggle-btn ${doctorData.status === "online" ? "active online" : ""}`}
                  >
                    Online
                  </button>
                  <button
                    onClick={() => isEditing && handleInputChange("status", "offline")}
                    disabled={!isEditing}
                    className={`status-toggle-btn ${doctorData.status === "offline" ? "active offline" : ""}`}
                  >
                    Offline
                  </button>
                </div>
              </div>
               <div className='action-buttons-group'>
                  <div className='save-edit-buttons'>
                    <button
                      className='btn-save'
                      onClick={handleSave}
                      disabled={!isEditing}
                    >
                      Save
                    </button>
                    <button
                      className='btn-edit'
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel Edit" : "Edit Profile"}
                    </button>
                  </div>
                </div>
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