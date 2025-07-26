import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DoctorDetails.css";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    name: "Omar Essam",
    username: "Omar_Essam22",
    specialty: "Internal Medicine",
    level: "Junior",
    status: "online",
  });

  const [shiftData] = useState({
    currentShift: "Morning",
    nextShift: "Evening",
    shiftStart: "08:00",
    shiftEnd: "16:00",
    totalHours: "8",
    weeklyHours: "40",
    availability: "Available",
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);

  const specialties = [
    "Triage Doctor",
    "Internal Medicine",
    "G. Surgery",
    "Cardiology",
    "Neurology",
  ];
  const levels = ["Junior", "Mid-Level", "Senior", "Specialist", "Consultant"];
  // const shifts = ["Morning", "Evening", "Night", "Weekend"];
  // const availabilityOptions = ["Available", "Busy", "On Break", "Off Duty"];

  const handleSave = () => {
    console.log("Saving doctor data:", doctorData);
    console.log("Saving shift data:", shiftData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      console.log("Deleting doctor with ID:", id);
      navigate("/doctors");
    }
  };

  const handleInputChange = (field, value) => {
    setDoctorData((prev) => ({ ...prev, [field]: value }));
  };

  // const handleShiftChange = (field, value) => {
  //   setShiftData((prev) => ({ ...prev, [field]: value }));
  // };

  return (
    <div className='doctor-details-page'>
      <div className='doctor-details-content'>
        <div className='doctor-details-header'>
          <h1 className='doctor-details-title'>Doctor Details</h1>
          <button onClick={() => navigate("/doctors")} className='back-btn'>
            ← Back to Doctors
          </button>
        </div>
        <div className='doctor-details-card'>
          <div className='tabs-container'>
            <button
              onClick={() => setActiveTab("basic")}
              className={`tab-btn ${activeTab === "basic" ? "active" : ""}`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab("shift")}
              className={`tab-btn ${activeTab === "shift" ? "active" : ""}`}
            >
              Doctor Shift
            </button>
          </div>
          <div className='tab-content'>
            {activeTab === "basic" && (
              <div>
                <div className='info-section'>
                  <h3 className='section-title'>Personal Info</h3>
                  <div className='personal-info'>
                    <div className='info-item'>
                      <label className='input-label'>Name:</label>
                      <input
                        type='text'
                        value={doctorData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        readOnly={!isEditing}
                        className={`input-field ${
                          !isEditing ? "readonly" : ""
                        }`}
                      />
                    </div>
                    <div className='info-item'>
                      <label className='input-label'>User Name:</label>
                      <input
                        type='text'
                        value={doctorData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        readOnly={!isEditing}
                        className={`input-field ${
                          !isEditing ? "readonly" : ""
                        }`}
                      />
                    </div>
                    <div className='info-item'>
                      <label className='input-label'>Speciality:</label>
                      <input
                        type='text'
                        value={doctorData.specialty}
                        readOnly={!isEditing}
                        className={`input-field dropdown-input ${
                          !isEditing ? "readonly" : ""
                        }`}
                        onClick={() =>
                          isEditing && setIsSpecialtyOpen(!isSpecialtyOpen)
                        }
                      />
                      <div
                        className={`dropdown-display ${
                          isSpecialtyOpen ? "open" : ""
                        }`}
                      >
                        {specialties.map((specialty) => (
                          <div
                            key={specialty}
                            onClick={() => {
                              if (isEditing) {
                                handleInputChange("specialty", specialty);
                                setIsSpecialtyOpen(false);
                              }
                            }}
                            className={`dropdown-option ${
                              doctorData.specialty === specialty
                                ? "selected"
                                : ""
                            } ${!isEditing ? "disabled" : ""}`}
                          >
                            {specialty}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='info-item'>
                      <label className='input-label'>Level:</label>
                      <input
                        type='text'
                        value={doctorData.level}
                        readOnly={!isEditing}
                        className={`input-field dropdown-input ${
                          !isEditing ? "readonly" : ""
                        }`}
                        onClick={() =>
                          isEditing && setIsLevelOpen(!isLevelOpen)
                        }
                      />
                      <div
                        className={`dropdown-display ${
                          isLevelOpen ? "open" : ""
                        }`}
                      >
                        {levels.map((level) => (
                          <div
                            key={level}
                            onClick={() => {
                              if (isEditing) {
                                handleInputChange("level", level);
                                setIsLevelOpen(false);
                              }
                            }}
                            className={`dropdown-option ${
                              doctorData.level === level ? "selected" : ""
                            } ${!isEditing ? "disabled" : ""}`}
                          >
                            {level}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='info-section'>
                  <h3 className='section-title'>Status</h3>
                  <div className='status-toggle-group'>
                    <button
                      onClick={() =>
                        isEditing && handleInputChange("status", "online")
                      }
                      disabled={!isEditing}
                      className={`status-toggle-btn ${
                        doctorData.status === "online" ? "active online" : ""
                      }`}
                    >
                      Online
                    </button>
                    <button
                      onClick={() =>
                        isEditing && handleInputChange("status", "offline")
                      }
                      disabled={!isEditing}
                      className={`status-toggle-btn ${
                        doctorData.status === "offline" ? "active offline" : ""
                      }`}
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
                      {isEditing ? "Cancel Edit" : "Edit Doctor"}
                    </button>
                  </div>
                  <div className='delete-button'>
                    <button className='btn-delete' onClick={handleDelete}>
                      Delete Doctor
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "shift" && (
              <div className='timeline-container'>
                <div className='timeline-vertical-line'></div>
                <div className='timeline-circle top'></div>
                <div className='timeline-row left'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Doctor Logged-in</span>
                      <img src='/f1.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>At 07:06 PM</p>
                      <p>By: Dr Register Patient</p>
                    </div>
                  </div>
                </div>

                <div className='timeline-row right'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Registered Animal Exam</span>
                      <img src='/f2.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>At 07:30 PM</p>
                      <p>By: Dr Register Patient</p>
                      <p>Patient: Zink</p>
                      <span
                        className='custom-link'
                        onClick={() => alert("View details (simulated)")}
                      >
                        View
                      </span>
                    </div>
                  </div>
                </div>

                <div className='timeline-row right'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Dr Received Patient</span>
                      <img src='/f3.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>At 07:35 PM</p>
                      <p>By: Dr Register Patient</p>
                      <span
                        className='custom-link'
                        onClick={() => alert("View details (simulated)")}
                      >
                        View
                      </span>
                    </div>
                  </div>
                </div>

                <div className='timeline-row right'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Dr Assigned Patient</span>
                      <img src='/f4.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>At 07:33 PM</p>
                      <p>By: Dr Register Patient</p>
                      <p>Patient: Stella</p>
                      <p>
                        To: Earth Animal - Quartz
                        <span
                          className='custom-link'
                          onClick={() =>
                            alert("Decline assignment (simulated)")
                          }
                        >
                          Decline
                        </span>
                        <span
                          className='custom-link'
                          onClick={() => alert("Change assignment (simulated)")}
                        >
                          Change
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className='timeline-row left'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Dr End Patient Visit</span>
                      <img src='/f5.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>At 08:38 PM</p>
                      <p>By: Dr Register Patient</p>
                      <span
                        className='custom-link'
                        onClick={() => alert("View details (simulated)")}
                      >
                        View
                      </span>
                    </div>
                  </div>
                </div>

                <div className='timeline-row right'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Doctor Logged-out</span>
                      <img src='/f6.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>At 08:38 PM</p>
                      <p>By: Dr Register Patient</p>
                      <span
                        className='custom-link'
                        onClick={() => alert("View details (simulated)")}
                      >
                        View
                      </span>
                    </div>
                  </div>
                </div>

                <div className='timeline-row right'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Patient Outcome</span>
                      <img src='/f7.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>Discharged</p>
                      <p>At 08:38 PM</p>
                      <p>By: Dr Register Patient</p>
                      <p>Notes: Stable Condition</p>
                      <span
                        className='custom-link'
                        onClick={() => alert("View details (simulated)")}
                      >
                        View
                      </span>
                    </div>
                  </div>
                </div>
                <div className='timeline-circle bottom'></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
