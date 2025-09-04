"use client";

import { useState, useEffect, useMemo } from "react";
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
  const [selectedDate, setSelectedDate] = useState("");
  const [sortDirections, setSortDirections] = useState({
    id: "asc",
    name: "asc",
    specialty: "asc",
    level: "asc",
    loginDate: "asc",
    loginTime: "asc",
    status: "asc",
  });
  const [activeSortKey, setActiveSortKey] = useState(null);

  const [doctors, setDoctors] = useState(
    Array.from({ length: 50 }).map((_, i) => ({
      id: i + 1,
      name: `Dr. ${i + 1}`,
      specialty: [
        "Triage Doctor",
        "Internal Medicine",
        "Cardiology",
        "Neurology",
        "General Surgery",
      ][i % 5],
      level: [
        "Intern",
        "Junior",
        "Mid-Level",
        "Senior",
        "Specialist",
        "Consultant",
      ][i % 6],
      loginDate: "11/5/2025",
      loginTime: "12:00 AM",
      status: i % 2 === 0 ? "online" : "offline",
    }))
  );

  useEffect(() => {
    // Placeholder: fetch('/api/doctors').then(res => setDoctors(res))
    console.log("Fetching doctors data...");
  }, []);

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

  const requestSort = (key) => {
    const newDirection = sortDirections[key] === "asc" ? "desc" : "asc";
    setSortDirections((prev) => ({ ...prev, [key]: newDirection }));
    setActiveSortKey(key);
  };

  const getSortIndicator = (key) => {
    if (activeSortKey !== key) return "none";
    return sortDirections[key] === "asc" ? "ascending" : "descending";
  };

  const compareFunctions = useMemo(() => {
    return {
      id: (a, b) => {
        const aVal = Number(a.id);
        const bVal = Number(b.id);
        return aVal - bVal;
      },
      name: (a, b) => a.name.localeCompare(b.name),
      specialty: (a, b) => a.specialty.localeCompare(b.specialty),
      level: (a, b) => {
        const levelsOrder = [
          "Intern",
          "Junior",
          "Mid-Level",
          "Senior",
          "Specialist",
          "Consultant",
        ];
        return levelsOrder.indexOf(a.level) - levelsOrder.indexOf(b.level);
      },
      loginDate: (a, b) => {
        const aDate = new Date(a.loginDate);
        const bDate = new Date(b.loginDate);
        return aDate.getTime() - bDate.getTime();
      },
      loginTime: (a, b) => {
        const parseTime = (time) => {
          const [timePart, ampm] = time.split(" ");
          let [hours, minutes] = timePart.split(":").map(Number);
          if (ampm === "PM" && hours !== 12) hours += 12;
          if (ampm === "AM" && hours === 12) hours = 0;
          return hours * 60 + minutes;
        };
        return parseTime(a.loginTime) - parseTime(b.loginTime);
      },
      status: (a, b) => {
        const aVal = a.status === "online" ? 0 : 1;
        const bVal = b.status === "online" ? 0 : 1;
        return aVal - bVal;
      },
    };
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(
      (doctor) =>
        (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedDate ? doctor.loginDate === selectedDate : true)
    );
  }, [doctors, searchTerm, selectedDate]);

  const sortedDoctors = useMemo(() => {
    if (!activeSortKey) {
      return filteredDoctors;
    }

    const direction = sortDirections[activeSortKey];
    const compare = compareFunctions[activeSortKey];

    return [...filteredDoctors].sort((a, b) => {
      let comparison = compare(a, b);
      if (direction === "desc") {
        comparison *= -1;
      }
      return comparison;
    });
  }, [filteredDoctors, activeSortKey, sortDirections, compareFunctions]);

  const totalPages = Math.ceil(sortedDoctors.length / itemsPerPage);
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedDoctors.slice(start, end);
  }, [sortedDoctors, currentPage]);

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

  const handleDeleteDoctor = () => {
    if (doctorToDelete) {
      const filtered = doctors.filter((d) => d.id !== doctorToDelete.id);
      setDoctors(filtered);
      setIsDeleteModalOpen(false);
      setDoctorToDelete(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="doctors-page">
      {/* SECTION 1 */}
      <div className="doctors-header">
        <h1>Emergency Room Doctors</h1>
        <a href="/notifications">
          <img
            src="/notifications.svg"
            alt="Notifications"
            className="notification-icon"
          />
        </a>
      </div>

      {/* SECTION 2 */}
      <div className="doctors-welcome">
        <div className="welcome-text">
          <h2>Good morning, ER Admin</h2>
          <p>
            Here is what’s happening with ER Department from May 19 - May 25.
          </p>
        </div>
        <button className="date-range-btn">
          <span>May 19 - May 25</span>
          <img src="/calendar.svg" alt="Calendar" className="calendar-icon" />
        </button>
      </div>

      {/* SECTION 3 */}
      <div className="doctors-dashboard">
        <div className="dashboard-cards-container">
          <div className="stats-cards-column">
            <div className="doctors-stat-card">
              <div className="stat-content">
                <div className="stat-label">Total Doctors</div>
                <div className="stat-value">50</div>
              </div>
              <img src="/3.svg" alt="Doctor Bag" className="stat-icon" />
            </div>
            <div className="doctors-stat-card">
              <div className="stat-content">
                <div className="stat-label">Online Doctors</div>
                <div className="stat-value">30</div>
              </div>
              <img src="/4.svg" alt="Doctor" className="stat-icon" />
            </div>
          </div>
          <div className="response-time-card">
            <div className="chart-heading-Average">Average Response Time</div>
            <div className="donut-chart-container">
              <Doughnut data={donutData} options={donutOptions} />
            </div>
            <div className="response-legend">
              <div className="legend-item">
                <span className="legend-dot early-response"></span>
                <div className="legend-text">
                  <p className="legend-percentage">90.2%</p>
                  <p className="legend-label">Early Response</p>
                </div>
              </div>
              <div className="legend-item">
                <span className="legend-dot late-response"></span>
                <div className="legend-text">
                  <p className="legend-percentage">9.8%</p>
                  <p className="legend-label">Late Response</p>
                </div>
              </div>
            </div>
          </div>
          <div className="specialties-chart-card">
            <div className="chart-heading">
              <p>Specialties Doctors</p>
              <button className="print-btn">
                <LuPrinter size={20} />
              </button>
            </div>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      <div className="doctors-table-section">
        <div className="table-responsive">
          <div className="list-header">
            <h2 className="section-title">DOCTORS LIST</h2>
            <div className="list-actions">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-picker"
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <LuSearch size={15} className="search-icon" />
              <button className="print-btn" onClick={handlePrint}>
                <LuPrinter size={20} />
              </button>
            </div>
          </div>
          <table className="doctors-table printable-table">
            <thead>
              <tr>
                <th>
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("id")}
                    aria-sort={getSortIndicator("id")}
                    tabIndex={0}
                  >
                    No
                    <span className="sort-arrows">
                      <span
                        className={`arrow ${activeSortKey === "id" && sortDirections.id === "asc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`arrow ${activeSortKey === "id" &&
                            sortDirections.id === "desc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▼
                      </span>
                    </span>
                  </button>
                </th>
                <th>
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("name")}
                    aria-sort={getSortIndicator("name")}
                    tabIndex={0}
                  >
                    Dr-Name
                    <span className="sort-arrows">
                      <span
                        className={`arrow ${activeSortKey === "name" &&
                            sortDirections.name === "asc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`arrow ${activeSortKey === "name" &&
                            sortDirections.name === "desc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▼
                      </span>
                    </span>
                  </button>
                </th>
                <th>
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("specialty")}
                    aria-sort={getSortIndicator("specialty")}
                    tabIndex={0}
                  >
                    Specialty
                    <span className="sort-arrows">
                      <span
                        className={`arrow ${activeSortKey === "specialty" &&
                            sortDirections.specialty === "asc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`arrow ${activeSortKey === "specialty" &&
                            sortDirections.specialty === "desc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▼
                      </span>
                    </span>
                  </button>
                </th>
                <th>
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("level")}
                    aria-sort={getSortIndicator("level")}
                    tabIndex={0}
                  >
                    Level
                    <span className="sort-arrows">
                      <span
                        className={`arrow ${activeSortKey === "level" &&
                            sortDirections.level === "asc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`arrow ${activeSortKey === "level" &&
                            sortDirections.level === "desc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▼
                      </span>
                    </span>
                  </button>
                </th>
                <th>
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("loginDate")}
                    aria-sort={getSortIndicator("loginDate")}
                    tabIndex={0}
                  >
                    Login Date
                    <span className="sort-arrows">
                      <span
                        className={`arrow ${activeSortKey === "loginDate" &&
                            sortDirections.loginDate === "asc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`arrow ${activeSortKey === "loginDate" &&
                            sortDirections.loginDate === "desc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▼
                      </span>
                    </span>
                  </button>
                </th>
                <th>
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("loginTime")}
                    aria-sort={getSortIndicator("loginTime")}
                    tabIndex={0}
                  >
                    Login Time
                    <span className="sort-arrows">
                      <span
                        className={`arrow ${activeSortKey === "loginTime" &&
                            sortDirections.loginTime === "asc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`arrow ${activeSortKey === "loginTime" &&
                            sortDirections.loginTime === "desc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▼
                      </span>
                    </span>
                  </button>
                </th>
                <th>
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("status")}
                    aria-sort={getSortIndicator("status")}
                    tabIndex={0}
                  >
                    Status
                    <span className="sort-arrows">
                      <span
                        className={`arrow ${activeSortKey === "status" &&
                            sortDirections.status === "asc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`arrow ${activeSortKey === "status" &&
                            sortDirections.status === "desc"
                            ? "is-active"
                            : ""
                          }`}
                      >
                        ▼
                      </span>
                    </span>
                  </button>
                </th>
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
                      className={`status-badge ${doctor.status === "online" ? "online" : "offline"
                        }`}
                    >
                      {doctor.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleViewDetails(doctor.id)}
                    >
                      <LuEye size={18} />
                    </button>
                    <button
                      className="action-btn delete-btn"
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
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <LuChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              className={`pagination-page ${currentPage === i + 1 ? "active" : ""
                }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <span className="pagination-dots">...</span>
          <button
            className="pagination-btn"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <LuChevronRight size={18} />
          </button>
        </div>
      </div>

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

export default Doctors;