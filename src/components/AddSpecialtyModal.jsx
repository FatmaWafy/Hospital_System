"use client"

import { useState } from "react"
import { LuChevronDown, LuTrash2, LuUser } from "react-icons/lu"
import "./AddDoctorModal.css"

const AddDoctorModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    level: "",
    specialty: "",
    photo: null,
  })

  const [dropdowns, setDropdowns] = useState({
    level: false,
    specialty: false,
  })

  const levels = ["Intern", "Junior", "Mid-Level", "Senior", "Specialist", "Consultant"]
  const specialties = ["Triage Doctor", "Internal Medicine", "G. Surgery", "Cardiology", "Neurology"]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleDropdown = (type) => {
    setDropdowns((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const selectOption = (type, value) => {
    handleInputChange(type, value)
    setDropdowns((prev) => ({ ...prev, [type]: false }))
  }

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      level: "",
      specialty: "",
      photo: null,
    })
  }

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.level ||
      !formData.specialty
    ) {
      alert("Please fill in all required fields")
      return
    }

    const newDoctor = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      level: formData.level,
      specialty: formData.specialty,
      status: "offline",
      loginDate: "Never",
      photo: formData.photo,
    }

    onAdd(newDoctor)
    handleClear()
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange("photo", e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-doctor-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-doctor-header">
          <h1>Add New Doctor</h1>
        </div>

        <div className="add-doctor-content">
          <div className="personal-info-section">
            <h3 className="section-title">Personal Info</h3>

            <div className="form-layout">
              <div className="photo-section">
                <label className="photo-label">Profile Photo:</label>
                <div className="photo-container">
                  <div className="photo-placeholder">
                    {formData.photo ? (
                      <img
                        src={formData.photo || "/placeholder.svg"}
                        alt="Profile"
                        style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      <LuUser size={40} />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: "none" }}
                    id="photoInput"
                  />
                  <button className="photo-edit-btn" onClick={() => document.getElementById("photoInput").click()}>
                    <img src="/f3.svg" alt="Edit" />
                  </button>
                </div>
              </div>

              <div className="form-fields">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Write Doctor Name here"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone no.:</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="eg.0123456789"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row-double">
                  <div className="form-group dropdown-group">
                    <label>Level:</label>
                    <div className="dropdown-container">
                      <div className="dropdown-trigger" onClick={() => toggleDropdown("level")}>
                        <span className={formData.level ? "selected" : "placeholder"}>
                          {formData.level || "Level (eg. Junior)"}
                        </span>
                        <LuChevronDown className={`dropdown-arrow ${dropdowns.level ? "open" : ""}`} />
                      </div>
                      {dropdowns.level && (
                        <div className="dropdown-menu">
                          {levels.map((level) => (
                            <div key={level} className="dropdown-option" onClick={() => selectOption("level", level)}>
                              {level}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group dropdown-group">
                    <label>Specialty:</label>
                    <div className="dropdown-container">
                      <div className="dropdown-trigger" onClick={() => toggleDropdown("specialty")}>
                        <span className={formData.specialty ? "selected" : "placeholder"}>
                          {formData.specialty || "Level (eg. Junior)"}
                        </span>
                        <LuChevronDown className={`dropdown-arrow ${dropdowns.specialty ? "open" : ""}`} />
                      </div>
                      {dropdowns.specialty && (
                        <div className="dropdown-menu">
                          {specialties.map((specialty) => (
                            <div
                              key={specialty}
                              className="dropdown-option"
                              onClick={() => selectOption("specialty", specialty)}
                            >
                              {specialty}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-clear" onClick={handleClear}>
                Clear
              </button>
              <button className="btn-save-doctor" onClick={handleSave}>
                Save
              </button>
              <button className="btn-delete-doctor" onClick={onClose}>
                <LuTrash2 size={16} />
                Delete Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDoctorModal
