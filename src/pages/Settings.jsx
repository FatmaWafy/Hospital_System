 
import   {  useState } from "react";
import "./Settings.css";
import ProfileTab from "../components/ProfileTab";
import SpecialtiesTab from "../components/SpecialtiesTab";
import DoctorsTab from "../components/DoctorsTab";
import RequestsTab from "../components/RequestsTab";
import FeedbackTab from "../components/FeedbackTab";

const Settings = () => {
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
  const doctorItemsPerPage = 10;
  const [userData, setUserData] = useState({
    name: "Ahmed Safwat Mohamed",
    jobTitle: "Er Manager",
    email: "i.asafwat@gmail.com",
    phone: "0123456789",
    photo: "/avatar.svg",
    password: "*****",
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
 
  const handleSave = () => {
    console.log("Saving user data:", userData);
    setIsEditing(false);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPhoto(file);
      const photoUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, photo: photoUrl }));
      console.log("Uploading photo:", file.name);
      console.log("Uploading photo:", newPhoto);
    }
  };

  const handleSavePermissions = () => {
    const permissions = { addPatients, allowAssign, allowConsult, allowChangeStatus };
    console.log("Saving permissions:", permissions);
  };

  const handleSendNotification = () => {
    if (notificationMessage) {
      console.log("Sending notification:", notificationMessage);
      setNotificationMessage("");
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <a href="/notifications">
          <img src="/notifications.svg" alt="Notifications" className="notification-icon" />
        </a>
      </div>

      <div className="settings-welcome">
        <div className="welcome-text">
          <h2>Good morning, ER Admin</h2>
          <p>Here is what’s happening with ER Department from May 19 - May 25.</p>
        </div>
        <button className="date-range-btn">
          <span>May 19 - May 25</span>
          <img src="/calendar.svg" alt="Calendar" className="calendar-icon" />
        </button>
      </div>

      <div className="tabs-container">
        <button className={`tab-btn ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
          My Profile
        </button>
        <button className={`tab-btn ${activeTab === "specialties" ? "active" : ""}`} onClick={() => setActiveTab("specialties")}>
          Specialties
        </button>
        <button className={`tab-btn ${activeTab === "doctors" ? "active" : ""}`} onClick={() => setActiveTab("doctors")}>
          Doctors
        </button>
        <button className={`tab-btn ${activeTab === "requests" ? "active" : ""}`} onClick={() => setActiveTab("requests")}>
          Requests & Notifications
        </button>
        <button className={`tab-btn ${activeTab === "feedbacks" ? "active" : ""}`} onClick={() => setActiveTab("feedbacks")}>
          Feed backs
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "profile" && (
          <ProfileTab
            userData={userData}
            setUserData={setUserData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
            handlePhotoChange={handlePhotoChange}
          />
        )}
        {activeTab === "specialties" && (
          <SpecialtiesTab
            specialties={specialties}
            setSpecialties={setSpecialties}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
          />
        )}
        {activeTab === "doctors" && (
          <DoctorsTab
            doctors={doctors}
            setDoctors={setDoctors}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            doctorCurrentPage={doctorCurrentPage}
            setDoctorCurrentPage={setDoctorCurrentPage}
            doctorItemsPerPage={doctorItemsPerPage}
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
          />
        )}
        {activeTab === "requests" && (
          <RequestsTab
            addPatients={addPatients}
            setAddPatients={setAddPatients}
            allowAssign={allowAssign}
            setAllowAssign={setAllowAssign}
            allowConsult={allowConsult}
            setAllowConsult={setAllowConsult}
            allowChangeStatus={allowChangeStatus}
            setAllowChangeStatus={setAllowChangeStatus}
            notificationMessage={notificationMessage}
            setNotificationMessage={setNotificationMessage}
            handleSavePermissions={handleSavePermissions}
            handleSendNotification={handleSendNotification}
          />
        )}
        {activeTab === "feedbacks" && <FeedbackTab />}
      </div>
    </div>
  );
};

export default Settings;
 