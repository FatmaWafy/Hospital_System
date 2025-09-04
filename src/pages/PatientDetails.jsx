import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./PatientDetails.css";

// المودالات
import DeclineModal from "../components/DeclineModal";
import ChangeDoctorModal from "../components/ChangeDoctorModal";
import ChangePatientStatusModal from "../components/ChangePatientStatusModal";
import DeleteModal from "../components/DeleteModal";
const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedStatus = queryParams.get("status");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  // Modal states
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const [isChangeDoctorOpen, setIsChangeDoctorOpen] = useState(false);
  const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  // بيانات الأحداث الخاصة بالـ Patient Flow
  const [timelineEvents, setTimelineEvents] = useState([
    {
      id: 1,
      time: "07:00 PM",
      title: "Patient Registered",
      icon: "/f1.svg",
      by: "Ahmed Safwat",
      assignedTo: "Mina Samir",
      type: "registration"
    },
    {
      id: 2,
      time: "07:30 PM",
      title: "Patient Received",
      icon: "/f2.svg",
      by: "Mina Samir",
      type: "receive"
    },
    {
      id: 3,
      time: "07:33 PM",
      title: "Patient Assigned",
      icon: "/f3.svg",
      by: "Mina Samir",
      to: "Abubakr Ahmed",
      type: "assignment"
    },
    {
      id: 4,
      time: "07:33 PM",
      title: "Patient Consulted",
      icon: "/f4.svg",
      by: "Mina Samir",
      to: "Sami Ahmed",
      specialty: "Cardiology",
      type: "consultation"
    },
    {
      id: 5,
      time: "09:35 PM",
      title: "Patient's fate",
      icon: "/f5.svg",
      by: "Mina Samir",
      status: "Outpatient",
      notes: "-",
      type: "outcome"
    }
  ]);

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

  const genders = ["Male", "Female"];

  // حساب الأحداث المعروضة حالياً
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = timelineEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(timelineEvents.length / eventsPerPage);

  const handleSave = () => {
    console.log("Saving patient data:", patient);
    setIsEditing(false);
  };

  const handleDeletePatient = () => {
    setIsDeleteModalOpen(false);
    // Optionally: call API or notify parent to remove patient
    navigate("/patients");
  };

  const handleInputChange = (field, value) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
  };

  // تحديد الإجراءات بناءً على نوع الحدث
  const getEventActions = (eventType) => {
    switch (eventType) {
      case "registration":
        return ["view", "changeDoctor"];
      case "assignment":
      case "consultation":
        return ["decline", "changeDoctor"];
      case "receive":
        return ["view"];
      case "outcome":
        return ["view", "changeStatus"];
      default:
        return [];
    }
  };

  // Action Click
  const handleActionClick = (event, action) => {
    setSelectedEvent(event);

    if (action === "decline") {
      setIsDeclineOpen(true);
    } else if (action === "changeDoctor") {
      setIsChangeDoctorOpen(true);
    } else if (action === "changeStatus") {
      setIsChangeStatusOpen(true);
    } else if (action === "view") {
      alert(`Viewing details for event ${event.id}`);
    }
  };

  // تغيير الصفحة
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
                <h3 className='profile-title'>Personal Info</h3>
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
                      className={`input-field dropdown-input ${!isEditing ? "readonly" : ""
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
                          className={`dropdown-option ${patient.gender === gender ? "selected" : ""
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
                      className={`status-pill ${s} ${patient.status === s ? "active" : ""
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
                  <button className='btn-delete' onClick={() => setIsDeleteModalOpen(true)}>
                    Delete Patient
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "flow" && (
            <div className="timeline-section">
              <div className="timeline-container">
                <div className="timeline-vertical-line" />
                <div className="timeline-circle top" />

                {currentEvents.map((event) => (
                  <div key={event.id} className="timeline-row right">
                    <div className="time-label">At {event.time}</div>

                    <div className="timeline-card">
                      <div className="card-header">
                        <span className="card-title">
                          {event.title}
                        </span>
                        <img src={event.icon} alt="Icon" className="card-icon" />
                      </div>

                      <div className="card-body">
                        {event.by && <span className="inline-meta">By: {event.by}</span>}
                        {event.to && (
                          <span className="inline-meta"> <br />To: {event.to}</span>
                        )}
                        {event.assignedTo && (
                          <span className="inline-meta"> <br />Assigned to: {event.assignedTo}</span>
                        )}
                        {event.specialty && (
                          <span className="inline-meta"> <br />Specialty: {event.specialty}</span>
                        )}
                        {event.status && (
                          <span className="inline-meta"> <br />{event.status}</span>
                        )}
                        {event.notes &&
                          <span className="inline-meta"><br /> Notes: {event.notes}</span>}

                        <div className="card-actions">
                          {getEventActions(event.type).map((action) => (
                            <span
                              key={action}
                              className={action === "view" ? "custom-link" : "change-link"}
                              onClick={() => handleActionClick(event, action)}
                            >
                              {action === "changeDoctor"
                                ? "Change"
                                : action === "changeStatus"
                                  ? "Change"
                                  : action.charAt(0).toUpperCase() + action.slice(1)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="timeline-circle bottom" />
              </div>

              {/* Pagination Controls */}
              {timelineEvents.length > eventsPerPage && (
                <div className="pagination-controls">
                  <button
                    className="pagination-btn"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ←
                  </button>
                  <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="pagination-btn"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* المودالات */}
      <DeclineModal
        isOpen={isDeclineOpen}
        onClose={() => setIsDeclineOpen(false)}
        onConfirm={() => {
          console.log("Declined:", selectedEvent);
          setIsDeclineOpen(false);
        }}
        itemType="Request"
      />

      <ChangeDoctorModal
        isOpen={isChangeDoctorOpen}
        onClose={() => setIsChangeDoctorOpen(false)}
        onConfirm={(doctor) => {
          console.log("Doctor changed to:", doctor);
          setIsChangeDoctorOpen(false);
        }}
        currentDoctor={{ id: 0, name: "Current Doctor" }}
      />

      <ChangePatientStatusModal
        isOpen={isChangeStatusOpen}
        onClose={() => setIsChangeStatusOpen(false)}
        onConfirm={({ status, notes }) => {
          if (selectedEvent) {
            setTimelineEvents((prevEvents) =>
              prevEvents.map((event) =>
                event.id === selectedEvent.id
                  ? { ...event, status, notes } // ✅ تحديث الحالة والنوتس
                  : event
              )
            );
          }
          setIsChangeStatusOpen(false);
        }}
        currentStatus={selectedEvent?.status || "N/A"}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePatient}
        itemType="patient"
      />
    </div>
  );
};

export default PatientDetails;
