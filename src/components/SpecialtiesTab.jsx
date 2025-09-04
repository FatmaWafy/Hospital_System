import React, { useState, useMemo } from "react";
import {
  LuFileEdit,
  LuTrash2,
  LuPrinter,
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import AddSpecialtyModal from "./AddSpecialtyModal";
import EditSpecialtyModal from "./EditSpecialtyModal";
import DeleteModal from "./DeleteModal";

// Add this to Doctors.css or a global stylesheet
// .sort-arrows { margin-left: 6px; font-size: 12px; }
// .sort-arrows .arrow { opacity: 0.45; cursor: pointer; }
// .sort-arrows .arrow.is-active { opacity: 1; font-weight: 700; }

const SpecialtiesTab = ({
  specialties,
  setSpecialties,
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  isAddModalOpen,
  setIsAddModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedSpecialty,
  setSelectedSpecialty,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [sortDirections, setSortDirections] = useState({
    id: "asc",
    name: "asc",
    addedBy: "asc",
    date: "asc",
    status: "asc",
  });
  const [activeSortKey, setActiveSortKey] = useState(null);

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
      addedBy: (a, b) => a.addedBy.localeCompare(b.addedBy),
      date: (a, b) => {
        const parseDate = (dateStr) => {
          const [day, month, year] = dateStr.split("/").map(Number);
          return new Date(year, month - 1, day);
        };
        return parseDate(a.date).getTime() - parseDate(b.date).getTime();
      },
      status: (a, b) => {
        const aVal = a.status === "Enabled" ? 0 : 1;
        const bVal = b.status === "Enabled" ? 0 : 1;
        return aVal - bVal;
      },
    };
  }, []);

  const filteredSpecialties = useMemo(() => {
    return specialties.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDate
          ? new Date(s.date).toLocaleDateString("en-CA") === selectedDate
          : true)
    );
  }, [specialties, searchTerm, selectedDate]);

  const sortedSpecialties = useMemo(() => {
    if (!activeSortKey) {
      return filteredSpecialties;
    }

    const direction = sortDirections[activeSortKey];
    const compare = compareFunctions[activeSortKey];

    return [...filteredSpecialties].sort((a, b) => {
      let comparison = compare(a, b);
      if (direction === "desc") {
        comparison *= -1;
      }
      return comparison;
    });
  }, [filteredSpecialties, activeSortKey, sortDirections, compareFunctions]);

  const specialtyTotalPages = Math.ceil(
    sortedSpecialties.length / itemsPerPage
  );
  const specialtyPageData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedSpecialties.slice(start, end);
  }, [sortedSpecialties, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < specialtyTotalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="hint-container">
        <p className="hint-text">
          After adding a new specialty, assign doctors to it from the{" "}
          <Link
            to="/settings"
            onClick={() => setActiveTab("doctors")}
            className="doctors-link"
          >
            Doctors page
          </Link>
          . <br /> Make sure the specialty status is ENABLED for it to appear in
          the list.
        </p>
        <button
          className="add-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add New Specialty
        </button>
      </div>
      <div className="specialties-table-section">
        <div className="list-header">
          <h2 className="profile-title">SPECIALTIES LIST</h2>
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

        <table className="specialties-table printable-table">
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
                      className={`arrow ${
                        activeSortKey === "id" && sortDirections.id === "asc"
                          ? "is-active"
                          : ""
                      }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`arrow ${
                        activeSortKey === "id" && sortDirections.id === "desc"
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
                  Specialty
                  <span className="sort-arrows">
                    <span
                      className={`arrow ${
                        activeSortKey === "name" && sortDirections.name === "asc"
                          ? "is-active"
                          : ""
                      }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`arrow ${
                        activeSortKey === "name" &&
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
                  onClick={() => requestSort("addedBy")}
                  aria-sort={getSortIndicator("addedBy")}
                  tabIndex={0}
                >
                  Added By
                  <span className="sort-arrows">
                    <span
                      className={`arrow ${
                        activeSortKey === "addedBy" &&
                        sortDirections.addedBy === "asc"
                          ? "is-active"
                          : ""
                      }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`arrow ${
                        activeSortKey === "addedBy" &&
                        sortDirections.addedBy === "desc"
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
                  onClick={() => requestSort("date")}
                  aria-sort={getSortIndicator("date")}
                  tabIndex={0}
                >
                  Date Added
                  <span className="sort-arrows">
                    <span
                      className={`arrow ${
                        activeSortKey === "date" && sortDirections.date === "asc"
                          ? "is-active"
                          : ""
                      }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`arrow ${
                        activeSortKey === "date" &&
                        sortDirections.date === "desc"
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
                      className={`arrow ${
                        activeSortKey === "status" &&
                        sortDirections.status === "asc"
                          ? "is-active"
                          : ""
                      }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`arrow ${
                        activeSortKey === "status" &&
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
            {specialtyPageData.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.addedBy}</td>
                <td>{s.date}</td>
                <td>
                  <span
                    className={`status-badge ${
                      s.status === "Enabled" ? "online" : "offline"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="action-btn view-btn"
                    onClick={() => {
                      setSelectedSpecialty(s);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <LuFileEdit size={18} />
                  </button>
                  <button
                    className="action-btn delete-btn"
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

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <LuChevronLeft size={18} />
          </button>
          {Array.from({ length: specialtyTotalPages }).map((_, i) => (
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
          <span className="pagination-dots">...</span>
          <button
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === specialtyTotalPages}
          >
            <LuChevronRight size={18} />
          </button>
        </div>
      </div>
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
        onConfirm={handleDeleteSpecialty}
        itemType="Specialty"
      />
    </div>
  );
};

export default SpecialtiesTab;