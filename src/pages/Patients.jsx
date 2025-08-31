import React, { useState } from "react";
import "./Patients.css";
import { PieChart, Pie, Cell } from "recharts";
import { Link, useNavigate } from "react-router-dom";
import {
  LuChevronLeft,
  LuChevronRight,
  LuEye,
  LuPrinter,
  LuSearch,
  LuTrash2,
} from "react-icons/lu";
import DeleteModal from "../components/DeleteModal";

const Patients = () => {
  const navigate = useNavigate();
  const statsData = {
    totalCases: 45,
  };

  const patientStatusData = [
    { name: "Critical", value: 5, color: "#000000" },
    { name: "Urgent", value: 15, color: "#FF0000" },
    { name: "Moderate", value: 30, color: "#FFA500" },
    { name: "Cold", value: 50, color: "#008000" },
  ];

  const [patients, setPatients] = useState(
    Array.from({ length: 45 }).map((_, i) => ({
      no: i + 1,
      name: `Patient ${i + 1}`,
      doctor: `Dr. Smith`,
      date: "2025-05-20",
      time: "12:30 PM",
      complaint: "Chest Pain",
      status: ["urgent", "critical", "cold", "moderate"][i % 4],
    }))
  );

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const [searchTerm, setSearchTerm] = useState("");
  const pageData = patients
    .filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleViewDetails = (id) => {
    navigate(`/patients/${id}`);
  };

  const handleDeleteClick = (patient) => {
    setPatientToDelete(patient);
    setIsDeleteModalOpen(true);
  };

  const handleDeletePatient = () => {
    if (patientToDelete) {
      const filtered = patients.filter((p) => p.no !== patientToDelete.no);
      setPatients(filtered);
      setIsDeleteModalOpen(false);
      setPatientToDelete(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='patients-page'>
      {/* SECTION 1 */}
      <div className='patients-header'>
        <h1>Emergency Room Doctors</h1>
        <a href='/notifications'>
          <img
            src='/notifications.svg'
            alt='Notifications'
            className='notification-icon'
          />
        </a>
      </div>

      {/* SECTION 2 */}
      <div className='patients-welcome'>
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

      {/* SECTION 3 */}
      <div className='patients-section-two'>
        <div className='patients-status-box'>
          <h3>Patients Status</h3>
          <div className='chart-center'>
            <PieChart width={280} height={200}>
              <Pie
                data={patientStatusData}
                dataKey='value'
                nameKey='name'
                innerRadius={70}
                outerRadius={100}
              >
                {patientStatusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className='chart-description-row'>
            {patientStatusData.map((item) => (
              <div className='desc-item' key={item.name}>
                <div
                  className='color-square'
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{`${item.value}% ${item.name}`}</span>
              </div>
            ))}
          </div>
          <div className='view-all-wrapper'>
            <button className='view-all-btn'>
              View All Patients
              <img src='/arrow-right.svg' alt='Arrow Right' />
            </button>
          </div>
        </div>

        <div className='stats-box patients-total-cases'>
          <span className='box-labelH'>Total Cases</span>
          <span className='box-valueH'>{statsData.totalCases}</span>
          <img src='/1.svg' alt='icon' className='stats-iconH' />
        </div>
      </div>

      {/* SECTION 4 */}
      <div className='patients-table-section'>
        <div className='table-responsive'>
          <div className='list-header'>
            <h2 className='section-title'>PATIENTS LIST</h2>
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
          <table className='patients-table printable-table'>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Assigned Doctors</th>
                <th>Date of Admit</th>
                <th>Time of Admit</th>
                <th>Complaint</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((row) => (
                <tr key={row.no}>
                  <td>{row.no}</td>
                  <td>{row.name}</td>
                  <td>{row.doctor}</td>
                  <td>{row.date}</td>
                  <td>{row.time}</td>
                  <td>{row.complaint}</td>
                  <td>
                    <span className={`patient-status-pill ${row.status}`}>
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </span>
                  </td>
                  <td className='actions-cell'>
                    <button
                      className='action-btn view-btn'
                      onClick={() => handleViewDetails(row.no)}
                    >
                      <LuEye size={18} />
                    </button>
                    <button
                      className='action-btn delete-btn'
                      onClick={() => handleDeleteClick(row)}
                    >
                      <LuTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 5 - Pagination */}
      <div className='pagination-wrapper'>
        <button
          className='pagination-btn'
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <LuChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`pagination-page ${
              currentPage === i + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <span className='pagination-dots'>...</span>

        <button
          className='pagination-btn'
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <LuChevronRight size={18} />
        </button>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setPatientToDelete(null);
        }}
        onConfirm={handleDeletePatient}
        itemType='patient'
      />
    </div>
  );
};

export default Patients;
