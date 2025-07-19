"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuEye,
  LuTrash2,
  LuPrinter,
  LuChevronLeft,
  LuChevronRight,
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

  const overviewData = [
    { label: "Total Doctors", value: 50, icon: "/3.svg" },
    { label: "Online Doctors", value: 30, icon: "/4.svg" },
  ];

  const averageResponseData = [
    { name: "Early Response", value: 80, color: "#0D425D" },
    { name: "Late Response", value: 20, color: "#E0E0E0" },
  ];

  const specialtiesData = [
    { name: "Internal Medicine", value: 10 },
    { name: "Gen", value: 8 },
    { name: "Cardio", value: 6 },
    { name: "Neuro", value: 4 },
    { name: "ENT", value: 2 },
  ];

  const doctorsData = [
    {
      id: 1,
      name: "Mohamed Ali",
      specialty: "Triage Doctor",
      level: "Junior",
      loginDate: "11/5/2025",
      loginTime: "12:00 AM",
      status: "online",
    },
    {
      id: 2,
      name: "Ahmed Kamal",
      specialty: "Internal Medicine",
      level: "Junior",
      loginDate: "11/5/2025",
      loginTime: "12:00 AM",
      status: "online",
    },
    {
      id: 3,
      name: "Ali Sayed",
      specialty: "Internal Medicine",
      level: "Junior",
      loginDate: "11/5/2025",
      loginTime: "12:00 AM",
      status: "offline",
    },
    {
      id: 4,
      name: "Mohamed Ali",
      specialty: "Cardiology",
      level: "Junior",
      loginDate: "11/5/2025",
      loginTime: "12:00 AM",
      status: "online",
    },
    {
      id: 5,
      name: "Shimaa Mostafa",
      specialty: "Cardiology",
      level: "Junior",
      loginDate: "11/5/2025",
      loginTime: "12:00 AM",
      status: "online",
    },
    {
      id: 6,
      name: "Noraan Ali",
      specialty: "Neurology",
      level: "Junior",
      loginDate: "11/5/2025",
      loginTime: "12:00 AM",
      status: "online",
    },
    {
      id: 7,
      name: "Laila Sami",
      specialty: "Neurology",
      level: "Junior",
      loginDate: "11/5/2025",
      loginTime: "12:00 AM",
      status: "offline",
    },
    {
      id: 8,
      name: "Asmaa Sami",
      specialty: "Neurology",
      level: "Junior",
      loginDate: "11/5/2025",
      loginTime: "12:00 AM",
      status: "online",
    },
    {
      id: 9,
      name: "Shimaa Mostafa",
      specialty: "General Surgery",
      level: "Mid-Level",
      loginDate: "11/5/2025",
      loginTime: "12:00 AM",
      status: "offline",
    },
    {
      id: 10,
      name: "Noraan Ali",
      specialty: "General Surgery",
      level: "Junior",
      loginDate: "11/5/2025",
      loginTime: "12:00 AM",
      status: "online",
    },
  ];

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
        barThickness: 10, // <-- رفّع البارات
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
          max: 12,
        },
      },
    },
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
    // In a real app, send delete request to API
    setIsDeleteModalOpen(false);
    setDoctorToDelete(null);
    alert(`${doctorToDelete.name} has been deleted.`);
  };

  // Mock data for charts
  const averageResponseTime = {
    early: 90.2,
    late: 9.8,
  };

  const statsData = {
    totalCases: 45,
    arrestCases: 5,
    totalDoctors: 50,
    onlineDoctors: 30,
  };

  const maxSpecialtyCount = Math.max(...specialtiesData.map((s) => s.count));

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
              <img src='/public/3.svg' alt='Doctor Bag' className='stat-icon' />
            </div>
            <div className='doctors-stat-card'>
              <div className='stat-content'>
                <div className='stat-label'>Online Doctors</div>
                <div className='stat-value'>30</div>
              </div>
              <img src='/public/4.svg' alt='Doctor' className='stat-icon' />
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

      {/* SECTION 4 */}
      <div className='doctors-list-section card'>
        <div className='list-header'>
          <h2 className='section-title'>ER DOCTORS LIST</h2>
          <div className='list-actions'>
            <span className='date-display'>11 May 2025</span>
            <button className='print-btn'>
              <LuPrinter size={20} />
            </button>
          </div>
        </div>

        <div className='table-responsive'>
          <table className='doctors-table'>
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
              {doctorsData.map((doctor, index) => (
                <tr key={doctor.id}>
                  <td>{index + 1}</td>
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
          <button className='pagination-btn'>
            <LuChevronLeft size={18} />
          </button>
          <button className='pagination-btn active'>1</button>
          <button className='pagination-btn'>2</button>
          <button className='pagination-btn'>3</button>
          <span className='pagination-dots'>...</span>
          <button className='pagination-btn'>
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
