import React, { useEffect, useState } from "react";
import "./Settings.css";
import DeleteModal from "../components/DeleteModal";
import AddSpecialtyModal from "../components/AddSpecialtyModal";
import EditSpecialtyModal from "../components/EditSpecialtyModal";
import {
  LuChevronLeft,
  LuChevronRight,
  LuEye,
  LuFileEdit,
  LuPrinter,
  LuSearch,
  LuTrash2,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import ViewModal from "../components/ViewModal";
import FeedbackTab from "../components/FeedbackTab"

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [addPatients, setAddPatients] = useState(true);
  const [allowAssign, setAllowAssign] = useState(true);
  const [allowConsult, setAllowConsult] = useState(false);
  const [allowChangeStatus, setAllowChangeStatus] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [doctorCurrentPage, setDoctorCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(null);
  const doctorItemsPerPage = 10;
  const [userData, setUserData] = useState({
    name: "Ahmed Safwat Mohamed",
    jobTitle: "Er Manager",
    email: "i.asafwat@gmail.com",
    phone: "0123456789",
    photo: "avatar.svg",
    password: "*****", // Added password field
  });
  const [specialties, setSpecialties] = useState(
    Array.from({ length: 50 }).map((_, i) => ({
      id: i + 1,
      name: `Specialty ${i + 1}`,
      addedBy: "Ahmed Safwat",
      date: "27/08/2025",
      status: i % 2 === 0 ? "Enabled" : "Disabled",
    }))
  );
  const [doctors, setDoctors] = useState(
    Array.from({ length: 50 }).map((_, i) => ({
      id: i + 1,
      name: `Dr. ${i + 1}`,
      specialty: `Specialty ${(i % 5) + 1}`,
      level: i % 2 === 0 ? "Junior" : "Senior",
      loginDate: "11/5/2025",
      status: i % 2 === 0 ? "online" : "offline",
    }))
  );
  const [feedbackData, setFeedbackData] = useState([
    { id: 1, date: "2025-08-31", name: "Ahmed Ali", feedback: "Great service, very helpful!" },
    { id: 2, date: "2025-08-30", name: "Sara Mohamed", feedback: "Need improvement in response time." },
    // Add more dummy data if needed
  ]);

  // Handling Functions
  const handleSave = () => {
    console.log("Saving user data:", userData);
    setIsEditing(false);
    console.log(setDoctors);
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

  const handleAddSpecialty = (newName, status) => {
    const newSpecialty = {
      id: specialties.length + 1,
      name: newName,
      addedBy: "Ahmed Safwat",
      date: "27/08/2025",
      status,
    };
    setSpecialties([...specialties, newSpecialty]);
    setIsAddModalOpen(false);
  };

  const handleEditSpecialty = (updated) => {
    const updatedSpecialties = specialties.map((s) =>
      s.id === updated.id ? updated : s
    );
    setSpecialties(updatedSpecialties);
    setIsEditModalOpen(false);
  };

  const handleDeleteSpecialty = () => {
    const filtered = specialties.filter((s) => s.id !== selectedSpecialty.id);
    setSpecialties(filtered);
    setIsDeleteModalOpen(false);
    setSelectedSpecialty(null);
  };

  const handleDeleteDoctor = () => {
    if (selectedDoctor) {
      const filtered = doctors.filter((d) => d.id !== selectedDoctor.id);
      setDoctors(filtered);
      // Placeholder: fetch(`/api/doctors/${selectedDoctor.id}`, { method: 'DELETE' })
      setIsDeleteModalOpen(false);
      setSelectedDoctor(null);
    }
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSavePermissions = () => {
    const permissions = {
      addPatients,
      allowAssign,
      allowConsult,
      allowChangeStatus,
    };
    // Placeholder: fetch('/api/permissions', { method: 'POST', body: JSON.stringify(permissions) })
    console.log("Saving permissions:", permissions);
  };

  const handleSendNotification = () => {
    if (notificationMessage) {
      // Placeholder: fetch('/api/notifications', { method: 'POST', body: JSON.stringify({ message: notificationMessage }) })
      console.log("Sending notification:", notificationMessage);
      setNotificationMessage("");
    }
  };

  const handlePrevSpecialty = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextSpecialty = () => {
    if (currentPage < specialtyTotalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevDoctor = () => {
    if (doctorCurrentPage > 1) setDoctorCurrentPage(doctorCurrentPage - 1);
  };

  const handleNextDoctor = () => {
    if (doctorCurrentPage < doctorTotalPages)
      setDoctorCurrentPage(doctorCurrentPage + 1);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteFeedback = (id) => {
    // Placeholder: fetch(`/api/feedback/${id}`, { method: 'DELETE' })
    setFeedbackData(feedbackData.filter((item) => item.id !== id));
    console.log("Deleted feedback ID:", id);
    setIsDeleteModalOpen(false);
  };

  const sortedSpecialties = [...specialties].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredSpecialties = sortedSpecialties.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const specialtyTotalPages = Math.ceil(
    filteredSpecialties.length / itemsPerPage
  );

  const specialtyPageData = filteredSpecialties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const doctorTotalPages = Math.ceil(
    filteredDoctors.length / doctorItemsPerPage
  );

  const doctorPageData = filteredDoctors.slice(
    (doctorCurrentPage - 1) * doctorItemsPerPage,
    doctorCurrentPage * doctorItemsPerPage
  );

  useEffect(() => {
    // Placeholder: fetch('/api/feedback').then(res => setFeedbackData(res))
  }, []);

  return (
    <div className='settings-page'>
      <div className='settings-header'>
        <h1>Settings</h1>
        <a href='/notifications'>
          <img
            src='/notifications.svg'
            alt='Notifications'
            className='notification-icon'
          />
        </a>
      </div>

      <div className='settings-welcome'>
        <div className='welcome-text'>
          <h2>Good morning, ER Admin</h2>
          <p>
            Here is what’s happening with ER Department from May 19 - May 25.
          </p>
        </div>
        <button className='date-range-btn'>
          <span>May 19 - May 25</span>
          <img src='/calendar.svg' alt='Calendar' className='calendar-icon' />
        </button>
      </div>

      <div className='tabs-container'>
        <button
          className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          My Profile
        </button>
        <button
          className={`tab-btn ${activeTab === "specialties" ? "active" : ""}`}
          onClick={() => setActiveTab("specialties")}
        >
          Specialties
        </button>
        <button
          className={`tab-btn ${activeTab === "doctors" ? "active" : ""}`}
          onClick={() => setActiveTab("doctors")}
        >
          Doctors
        </button>
        <button
          className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          Requests & Notifications
        </button>
        <button
          className={`tab-btn ${activeTab === "feedbacks" ? "active" : ""}`}
          onClick={() => setActiveTab("feedbacks")}
        >
          Feed backs
        </button>
      </div>

      <div className='tab-content'>
        {activeTab === "profile" && (
          <div>
            <p className='profile-title'>Personal Info</p>
            <div className='profile-section'>
              <div className='photo-container'>
                <label className='input-label'>Profile Photo:</label>
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
              <div className='personal-info-stack'>
                <div className='info-item'>
                  <label className='input-label'>Name:</label>
                  <input
                    type='text'
                    value={userData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    readOnly={!isEditing}
                    className={`input-field ${!isEditing ? "readonly" : ""}`}
                  />
                </div>
                <div className='info-item'>
                  <label className='input-label'>Job Title:</label>
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
                  <label className='input-label'>Email:</label>
                  <input
                    type='text'
                    value={userData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    readOnly={!isEditing}
                    className={`input-field ${!isEditing ? "readonly" : ""}`}
                  />
                </div>
                <div className='info-item'>
                  <label className='input-label'>Password:</label>
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
                  <label className='input-label'>Phone no.:</label>
                  <input
                    type='text'
                    value={userData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    readOnly={!isEditing}
                    className={`input-field ${!isEditing ? "readonly" : ""}`}
                  />
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
        )}
        {activeTab === "specialties" && (
          <div>
            <div className='hint-container'>
              <p className='hint-text'>
                After adding a new specialty, assign doctors to it from the{" "}
                <Link
                  to='/settings'
                  onClick={() => setActiveTab("doctors")}
                  className='doctors-link'
                >
                  Doctors page
                </Link>
                . <br /> Make sure the specialty status is ENABLED for it to
                appear in the list.
              </p>
              <button
                className='add-btn'
                onClick={() => setIsAddModalOpen(true)}
              >
                + Add New Specialty
              </button>
            </div>
            <div className='specialties-table-section'>
              <div className='list-header'>
                <h2 className='profile-title'>SPECIALTIES LIST</h2>
                <div className='list-actions'>
                  <input
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='search-input'
                  />
                  <LuSearch size={15} className='search-icon' />
                  <button className='print-btn' onClick={handlePrint}>
                    <LuPrinter size={20} />
                  </button>
                </div>
              </div>

              <table className='specialties-table printable-table'>
                <thead>
                  <tr>
                    <th onClick={() => requestSort("id")}>No</th>
                    <th onClick={() => requestSort("name")}>Specialty</th>
                    <th onClick={() => requestSort("addedBy")}>Added By</th>
                    <th onClick={() => requestSort("date")}>Date Added</th>
                    <th onClick={() => requestSort("status")}>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {specialtyPageData.map((s) => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td>{s.name}</td>
                      <td>{s.addedBy}</td>
                      <td>{s.date}</td>
                      <td>
                        <span
                          className={`status-badge ${s.status === "Enabled" ? "online" : "offline"
                            }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className='actions-cell'>
                        <button
                          className='action-btn view-btn'
                          onClick={() => {
                            setSelectedSpecialty(s);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <LuFileEdit size={18} />
                        </button>
                        <button
                          className='action-btn delete-btn'
                          onClick={() => {
                            setSelectedSpecialty(s);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <LuTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className='pagination'>
                <button
                  className='pagination-btn'
                  onClick={handlePrevSpecialty}
                  disabled={currentPage === 1}
                >
                  <LuChevronLeft size={18} />
                </button>
                {Array.from({ length: specialtyTotalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    className={`pagination-page ${currentPage === i + 1 ? "active" : ""
                      }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <span className='pagination-dots'>...</span>
                <button
                  className='pagination-btn'
                  onClick={handleNextSpecialty}
                  disabled={currentPage === specialtyTotalPages}
                >
                  <LuChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "doctors" && (
          <div  >
            <div className='hint-container'>
              <p className='hint-text-doctors'>
                To register a new doctor, enter: Full Name, Email, Phone Number,
                Level, and Specialty.
              </p>
              <button
                className='add-btn'
                onClick={() => navigate("/settings/add-doctor")}
              >
                + Add New Doctor
              </button>
            </div>
            <div className='specialties-table-section'>
              <div className='list-header'>
                <h2 className='profile-title'>DOCTORS LIST</h2>
                <div className='list-actions'>
                  <input
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='search-input'
                  />
                  <LuSearch size={15} className='search-icon' />
                  <button className='print-btn' onClick={handlePrint}>
                    <LuPrinter size={20} />
                  </button>
                </div>
              </div>

              <table className='doctors-table printable-table'>
                <thead>
                  <tr>
                    <th onClick={() => requestSort("id")}>
                      No
                      <span className='sort-arrow'>
                        {sortConfig.key === "id"
                          ? sortConfig.direction === "asc"
                            ? "▲"
                            : "▼"
                          : ""}
                      </span>
                    </th>
                    <th onClick={() => requestSort("name")}>
                      Dr-Name
                      <span className='sort-arrow'>
                        {sortConfig.key === "name"
                          ? sortConfig.direction === "asc"
                            ? "▲"
                            : "▼"
                          : ""}
                      </span>
                    </th>
                    <th onClick={() => requestSort("specialty")}>
                      Specialty
                      <span className='sort-arrow'>
                        {sortConfig.key === "specialty"
                          ? sortConfig.direction === "asc"
                            ? "▲"
                            : "▼"
                          : ""}
                      </span>
                    </th>
                    <th onClick={() => requestSort("level")}>
                      Level
                      <span className='sort-arrow'>
                        {sortConfig.key === "level"
                          ? sortConfig.direction === "asc"
                            ? "▲"
                            : "▼"
                          : ""}
                      </span>
                    </th>
                    <th onClick={() => requestSort("loginDate")}>
                      Last Login Date
                      <span className='sort-arrow'>
                        {sortConfig.key === "loginDate"
                          ? sortConfig.direction === "asc"
                            ? "▲"
                            : "▼"
                          : ""}
                      </span>
                    </th>
                    <th onClick={() => requestSort("status")}>
                      Status
                      <span className='sort-arrow'>
                        {sortConfig.key === "status"
                          ? sortConfig.direction === "asc"
                            ? "▲"
                            : "▼"
                          : ""}
                      </span>
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorPageData.map((d) => (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                      <td>{d.specialty}</td>
                      <td>{d.level}</td>
                      <td>{d.loginDate}</td>
                      <td>
                        <span
                          className={`status-badge ${d.status === "online" ? "online" : "offline"
                            }`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className='actions-cell'>
                        <button
                          className='action-btn view-btn'
                          onClick={() =>
                            navigate(`/settings/edit-doctor/${d.id}`)
                          }
                        >
                          <LuFileEdit size={18} />
                        </button>
                        <button
                          className='action-btn delete-btn'
                          onClick={() => {
                            setSelectedDoctor(d);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <LuTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className='pagination'>
                <button
                  className='pagination-btn'
                  onClick={handlePrevDoctor}
                  disabled={doctorCurrentPage === 1}
                >
                  <LuChevronLeft size={18} />
                </button>
                {Array.from({ length: doctorTotalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    className={`pagination-page ${doctorCurrentPage === i + 1 ? "active" : ""
                      }`}
                    onClick={() => setDoctorCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <span className='pagination-dots'>...</span>
                <button
                  className='pagination-btn'
                  onClick={handleNextDoctor}
                  disabled={doctorCurrentPage === doctorTotalPages}
                >
                  <LuChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "requests" && (
          <div  >
            <p className='profile-title'>Requests</p>
            <div className="permissions-section">
              <label>
                <input
                  type="checkbox"
                  checked={addPatients}
                  onChange={(e) => setAddPatients(e.target.checked)}
                />
                Add New Patients
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={allowAssign}
                  onChange={(e) => setAllowAssign(e.target.checked)}
                />
                Allow Assign Patients
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={allowConsult}
                  onChange={(e) => setAllowConsult(e.target.checked)}
                />
                Allow Consultation Requests
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={allowChangeStatus}
                  onChange={(e) => setAllowChangeStatus(e.target.checked)}
                />
                Allow Change Status
              </label>
              <div className="action-buttons-group">
                <button className="btn-save" onClick={handleSavePermissions}>
                  Save
                </button>
              </div>
            </div>
            <h2 className="profile-title">Send Notification</h2>

            <textarea
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value.slice(0, 100))}
              placeholder="Enter your message here, it will be sent to all doctors' notification centers."
              className="notification-textarea"
            />
            <div className="character-count">
              Maximum 100 characters
              <span>{notificationMessage.length} / 100</span>
            </div>
            <div className="action-buttons-group">
              <button className="btn-send" onClick={handleSendNotification}>
                Send
              </button>
            </div>
          </div>
        )}
        {activeTab === "feedbacks" && <FeedbackTab />}
      </div>

      {/* ACtions Modals */}
      <AddSpecialtyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSpecialty}
      />
      <EditSpecialtyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        specialty={selectedSpecialty}
        onSave={handleEditSpecialty}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={selectedDoctor ? handleDeleteDoctor : handleDeleteSpecialty || handleDeleteFeedback}
        itemType={selectedDoctor ? "Doctor" : "Specialty"}
      />
      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(null)}
        feedback={isViewModalOpen}
      />
    </div>
  );
};

export default Settings;
