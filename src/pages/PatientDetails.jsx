import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./PatientDetails.css";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedStatus = queryParams.get("status");

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log("Saving patient data:", patient);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      console.log("Deleting patient with ID:", id);
      navigate("/patients");
    }
  };

  // Dummy fetched patient data
  const [patient, setPatient] = useState({
    name: `Patient ${id}`,
    age: 45,
    gender: "Male",
    complaint: "Chest Pain",
    speciality: "Cardiology",
    pastHx: "Hypertension",
    ticketNo: `TCK-${id}`,
    vitals: {
      BP: "120/80",
      Pulse: "78",
      Temp: "36.8°C",
      RR: "16",
      "O2 Sat.": "98%",
      RBS: "110 mg/dl",
    },
    status: selectedStatus || "urgent",
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const genders = ["Male", "Female"];

  const handleInputChange = (field, value) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className='patient-details-page'>
      <div className='doctor-details-content'>
        <div className='doctor-details-header'>
          <h1 className='doctor-details-title'>Patient Details</h1>
          <button onClick={() => navigate("/patients")} className='back-btn'>
            ← Back to Patients
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
              onClick={() => setActiveTab("flow")}
              className={`tab-btn ${activeTab === "flow" ? "active" : ""}`}
            >
              Patient Flow
            </button>
          </div>
          <div className='tab-content'>
            {activeTab === "basic" && (
              <div>
                <div className='info-section'>
                  <h3 className='section-title'>Personal Info</h3>
                  <div className='personal-info-grid'>
                    <div className='info-item'>
                      <label className='input-label'>Name:</label>
                      <input
                        type='text'
                        value={patient.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        readOnly={!isEditing}
                        className={`input-field ${!isEditing ? "readonly" : ""}`}
                      />
                    </div>
                    <div className='info-item'>
                      <label className='input-label'>Age:</label>
                      <input
                        type='text'
                        value={patient.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        readOnly={!isEditing}
                        className={`input-field ${!isEditing ? "readonly" : ""}`}
                      />
                    </div>
                    <div className='info-item'>
                      <label className='input-label'>Gender:</label>
                      <input
                        type='text'
                        value={patient.gender}
                        readOnly={!isEditing}
                        className={`input-field dropdown-input ${
                          !isEditing ? "readonly" : ""
                        }`}
                        onClick={() => isEditing && setIsGenderOpen(!isGenderOpen)}
                      />
                      <div className={`dropdown-display ${isGenderOpen ? "open" : ""}`}>
                        {genders.map((gender) => (
                          <div
                            key={gender}
                            onClick={() => {
                              if (isEditing) {
                                handleInputChange("gender", gender);
                                setIsGenderOpen(false);
                              }
                            }}
                            className={`dropdown-option ${
                              patient.gender === gender ? "selected" : ""
                            } ${!isEditing ? "disabled" : ""}`}
                          >
                            {gender}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='info-item'>
                      <label className='input-label'>Complaint:</label>
                      <input
                        type='text'
                        value={patient.complaint}
                        onChange={(e) =>
                          handleInputChange("complaint", e.target.value)
                        }
                        readOnly={!isEditing}
                        className={`input-field ${!isEditing ? "readonly" : ""}`}
                      />
                    </div>
                    <div className='info-item'>
                      <label className='input-label'>Speciality:</label>
                      <input
                        type='text'
                        value={patient.speciality}
                        onChange={(e) =>
                          handleInputChange("speciality", e.target.value)
                        }
                        readOnly={!isEditing}
                        className={`input-field ${!isEditing ? "readonly" : ""}`}
                      />
                    </div>
                    <div className='info-item'>
                      <label className='input-label'>Past Hx:</label>
                      <input
                        type='text'
                        value={patient.pastHx}
                        onChange={(e) => handleInputChange("pastHx", e.target.value)}
                        readOnly={!isEditing}
                        className={`input-field ${!isEditing ? "readonly" : ""}`}
                      />
                    </div>
                    <div className='info-item'>
                      <label className='input-label'>Ticket's no.:</label>
                      <input
                        type='text'
                        value={patient.ticketNo}
                        onChange={(e) =>
                          handleInputChange("ticketNo", e.target.value)
                        }
                        readOnly={!isEditing}
                        className={`input-field ${!isEditing ? "readonly" : ""}`}
                      />
                    </div>
                  </div>
                </div>
                <div className='info-section'>
                  <h3 className='section-title'>Vital Data</h3>
                  <div className='vital-data-row'>
                    {Object.entries(patient.vitals).map(([key, value]) => (
                      <div className='vital-item' key={key}>
                        <span className='vital-label'>{key}</span>
                        <span className='vital-value'>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='info-section'>
                  <h3 className='section-title'>Status</h3>
                  <div className='status-row'>
                    {["critical", "urgent", "moderate", "cold"].map((s) => (
                      <div
                        key={s}
                        className={`status-pill ${s} ${
                          patient.status === s ? "active" : ""
                        } ${isEditing ? "editable" : ""}`}
                        onClick={() =>
                          isEditing && handleInputChange("status", s)
                        }
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                        {patient.status === s && <div className="underline"></div>}
                      </div>
                    ))}
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
                      {isEditing ? "Cancel Edit" : "Edit Patient"}
                    </button>
                  </div>
                  <div className='delete-button'>
                    <button className='btn-delete' onClick={handleDelete}>
                      Delete Patient
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "flow" && (
              <div className='timeline-container'>
                <div className='timeline-vertical-line'></div>
                <div className='timeline-circle top'></div>
                <div className='timeline-row left'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Patient Registered</span>
                      <img src='/f1.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>at 07:00 PM</p>
                      <p>By: Ahmed Safwat</p>
                      <p>
                        Assigned to: Mina Samir{" "}
                        <span
                          className='change-link'
                          onClick={() =>
                            alert("Change assigned doctor (simulated)")
                          }
                        >
                          change
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='timeline-row right'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Patient Received</span>
                      <img src='/f2.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>at 07:30 PM</p>
                      <p>By: Mina Samir</p>
                    </div>
                  </div>
                </div>
                <div className='timeline-row right'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Patient Assigned</span>
                      <img src='/f3.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>at 07:33 PM</p>
                      <p>
                        By: Mina Samir{" "}
                        <span
                          className='change-link'
                          onClick={() =>
                            alert("Decline action (simulated)")
                          }
                        >
                          Decline
                        </span>
                      </p>
                      <p>
                        To: Abubakr Ahmed{" "}
                        <span
                          className='change-link'
                          onClick={() =>
                            alert("Change assigned doctor (simulated)")
                          }
                        >
                          change
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='timeline-row left'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Patient Consulted</span>
                      <img src='/f4.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>at 07:33 PM</p>
                      <p>
                        By: Mina Samir{" "}
                        <span
                          className='change-link'
                          onClick={() =>
                            alert("Decline action (simulated)")
                          }
                        >
                          Decline
                        </span>
                      </p>
                      <p>
                        To: Sami Ahmed{" "}
                        <span
                          className='change-link'
                          onClick={() =>
                            alert("Change assigned doctor (simulated)")
                          }
                        >
                          change
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='timeline-row right'>
                  <div className='timeline-card'>
                    <div className='card-header'>
                      <span className='card-title'>Patient’s fate</span>
                      <img src='/f5.svg' alt='Icon' className='card-icon' />
                    </div>
                    <div className='card-body'>
                      <p>
                        Outpatient{" "}
                        <span
                          className='change-link'
                          onClick={() =>
                            alert("Change patient fate (simulated)")
                          }
                        >
                          change
                        </span>
                      </p>
                      <p>at 09:35 PM</p>
                      <p>By: Mina Samir</p>
                      <p>Notes: -</p>
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

export default PatientDetails;
























