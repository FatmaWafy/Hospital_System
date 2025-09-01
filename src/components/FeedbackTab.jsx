"use client"

import { useState } from "react"
import { LuEye, LuTrash2, LuSearch, LuPrinter, LuChevronLeft, LuChevronRight } from "react-icons/lu"
import DeleteModal from "./DeleteModal"
import ViewModal from "./ViewModal"
import "./FeedbackTab.css"

const FeedbackTab = () => {
  // Mock data - ready for backend integration
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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [feedbackToDelete, setFeedbackToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  // Filter feedbacks based on search term
  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const feedbackTotalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);

  const feedbackPageData = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < feedbackTotalPages) setCurrentPage(currentPage + 1);
  };


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
              <th>No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbackPageData.map((feedback, index) => (
              <tr key={feedback.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
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