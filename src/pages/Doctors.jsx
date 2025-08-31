"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuEye,
  LuTrash2,
  LuPrinter,
  LuChevronLeft,
  LuChevronRight,
  LuSearch,
} from "react-icons/lu";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

import DeleteModal from "../components/DeleteModal";
import "./Doctors.css";
import { Doughnut, Bar } from "react-chartjs-2";

const Doctors = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const doctorsData = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    name: `Dr. ${i + 1}`,
    specialty: [
      "Triage Doctor",
      "Internal Medicine",
      "Cardiology",
      "Neurology",
      "General Surgery",
    ][i % 5],
    level: i % 2 === 0 ? "Junior" : "Mid-Level",
    loginDate: "11/5/2025",
    loginTime: "12:00 AM",
    status: i % 2 === 0 ? "online" : "offline",
  }));

  const donutData = {
    labels: ["Early Response", "Late Response"],
    datasets: [
      {
        data: [90.2, 9.8],
        backgroundColor: ["#0d425d", "#bdbdbd"],
        borderWidth: 0,
      },
    ],
  };

  const donutOptions = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  const barData = {
    labels: [
      "Internal Medicine",
      "Gen. Surgery",
      "Cardio.",
      "Neuro.",
      "ENT",
      "Opth.",
    ],
    datasets: [
      {
        label: "Doctors",
        data: [4, 5, 3, 4, 1, 0],
        backgroundColor: "#0d425d",
        borderRadius: 10,
        barThickness: 10,
        maxBarThickness: 10,
        categoryPercentage: 0.5,
        barPercentage: 1.0,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#0d425d",
          font: { size: 13, weight: "bold" },
        },
      },
      y: {
        beginAtZero: true,
        reverse: false,
        grid: { display: false },
        ticks: {
          stepSize: 2,
          color: "#0d425d",
          font: { size: 13, weight: "bold" },
        },
      },
    },
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(doctorsData.length / itemsPerPage);
  const pageData = doctorsData
    .filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleViewDetails = (id) => {
    navigate(`/doctors/${id}`);
  };

  const handleDeleteClick = (doctor) => {
    setDoctorToDelete(doctor);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting doctor:", doctorToDelete.name);
    setIsDeleteModalOpen(false);
    setDoctorToDelete(null);
    alert(`${doctorToDelete.name} has been deleted.`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='doctors-page'>
      {/* SECTION 1 */}
      <div className='doctors-header'>
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
      <div className='doctors-welcome'>
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
      <div className='doctors-dashboard'>
        <div className='dashboard-cards-container'>
          <div className='stats-cards-column'>
            <div className='doctors-stat-card'>
              <div className='stat-content'>
                <div className='stat-label'>Total Doctors</div>
                <div className='stat-value'>50</div>
              </div>
              <img src='/3.svg' alt='Doctor Bag' className='stat-icon' />
            </div>
            <div className='doctors-stat-card'>
              <div className='stat-content'>
                <div className='stat-label'>Online Doctors</div>
                <div className='stat-value'>30</div>
              </div>
              <img src='/4.svg' alt='Doctor' className='stat-icon' />
            </div>
          </div>
          <div className='response-time-card'>
            <div className='chart-heading-Average'>Average Response Time</div>
            <div className='donut-chart-container'>
              <Doughnut data={donutData} options={donutOptions} />
            </div>
            <div className='response-legend'>
              <div className='legend-item'>
                <span className='legend-dot early-response'></span>
                <div className='legend-text'>
                  <p className='legend-percentage'>90.2%</p>
                  <p className='legend-label'>Early Response</p>
                </div>
              </div>
              <div className='legend-item'>
                <span className='legend-dot late-response'></span>
                <div className='legend-text'>
                  <p className='legend-percentage'>9.8%</p>
                  <p className='legend-label'>Late Response</p>
                </div>
              </div>
            </div>
          </div>
          <div className='specialties-chart-card'>
            <div className='chart-heading'>
              <p>Specialties Doctors</p>
              <button className='print-btn'>
                <LuPrinter size={20} />
              </button>
            </div>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      <div className='doctors-table-section'>
        <div className='table-responsive'>
          <div className='list-header'>
            <h2 className='section-title'>DOCTORS LIST</h2>
            <div className='list-actions'>
              <input
                type='text'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='search-input'
              />
              <LuSearch size={15} className="search-icon"/>
              <button className='print-btn' onClick={handlePrint}>
                <LuPrinter size={20} />
              </button>
            </div>
          </div>
          <table className='doctors-table printable-table'>
            <thead>
              <tr>
                <th>No</th>
                <th>Dr-Name</th>
                <th>Specialty</th>
                <th>Level</th>
                <th>Login Date</th>
                <th>Login Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty}</td>
                  <td>{doctor.level}</td>
                  <td>{doctor.loginDate}</td>
                  <td>{doctor.loginTime}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        doctor.status === "online" ? "online" : "offline"
                      }`}
                    >
                      {doctor.status}
                    </span>
                  </td>
                  <td className='actions-cell'>
                    <button
                      className='action-btn view-btn'
                      onClick={() => handleViewDetails(doctor.id)}
                    >
                      <LuEye size={18} />
                    </button>
                    <button
                      className='action-btn delete-btn'
                      onClick={() => handleDeleteClick(doctor)}
                    >
                      <LuTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='pagination'>
          <button
            className='pagination-btn'
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <LuChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
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
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemType='Doctor'
      />
    </div>
  );
};

export default Doctors;
