import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DoctorDetails.css";
import DeclineModal from "../components/DeclineModal";
import ChangeDoctorModal from "../components/ChangeDoctorModal"; // <--- تم إضافة استيراد المودال
import DeleteModal from "../components/DeleteModal";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

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
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isChangeDoctorModalOpen, setIsChangeDoctorModalOpen] = useState(false); // <--- إضافة state للمودال

  const specialties = [
    "Triage Doctor",
    "Internal Medicine",
    "G. Surgery",
    "Cardiology",
    "Neurology",
  ];
  const levels = ["Junior", "Mid-Level", "Senior", "Specialist", "Consultant"];

  const [timelineEvents, setTimelineEvents] = useState([
    {
      id: 7,
      time: "05:50 PM",
      title: "Doctor Logged-in",
      icon: "/f1.svg",
      type: "login",
    },
    {
      id: 6,
      time: "06:00 PM",
      title: "Dr Register Patient",
      icon: "/f2.svg",
      patient: "Ahmed Essam",
      type: "registration",
    },
    {
      id: 5,
      time: "06:10 PM",
      title: "Dr Received Patient",
      icon: "/f3.svg",
      type: "receive",
    },
    {
      id: 4,
      time: "06:30 PM",
      title: "Dr Assigned Patient",
      icon: "/f4.svg",
      to: "Sami Ahmed",
      type: "assignment",
    },
    {
      id: 3,
      time: "06:40 PM",
      title: "Ask for Consultation",
      icon: "/f4.svg",
      to: "Sami Ahmed",
      type: "consultation",
    },
    {
      id: 2,
      time: "06:55 PM",
      title: "Dr End Patient Visit",
      icon: "/f5.svg",
      type: "end",
    },
    {
      id: 1,
      time: "07:00 PM",
      title: "Doctor Logged-out",
      icon: "/f6.svg",
      type: "logout",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 7;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = timelineEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(timelineEvents.length / eventsPerPage);

  const handleSave = () => {
    console.log("Saving doctor data:", doctorData);
    setIsEditing(false);
  };

  const handleDeleteClick = (doctor) => {
    setDoctorToDelete(doctor);
    setIsDeleteModalOpen(true);
  };

const handleDeleteDoctor = () => {
  setIsDeleteModalOpen(false);
  setDoctorToDelete(null);
  // Optionally: call API or notify parent to remove doctor
  navigate("/doctors");
};

  const handleInputChange = (field, value) => {
    setDoctorData((prev) => ({ ...prev, [field]: value }));
  };

  // دوال التعامل مع المودالات
  const handleDeclineClick = (eventId) => {
    console.log(`Decline clicked for event ${eventId}`);
    setIsDeclineModalOpen(true);
  };

  const handleDeclineConfirm = () => {
    console.log("Confirmed decline action");
    // هنا ستضع الكود الخاص بالتعامل مع رفض الطلب
    setIsDeclineModalOpen(false);
  };

  const handleChangeDoctorClick = () => { // <--- إضافة دالة فتح مودال التغيير
    setIsChangeDoctorModalOpen(true);
  };

  const handleConfirmChangeDoctor = (newDoctor) => { // <--- إضافة دالة التأكيد
    console.log("Saving new doctor:", newDoctor);
    // هنا ستضع الكود الخاص بتحديث الطبيب
    setIsChangeDoctorModalOpen(false);
  };

  const handleActionClick = (eventId, action) => {
    console.log(`Action ${action} clicked for event ${eventId}`);
    if (action === "change") { // <--- تعديل الدالة لتفتح المودال
      handleChangeDoctorClick();
    }
    // يمكنك إضافة شروط أخرى هنا لأفعال أخرى
  };

  const getEventActions = (eventType) => {
    switch (eventType) {
      case "registration":
        return ["view"];
      case "assignment":
      case "consultation":
        return ["decline", "change"];
      case "receive":
      case "end":
      case "logout":
      case "login":
      default:
        return [];
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="doctor-details-page">
      <div className="doctor-details-content">
        <div className="doctor-details-header">
          <h1 className="doctor-details-title">Doctor Details</h1>
          <button onClick={() => navigate("/doctors")} className="back-btn">
            ← Back to Doctors
          </button>
        </div>

        <div className="tabs-container">
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

        <div className="tab-content">
          {activeTab === "basic" && (
            <div>
              <div className="info-section">
                <h3 className="section-title">Personal Info</h3>
                <div className="personal-info">
                  <div className="info-item">
                    <label className="input-label">Name:</label>
                    <input
                      type="text"
                      value={doctorData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      readOnly={!isEditing}
                      className={`input-field ${!isEditing ? "readonly" : ""}`}
                    />
                  </div>

                  <div className="info-item">
                    <label className="input-label">User Name:</label>
                    <input
                      type="text"
                      value={doctorData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      readOnly={!isEditing}
                      className={`input-field ${!isEditing ? "readonly" : ""}`}
                    />
                  </div>

                  <div className="info-item">
                    <label className="input-label">Speciality:</label>
                    <input
                      type="text"
                      value={doctorData.specialty}
                      readOnly={!isEditing}
                      className={`input-field dropdown-input ${!isEditing ? "readonly" : ""
                        }`}
                      onClick={() =>
                        isEditing && setIsSpecialtyOpen(!isSpecialtyOpen)
                      }
                    />
                    <div
                      className={`dropdown-display ${isSpecialtyOpen ? "open" : ""}`}
                    >
                      {specialties.map((s) => (
                        <div
                          key={s}
                          onClick={() => {
                            if (isEditing) {
                              handleInputChange("specialty", s);
                              setIsSpecialtyOpen(false);
                            }
                          }}
                          className={`dropdown-option ${doctorData.specialty === s ? "selected" : ""} ${!isEditing ? "disabled" : ""}`}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="info-item">
                    <label className="input-label">Level:</label>
                    <input
                      type="text"
                      value={doctorData.level}
                      readOnly={!isEditing}
                      className={`input-field dropdown-input ${!isEditing ? "readonly" : ""
                        }`}
                      onClick={() => isEditing && setIsLevelOpen(!isLevelOpen)}
                    />
                    <div
                      className={`dropdown-display ${isLevelOpen ? "open" : ""}`}
                    >
                      {levels.map((lvl) => (
                        <div
                          key={lvl}
                          onClick={() => {
                            if (isEditing) {
                              handleInputChange("level", lvl);
                              setIsLevelOpen(false);
                            }
                          }}
                          className={`dropdown-option ${doctorData.level === lvl ? "selected" : ""} ${!isEditing ? "disabled" : ""}`}
                        >
                          {lvl}
                        </div>
                      ))}
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

              <div className="action-buttons-group">
                <div className="save-edit-buttons">
                  <button className="btn-save" onClick={handleSave} disabled={!isEditing}>
                    Save
                  </button>
                  <button className="btn-edit" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Cancel Edit" : "Edit Doctor"}
                  </button>
                </div>
                <div className="delete-button">
                  <button className="btn-delete" onClick={() => handleDeleteClick(doctorData)}>
                    Delete Doctor
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "shift" && (
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
                          {event.to && (
                            <span className="inline-meta"> <br />To: {event.to}</span>
                          )}
                          {event.patient && (
                            <span className="inline-meta"> Registered {event.patient}</span>
                          )}
                        </span>
                        <img src={event.icon} alt="Icon" className="card-icon" />
                      </div>

                      <div className="card-body">
                        <div className="card-actions">
                          {getEventActions(event.type).includes("view") && (
                            <span
                              className="custom-link"
                              onClick={() => handleActionClick(event.id, "view")}
                            >
                              View
                            </span>
                          )}

                          {getEventActions(event.type).includes("decline") && (
                            <span
                              className="change-link"
                              onClick={() => handleDeclineClick(event.id)}
                            >
                              Decline
                            </span>
                          )}

                          {getEventActions(event.type).includes("change") && (
                            <span
                              className="change-link"
                              onClick={() => handleActionClick(event.id, "change")}
                            >
                              Change
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="timeline-circle bottom" />
              </div>

              {/* Pagination Controls - سيظهر فقط إذا كان هناك أكثر من 7 أحداث */}
              {timelineEvents.length > 7 && (
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
      {/* هنا يتم إضافة المودالات في نهاية الكومبوننت */}
      <DeclineModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        onConfirm={handleDeclineConfirm}
        itemType=" Request"
      />
      <ChangeDoctorModal
        isOpen={isChangeDoctorModalOpen}
        onClose={() => setIsChangeDoctorModalOpen(false)}
        onConfirm={handleConfirmChangeDoctor}
        // يمكن تمرير معلومات الطبيب هنا إذا لزم الأمر
        currentDoctor={{ id: doctorData.id, name: doctorData.name }}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDoctorToDelete(null);
        }}
        onConfirm={handleDeleteDoctor}
        itemType="doctor"
      />
    </div>
  );
};

export default DoctorDetails;