import React, { useState, useMemo } from "react";
import {
  LuFileEdit,
  LuTrash2,
  LuPrinter,
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
  LuFilter,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const DoctorsTab = ({
  doctors,
  setDoctors,
  searchTerm,
  setSearchTerm,
  doctorCurrentPage,
  setDoctorCurrentPage,
  doctorItemsPerPage,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedDoctor,
  setSelectedDoctor,
}) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [sortDirections, setSortDirections] = useState({
    id: "asc",
    name: "asc",
    specialty: "asc",
    level: "asc",
    loginDate: "asc",
    status: "asc",
  });
  const [activeSortKey, setActiveSortKey] = useState(null);

  // Filter state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterColumn, setFilterColumn] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleDeleteDoctor = () => {
    if (selectedDoctor) {
      const filtered = doctors.filter((d) => d.id !== selectedDoctor.id);
      setDoctors(filtered);
      setIsDeleteModalOpen(false);
      setSelectedDoctor(null);
    }
  };

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
      id: (a, b) => Number(a.id) - Number(b.id),
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
        const parseDate = (dateStr) => {
          const [day, month, year] = dateStr.split("/").map(Number);
          return new Date(year, month - 1, day);
        };
        return parseDate(a.loginDate).getTime() - parseDate(b.loginDate).getTime();
      },
      status: (a, b) => {
        const aVal = a.status === "online" ? 0 : 1;
        const bVal = b.status === "online" ? 0 : 1;
        return aVal - bVal;
      },
    };
  }, []);

  const filteredDoctors = useMemo(() => {
    let result = doctors.filter(
      (d) =>
        (d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedDate
          ? new Date(d.loginDate).toLocaleDateString("en-CA") === selectedDate
          : true)
    );

    // Apply filters
    Object.keys(selectedFilters).forEach((key) => {
      const filters = selectedFilters[key];
      if (filters && filters.length > 0) {
        result = result.filter((doctor) => filters.includes(doctor[key]));
      }
    });

    return result;
  }, [doctors, searchTerm, selectedDate, selectedFilters]);

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

  const doctorTotalPages = Math.ceil(
    sortedDoctors.length / doctorItemsPerPage
  );
  const doctorPageData = useMemo(() => {
    const start = (doctorCurrentPage - 1) * doctorItemsPerPage;
    const end = start + doctorItemsPerPage;
    return sortedDoctors.slice(start, end);
  }, [sortedDoctors, doctorCurrentPage, doctorItemsPerPage]);

  const handlePrevPage = () => {
    if (doctorCurrentPage > 1) setDoctorCurrentPage(doctorCurrentPage - 1);
  };

  const handleNextPage = () => {
    if (doctorCurrentPage < doctorTotalPages)
      setDoctorCurrentPage(doctorCurrentPage + 1);
  };

  const handlePrint = () => {
    window.print();
  };

  // Handle filter click
  const handleFilterClick = (key) => {
    setFilterColumn(key);
    const uniqueOptions = [...new Set(doctors.map((d) => d[key]))];
    setFilterOptions(uniqueOptions);
    setIsFilterModalOpen(true);
  };

  const handleFilterCheckboxChange = (option) => {
    setSelectedFilters((prevFilters) => {
      const currentFilters = prevFilters[filterColumn] || [];
      const newFilters = currentFilters.includes(option)
        ? currentFilters.filter((item) => item !== option)
        : [...currentFilters, option];
      return {
        ...prevFilters,
        [filterColumn]: newFilters,
      };
    });
  };

  return (
    <div>
      <div className="hint-container">
        <p className="hint-text-doctors">
          To register a new doctor, enter: Full Name, Email, Phone Number, Level, and Specialty.
        </p>
        <button className="add-btn" onClick={() => navigate("/settings/add-doctor")}>
          + Add New Doctor
        </button>
      </div>
      <div className="specialties-table-section">
        <div className="list-header">
          <h2 className="profile-title">DOCTORS LIST</h2>
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
                <span>No</span>
                <div className="header-actions">
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("id")}
                    aria-sort={getSortIndicator("id")}
                    tabIndex={0}
                  >
                    <span className="sort-arrows">
                      <span className={`arrow ${activeSortKey === "id" && sortDirections.id === "asc" ? "is-active" : ""}`}>▲</span>
                      <span className={`arrow ${activeSortKey === "id" && sortDirections.id === "desc" ? "is-active" : ""}`}>▼</span>
                    </span>
                  </button>
                </div>
              </th>
              <th>
                <span>Dr-Name</span>
                <div className="header-actions">
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("name")}
                    aria-sort={getSortIndicator("name")}
                    tabIndex={0}
                  >
                    <span className="sort-arrows">
                      <span className={`arrow ${activeSortKey === "name" && sortDirections.name === "asc" ? "is-active" : ""}`}>▲</span>
                      <span className={`arrow ${activeSortKey === "name" && sortDirections.name === "desc" ? "is-active" : ""}`}>▼</span>
                    </span>
                  </button>
                </div>
              </th>
              <th>
                <span>Specialty</span>
                <div className="header-actions">
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("specialty")}
                    aria-sort={getSortIndicator("specialty")}
                    tabIndex={0}
                  >
                    <span className="sort-arrows">
                      <span className={`arrow ${activeSortKey === "specialty" && sortDirections.specialty === "asc" ? "is-active" : ""}`}>▲</span>
                      <span className={`arrow ${activeSortKey === "specialty" && sortDirections.specialty === "desc" ? "is-active" : ""}`}>▼</span>
                    </span>
                  </button>
                  <button
                    className="filter-header-btn"
                    onClick={() => handleFilterClick("specialty")}
                  >
                    <LuFilter size={14} />
                  </button>
                </div>
              </th>
              <th>
                <span>Level</span>
                <div className="header-actions">
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("level")}
                    aria-sort={getSortIndicator("level")}
                    tabIndex={0}
                  >
                    <span className="sort-arrows">
                      <span className={`arrow ${activeSortKey === "level" && sortDirections.level === "asc" ? "is-active" : ""}`}>▲</span>
                      <span className={`arrow ${activeSortKey === "level" && sortDirections.level === "desc" ? "is-active" : ""}`}>▼</span>
                    </span>
                  </button>
                  <button
                    className="filter-header-btn"
                    onClick={() => handleFilterClick("level")}
                  >
                    <LuFilter size={14} />
                  </button>
                </div>
              </th>
              <th>
                <span>Last Login Date</span>
                <div className="header-actions">
                  <button
                    className="sort-header-btn"
                    onClick={() => requestSort("loginDate")}
                    aria-sort={getSortIndicator("loginDate")}
                    tabIndex={0}
                  >
                    <span className="sort-arrows">
                      <span className={`arrow ${activeSortKey === "loginDate" && sortDirections.loginDate === "asc" ? "is-active" : ""}`}>▲</span>
                      <span className={`arrow ${activeSortKey === "loginDate" && sortDirections.loginDate === "desc" ? "is-active" : ""}`}>▼</span>
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
                      <span className={`arrow ${activeSortKey === "status" && sortDirections.status === "asc" ? "is-active" : ""}`}>▲</span>
                      <span className={`arrow ${activeSortKey === "status" && sortDirections.status === "desc" ? "is-active" : ""}`}>▼</span>
                    </span>
                  </button>
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
            {doctorPageData.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.specialty}</td>
                <td>{d.level}</td>
                <td>{d.loginDate}</td>
                <td>
                  <span className={`status-badge ${d.status === "online" ? "online" : "offline"}`}>
                    {d.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="action-btn view-btn"
                    onClick={() => navigate(`/settings/edit-doctor/${d.id}`)}
                  >
                    <LuFileEdit size={18} />
                  </button>
                  <button
                    className="action-btn delete-btn"
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

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={doctorCurrentPage === 1}
          >
            <LuChevronLeft size={18} />
          </button>
          {Array.from({ length: doctorTotalPages }).map((_, i) => (
            <button
              key={i + 1}
              className={`pagination-page ${doctorCurrentPage === i + 1 ? "active" : ""}`}
              onClick={() => setDoctorCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <span className="pagination-dots">...</span>
          <button
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={doctorCurrentPage === doctorTotalPages}
          >
            <LuChevronRight size={18} />
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteDoctor}
        itemType="Doctor"
      />

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
                  setSelectedFilters((prev) => ({ ...prev, [filterColumn]: [] }));
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

export default DoctorsTab;
