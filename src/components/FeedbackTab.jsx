"use client"

import { useState, useMemo } from "react"
import { LuEye, LuTrash2, LuSearch, LuPrinter, LuChevronLeft, LuChevronRight } from "react-icons/lu"
import DeleteModal from "./DeleteModal"
import ViewModal from "./ViewModal"
import "./FeedbackTab.css"

const FeedbackTab = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      firstName: "Ahmed",
      lastName: "Kamal",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 2,
      firstName: "Ali",
      lastName: "Sayed",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 3,
      firstName: "Mohamed",
      lastName: "Alo",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 4,
      firstName: "Shimaa",
      lastName: "Mostafa",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 5,
      firstName: "Noran",
      lastName: "Ali",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 6,
      firstName: "Laila",
      lastName: "Samir",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 7,
      firstName: "Asmaa",
      lastName: "Sami",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 8,
      firstName: "Mohamed",
      lastName: "Ali",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 9,
      firstName: "Shimaa",
      lastName: "Mostafa",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 10,
      firstName: "Noran",
      lastName: "Ali",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 11,
      firstName: "Hassan",
      lastName: "Mostafa",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 12,
      firstName: "Salma",
      lastName: "Mostafa",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
        {
      id: 13,
      firstName: "Noran",
      lastName: "Ali",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 14,
      firstName: "Laila",
      lastName: "Samir",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 15,
      firstName: "Asmaa",
      lastName: "Sami",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 16,
      firstName: "Mohamed",
      lastName: "Ali",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 17,
      firstName: "Shimaa",
      lastName: "Mostafa",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 18,
      firstName: "Noran",
      lastName: "Ali",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 19,
      firstName: "Hassan",
      lastName: "Mostafa",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
    {
      id: 20,
      firstName: "Salma",
      lastName: "Mostafa",
      email: "example.com",
      date: "11/5/2025",
      message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [feedbackToDelete, setFeedbackToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortDirections, setSortDirections] = useState({
    id: "asc",
    firstName: "asc",
    lastName: "asc",
    email: "asc",
    date: "asc",
    message: "asc",
  });
  const [activeSortKey, setActiveSortKey] = useState(null);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < feedbackTotalPages) setCurrentPage(currentPage + 1);
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
      firstName: (a, b) => a.firstName.localeCompare(b.firstName),
      lastName: (a, b) => a.lastName.localeCompare(b.lastName),
      email: (a, b) => a.email.localeCompare(b.email),
      date: (a, b) => {
        const parseDate = (dateStr) => {
          const [month, day, year] = dateStr.split("/").map(Number);
          return new Date(year, month - 1, day);
        };
        return parseDate(a.date).getTime() - parseDate(b.date).getTime();
      },
      message: (a, b) => a.message.localeCompare(b.message),
    };
  }, []);

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter(
      (feedback) =>
        (feedback.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedDate ? new Date(feedback.date).toLocaleDateString("en-CA") === selectedDate : true)
    );
  }, [feedbacks, searchTerm, selectedDate]);

  const sortedFeedbacks = useMemo(() => {
    if (!activeSortKey) {
      return filteredFeedbacks;
    }

    const direction = sortDirections[activeSortKey];
    const compare = compareFunctions[activeSortKey];

    return [...filteredFeedbacks].sort((a, b) => {
      let comparison = compare(a, b);
      if (direction === "desc") {
        comparison *= -1;
      }
      return comparison;
    });
  }, [filteredFeedbacks, activeSortKey, sortDirections, compareFunctions]);

  const feedbackTotalPages = Math.ceil(sortedFeedbacks.length / itemsPerPage);

  const feedbackPageData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedFeedbacks.slice(start, end);
  }, [sortedFeedbacks, currentPage]);

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback)
    setIsViewModalOpen(true)
  }

  const handleDeleteClick = (feedback) => {
    setFeedbackToDelete(feedback)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (feedbackToDelete) {
      setFeedbacks(feedbacks.filter((f) => f.id !== feedbackToDelete.id))
      setIsDeleteModalOpen(false)
      setFeedbackToDelete(null)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div >
      <div className="feedback-table-section">
        <div className='list-header'>
          <h2 className='profile-title'>FEED BACKS LIST</h2>
          <div className='list-actions'>
            <input
              type='date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='date-picker'
            />
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

        <table className="feedback-table printable-table">
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
                  onClick={() => requestSort("firstName")}
                  aria-sort={getSortIndicator("firstName")}
                  tabIndex={0}
                >
                  First Name
                  <span className="sort-arrows">
                    <span
                      className={`arrow ${
                        activeSortKey === "firstName" && sortDirections.firstName === "asc"
                          ? "is-active"
                          : ""
                      }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`arrow ${
                        activeSortKey === "firstName" && sortDirections.firstName === "desc"
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
                  onClick={() => requestSort("lastName")}
                  aria-sort={getSortIndicator("lastName")}
                  tabIndex={0}
                >
                  Last Name
                  <span className="sort-arrows">
                    <span
                      className={`arrow ${
                        activeSortKey === "lastName" && sortDirections.lastName === "asc"
                          ? "is-active"
                          : ""
                      }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`arrow ${
                        activeSortKey === "lastName" && sortDirections.lastName === "desc"
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
                  onClick={() => requestSort("email")}
                  aria-sort={getSortIndicator("email")}
                  tabIndex={0}
                >
                  Email
                  <span className="sort-arrows">
                    <span
                      className={`arrow ${
                        activeSortKey === "email" && sortDirections.email === "asc"
                          ? "is-active"
                          : ""
                      }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`arrow ${
                        activeSortKey === "email" && sortDirections.email === "desc"
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
                  Date
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
                        activeSortKey === "date" && sortDirections.date === "desc"
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
                  onClick={() => requestSort("message")}
                  aria-sort={getSortIndicator("message")}
                  tabIndex={0}
                >
                  Message
                  <span className="sort-arrows">
                    <span
                      className={`arrow ${
                        activeSortKey === "message" && sortDirections.message === "asc"
                          ? "is-active"
                          : ""
                      }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`arrow ${
                        activeSortKey === "message" && sortDirections.message === "desc"
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
            {feedbackPageData.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.firstName}</td>
                <td>{feedback.lastName}</td>
                <td>{feedback.email}</td>
                <td>{feedback.date}</td>
                <td className="message-cell">
                  <span className="message-preview">
                    {feedback.message.length > 30 ? `${feedback.message.substring(0, 30)}...` : feedback.message}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="action-btn view-btn"
                    onClick={() => handleViewFeedback(feedback)}
                    title="View Message"
                  >
                    <LuEye size={18} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteClick(feedback)}
                    title="Delete Message"
                  >
                    <LuTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='pagination'>
          <button
            className='pagination-btn'
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <LuChevronLeft size={18} />
          </button>
          {Array.from({ length: feedbackTotalPages }).map((_, i) => (
            <button
              key={i + 1}
              className={`pagination-page ${currentPage === i + 1 ? "active" : ""
                }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <span className='pagination-dots'>...</span>
          <button
            className='pagination-btn'
            onClick={handleNextPage}
            disabled={currentPage === feedbackTotalPages}
          >
            <LuChevronRight size={18} />
          </button>
        </div>

      </div>

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedFeedback(null)
        }}
        feedback={selectedFeedback}
        onDelete={() => {
          setIsViewModalOpen(false)
          handleDeleteClick(selectedFeedback)
        }}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setFeedbackToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        itemType="Message"
      />
    </div>
  )
}

export default FeedbackTab