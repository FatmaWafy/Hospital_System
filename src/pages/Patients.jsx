import React, { useState, useMemo } from "react";
import "./Patients.css";
import "./Doctors.css";
import { PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";
import {
  LuChevronLeft,
  LuChevronRight,
  LuEye,
  LuPrinter,
  LuSearch,
  LuTrash2,
  LuFilter, // استيراد أيقونة الفلتر
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
      time: ["10:00 AM", "12:30 PM", "08:15 AM", "03:45 PM"][i % 4],
      complaint: "Chest Pain",
      status: ["urgent", "critical", "cold", "moderate"][i % 4],
    }))
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortDirections, setSortDirections] = useState({
    no: "asc",
    name: "asc",
    doctor: "asc",
    date: "asc",
    time: "asc",
    complaint: "asc",
    status: "asc",
  });
  const [activeSortKey, setActiveSortKey] = useState(null);

  // حالة جديدة لمنطق الفلتر
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterColumn, setFilterColumn] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

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
      no: (a, b) => Number(a.no) - Number(b.no),
      name: (a, b) => a.name.localeCompare(b.name),
      doctor: (a, b) => a.doctor.localeCompare(b.doctor),
      date: (a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate.getTime() - bDate.getTime();
      },
      time: (a, b) => {
        const parseTime = (time) => {
          const [timePart, ampm] = time.split(" ");
          let [hours, minutes] = timePart.split(":").map(Number);
          if (ampm === "PM" && hours !== 12) hours += 12;
          if (ampm === "AM" && hours === 12) hours = 0;
          return hours * 60 + minutes;
        };
        return parseTime(a.time) - parseTime(b.time);
      },
      status: (a, b) => {
        const statusOrder = ["critical", "urgent", "moderate", "cold"];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      },
      complaint: (a, b) => a.complaint.localeCompare(b.complaint),
    };
  }, []);

  const filteredPatients = useMemo(() => {
    let result = patients.filter(
      (patient) =>
        (patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.complaint
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (selectedDate ? patient.date === selectedDate : true)
    );

    // تطبيق الفلاتر المحددة على الأعمدة
    Object.keys(selectedFilters).forEach(key => {
      const filters = selectedFilters[key];
      if (filters && filters.length > 0) {
        result = result.filter(patient => filters.includes(patient[key]));
      }
    });

    return result;
  }, [patients, searchTerm, selectedDate, selectedFilters]);

  const sortedPatients = useMemo(() => {
    if (!activeSortKey) {
      return filteredPatients;
    }

    const direction = sortDirections[activeSortKey];
    const compare = compareFunctions[activeSortKey];

    return [...filteredPatients].sort((a, b) => {
      let comparison = compare(a, b);
      if (direction === "desc") {
        comparison *= -1;
      }
      return comparison;
    });
  }, [filteredPatients, activeSortKey, sortDirections, compareFunctions]);

  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedPatients.slice(start, end);
  }, [sortedPatients, currentPage]);

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

  // دالة جديدة للتعامل مع النقر على زر الفلتر
  const handleFilterClick = (key) => {
    setFilterColumn(key);
    // الحصول على القيم الفريدة للعمود المحدد
    const uniqueOptions = [...new Set(patients.map(p => p[key]))];
    setFilterOptions(uniqueOptions);
    setIsFilterModalOpen(true);
  };

  // دالة للتعامل مع تغييرات checkbox في نافذة الفلتر
  const handleFilterCheckboxChange = (option) => {
    setSelectedFilters(prevFilters => {
      const currentFilters = prevFilters[filterColumn] || [];
      const newFilters = currentFilters.includes(option)
        ? currentFilters.filter(item => item !== option)
        : [...currentFilters, option];
      return {
        ...prevFilters,
        [filterColumn]: newFilters
      };
    });
  };

  return (
    <div className="patients-page">
      {/* SECTION 1 */}
      <div className="patients-header">
        <h1>Emergency Room Patients</h1>
      </div>

      {/* SECTION 2 */}
      <div className="patients-welcome">
        <div className="welcome-text">
          <h2>Good morning, ER Admin</h2>
          <p>
            Here is what’s happening with ER Department from May 19 - May 25.
          </p>
        </div>
      </div>

      {/* SECTION 3 */}
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

      {/* SECTION 4 */}
      <div className="patients-table-section">
        <div className="table-responsive">
          <div className="list-header">
            <h2 className="section-title">PATIENTS LIST</h2>
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
          <table className="patients-table printable-table">
            <thead>
              <tr>
                <th>
                  <span>No</span>
                  <div className="header-actions">
                    <button
                      className="sort-header-btn"
                      onClick={() => requestSort("no")}
                      aria-sort={getSortIndicator("no")}
                      tabIndex={0}
                    >
                      <span className="sort-arrows">
                        <span
                          className={`arrow ${activeSortKey === "no" && sortDirections.no === "asc"
                              ? "is-active"
                              : ""
                            }`}
                        >
                          ▲
                        </span>
                        <span
                          className={`arrow ${activeSortKey === "no" &&
                              sortDirections.no === "desc"
                              ? "is-active"
                              : ""
                            }`}
                        >
                          ▼
                        </span>
                      </span>
                    </button>
                  </div>
                </th>
                <th>
                  <span>Name</span>
                  <div className="header-actions">
                    <button
                      className="sort-header-btn"
                      onClick={() => requestSort("name")}
                      aria-sort={getSortIndicator("name")}
                      tabIndex={0}
                    >
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
                  </div>
                </th>
                <th>
                  <span>Assigned Doctors</span>
                  <div className="header-actions">
                    <button
                      className="sort-header-btn"
                      onClick={() => requestSort("doctor")}
                      aria-sort={getSortIndicator("doctor")}
                      tabIndex={0}
                    >
                      <span className="sort-arrows">
                        <span
                          className={`arrow ${activeSortKey === "doctor" &&
                              sortDirections.doctor === "asc"
                              ? "is-active"
                              : ""
                            }`}
                        >
                          ▲
                        </span>
                        <span
                          className={`arrow ${activeSortKey === "doctor" &&
                              sortDirections.doctor === "desc"
                              ? "is-active"
                              : ""
                            }`}
                        >
                          ▼
                        </span>
                      </span>
                    </button>
                  </div>
                </th>
                <th>
                  <span>Date of Admit</span>
                  <div className="header-actions">
                    <button
                      className="sort-header-btn"
                      onClick={() => requestSort("date")}
                      aria-sort={getSortIndicator("date")}
                      tabIndex={0}
                    >
                      <span className="sort-arrows">
                        <span
                          className={`arrow ${activeSortKey === "date" &&
                              sortDirections.date === "asc"
                              ? "is-active"
                              : ""
                            }`}
                        >
                          ▲
                        </span>
                        <span
                          className={`arrow ${activeSortKey === "date" &&
                              sortDirections.date === "desc"
                              ? "is-active"
                              : ""
                            }`}
                        >
                          ▼
                        </span>
                      </span>
                    </button>
                  </div>
                </th>
                <th>
                  <span>Time of Admit</span>
                  <div className="header-actions">
                    <button
                      className="sort-header-btn"
                      onClick={() => requestSort("time")}
                      aria-sort={getSortIndicator("time")}
                      tabIndex={0}
                    >
                      <span className="sort-arrows">
                        <span
                          className={`arrow ${activeSortKey === "time" &&
                              sortDirections.time === "asc"
                              ? "is-active"
                              : ""
                            }`}
                        >
                          ▲
                        </span>
                        <span
                          className={`arrow ${activeSortKey === "time" &&
                              sortDirections.time === "desc"
                              ? "is-active"
                              : ""
                            }`}
                        >
                          ▼
                        </span>
                      </span>
                    </button>
                  </div>
                </th>
                <th>
                  <span>Complaint</span>
                  <div className="header-actions">
                    <button
                      className="sort-header-btn"
                      onClick={() => requestSort("complaint")}
                      aria-sort={getSortIndicator("complaint")}
                      tabIndex={0}
                    >
                      <span className="sort-arrows">
                        <span
                          className={`arrow ${activeSortKey === "complaint" &&
                              sortDirections.complaint === "asc"
                              ? "is-active"
                              : ""
                            }`}
                        >
                          ▲
                        </span>
                        <span
                          className={`arrow ${activeSortKey === "complaint" &&
                              sortDirections.complaint === "desc"
                              ? "is-active"
                              : ""
                            }`}
                        >
                          ▼
                        </span>
                      </span>
                    </button>
                  </div>
                </th>
                <th>
                  <span>Status</span>
                  <div className="header-actions">
                    <button
                      className="sort-header-btn"
                      onClick={() => requestSort("status")}
                      aria-sort={getSortIndicator("status")}
                      tabIndex={0}
                    >
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
                    {/* زر الفلتر المضاف */}
                    <button
                      className="filter-header-btn"
                      onClick={() => handleFilterClick("status")}
                    >
                      <LuFilter size={14} />
                    </button>
                  </div>
                </th>
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
                  <td className="actions-cell">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleViewDetails(row.no)}
                    >
                      <LuEye size={18} />
                    </button>
                    <button
                      className="action-btn delete-btn"
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
      <div className="pagination-wrapper">
        <button
          className="pagination-btn"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <LuChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
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

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setPatientToDelete(null);
        }}
        onConfirm={handleDeletePatient}
        itemType="patient"
      />

      {/* نافذة الفلتر المنبثقة */}
      {isFilterModalOpen && (
        <div className="filter-modal-overlay">
          <div className="filter-modal-content">
            <h3>Filter by {filterColumn}</h3>
            <div className="filter-options-container">
              {filterOptions.map((option) => (
                <label key={option} className="filter-option-label">
                  <input
                    type="checkbox"
                    checked={selectedFilters[filterColumn]?.includes(option) || false}
                    onChange={() => handleFilterCheckboxChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="filter-modal-actions">
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSelectedFilters(prev => ({ ...prev, [filterColumn]: [] }));
                  setIsFilterModalOpen(false);
                }}
              >
                Clear
              </button>
              <button
                className="close-modal-btn"
                onClick={() => setIsFilterModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;