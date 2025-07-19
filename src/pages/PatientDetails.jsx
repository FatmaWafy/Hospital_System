import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./PatientDetails.css";

const PatientDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedStatus = queryParams.get("status");

  const [isEditing, setIsEditing] = useState(false);

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

  // Dummy fetched patient data
  const patient = {
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
  };

  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className='patient-details-page'>
      <h1 className='page-header'>Patient Details</h1>

      <div className='tabs'>
        <button
          className={`tab-btn ${activeTab === "basic" ? "active" : ""}`}
          onClick={() => setActiveTab("basic")}
        >
          Basic Info
        </button>
        <button
          className={`tab-btn ${activeTab === "flow" ? "active" : ""}`}
          onClick={() => setActiveTab("flow")}
        >
          Patient Flow
        </button>
      </div>

      {activeTab === "basic" && (
        <div className='basic-info-section'>
          <h2 className='section-title'>Personal Info</h2>

          <div className='personal-info-grid'>
            <div className='info-item'>
              <label>Name:</label>
              <input type='text' value={patient.name} readOnly />
            </div>
            <div className='info-item'>
              <label>Age:</label>
              <input type='text' value={patient.age} readOnly />
            </div>
            <div className='info-item'>
              <label>Gender:</label>
              <div className='gender-buttons'>
                <button
                  className={`gender-btn ${
                    patient.gender === "Male" ? "active" : ""
                  }`}
                >
                  ♂ Male
                </button>
                <button
                  className={`gender-btn ${
                    patient.gender === "Female" ? "active" : ""
                  }`}
                >
                  ♀ Female
                </button>
              </div>
            </div>
            <div className='info-item'>
              <label>Complaint:</label>
              <input type='text' value={patient.complaint} readOnly />
            </div>
            <div className='info-item'>
              <label>Speciality:</label>
              <input type='text' value={patient.speciality} readOnly />
            </div>
            <div className='info-item'>
              <label>Past Hx:</label>
              <input type='text' value={patient.pastHx} readOnly />
            </div>
            <div className='info-item'>
              <label>Ticket's no.:</label>
              <input type='text' value={patient.ticketNo} readOnly />
            </div>
          </div>

          <h2 className='section-title'>Vital Data</h2>
          <div className='vital-data-row'>
            {Object.entries(patient.vitals).map(([key, value]) => (
              <div className='vital-item' key={key}>
                <span className='vital-label'>{key}</span>
                <span className='vital-value'>{value}</span>
              </div>
            ))}
          </div>

          <h2 className='section-title'>Status</h2>
          <div className='status-row'>
            {["critical", "urgent", "moderate", "cold"].map((s) => (
              <div
                key={s}
                className={`status-pill ${s} ${
                  patient.status === s ? "active" : ""
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </div>
            ))}
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

      {activeTab === "flow" && (
        <div className='timeline-container'>
          <div className='timeline-vertical-line'></div>

          <div className='timeline-circle top'></div>

          <div className='timeline-row left'>
            <div className='timeline-connector'></div>
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
                    onClick={() => alert("Change assigned doctor (simulated)")}
                  >
                    change
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className='timeline-row right'>
            <div className='timeline-connector'></div>
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
            <div className='timeline-connector'></div>
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
                    onClick={() => alert("Decline action (simulated)")}
                  >
                    Decline
                  </span>
                </p>
                <p>
                  To: Abubakr Ahmed{" "}
                  <span
                    className='change-link'
                    onClick={() => alert("Change assigned doctor (simulated)")}
                  >
                    change
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className='timeline-row left'>
            <div className='timeline-connector'></div>
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
                    onClick={() => alert("Decline action (simulated)")}
                  >
                    Decline
                  </span>
                </p>
                <p>
                  To: Sami Ahmed{" "}
                  <span
                    className='change-link'
                    onClick={() => alert("Change assigned doctor (simulated)")}
                  >
                    change
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className='timeline-row right'>
            <div className='timeline-connector'></div>
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
                    onClick={() => alert("Change patient fate (simulated)")}
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
  );
};

export default PatientDetails;
