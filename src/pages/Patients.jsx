import React, { useState } from "react";
import "./Patients.css";
import {
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";

const Patients = () => {
  // Dummy data simulating DB response
  const statsData = {
    totalCases: 45,
  };

  const patientStatusData = [
    { name: "Critical", value: 5, color: "#000000" },
    { name: "Urgent", value: 15, color: "#FF0000" },
    { name: "Moderate", value: 30, color: "#FFA500" },
    { name: "Cold", value: 50, color: "#008000" },
  ];

  // Dummy table data
  const tableData = Array.from({ length: 45 }).map((_, i) => ({
    no: i + 1,
    name: `Patient ${i + 1}`,
    doctor: `Dr. Smith`,
    date: "2025-05-20",
    time: "12:30 PM",
    complaint: "Chest Pain",
    status: ["urgent", "critical", "cold", "moderate"][i % 4],
  }));

  const statusIcons = {
    urgent: "/urgent.svg",
    critical: "/critical.svg",
    cold: "/cold.svg",
    moderate: "/moderate.svg",
  };

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const pageData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="patients-page">
      {/* SECTION 1 */}
      <div className="overview-header">
        <h1>Emergency Room Patients</h1>
        <a href="/notifications">
          <img
            src="/notifications.svg"
            alt="Notifications"
            className="notification-icon"
          />
        </a>
      </div>

      <div className="overview-welcome">
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

      {/* SECTION 2 */}
      <div className="patients-section-two">
        <div className="patients-status-box">
          <h3>Patients Status</h3>
          <div className="chart-center">
            <PieChart width={280} height={200}>
              <Pie
                data={patientStatusData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
              >
                {patientStatusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="chart-description-row">
            {patientStatusData.map((item) => (
              <div className="desc-item" key={item.name}>
                <div
                  className="color-square"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{`${item.value}% ${item.name}`}</span>
              </div>
            ))}
          </div>
          <div className="view-all-wrapper">
            <button className="view-all-btn">
              View All Patients
              <img src="/arrow-right.svg" alt="Arrow Right" />
            </button>
          </div>
        </div>

        <div className="stats-box patients-total-cases">
          <span className="box-labelH">Total Cases</span>
          <span className="box-valueH">{statsData.totalCases}</span>
          <img src="/1.svg" alt="icon" className="stats-iconH" />
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="patients-table-section">
        <h3>ER PATIENTS LIST</h3>
        <table className="patients-table">
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
                <td>
  <Link
  to={`/patients/${row.no}?status=${row.status}`}
  className="patient-link"
>
  {row.name}
</Link>

</td>

                <td>{row.doctor}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.complaint}</td>
                <td>
  <div className={`status-pill ${row.status}`}>
    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
  </div>
</td>

                <td className="actions-cell">
                  <img src="/eye.svg" alt="View" className="action-icon" />
                  <img src="/recycle.svg" alt="Recycle" className="action-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECTION 4 - Pagination */}
      <div className="pagination-wrapper">
  <button
    className="pagination-arrow left-arrow"
    onClick={handlePrev}
    disabled={currentPage === 1}
  ></button>

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

  <button
    className="pagination-arrow right-arrow"
    onClick={handleNext}
    disabled={currentPage === totalPages}
  ></button>
</div>

    </div>
  );
};

export default Patients;
