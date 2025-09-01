"use client"

import { useState } from "react"
import { LuEye, LuTrash2, LuSearch, LuPrinter, LuChevronLeft, LuChevronRight } from "react-icons/lu"
import DeleteModal from "./DeleteModal"
import ViewModal from "./ViewModal"
import "./FeedbackTab.css"

const FeedbackTab = () => {
    // Mock data - ready for backend integration
    const [allFeedbacks] = useState([
        {
            id: 1,
            firstName: "Ahmed",
            lastName: "Kamal",
            email: "ahmed.kamal@example.com",
            date: "11/5/2025",
            message: "Hi, I've Comment on triage Screens, if you make it more simple it will be appreciated. thanks",
        },
        {
            id: 2,
            firstName: "Ali",
            lastName: "Sayed",
            email: "ali.sayed@example.com",
            date: "11/5/2025",
            message: "The emergency room interface needs improvement. The current design is confusing for new users.",
        },
        {
            id: 3,
            firstName: "Mohamed",
            lastName: "Alo",
            email: "mohamed.alo@example.com",
            date: "11/5/2025",
            message: "Great system overall, but the patient registration process could be streamlined better.",
        },
        {
            id: 4,
            firstName: "Shimaa",
            lastName: "Mostafa",
            email: "shimaa.mostafa@example.com",
            date: "11/5/2025",
            message: "The notification system works well, but sometimes there are delays in critical alerts.",
        },
        {
            id: 5,
            firstName: "Noran",
            lastName: "Ali",
            email: "noran.ali@example.com",
            date: "11/5/2025",
            message: "Love the new dashboard design! It's much more intuitive than the previous version.",
        },
        {
            id: 6,
            firstName: "Laila",
            lastName: "Samir",
            email: "laila.samir@example.com",
            date: "11/5/2025",
            message: "The search functionality needs improvement. It's hard to find specific patient records quickly.",
        },
        {
            id: 7,
            firstName: "Asmaa",
            lastName: "Sami",
            email: "asmaa.sami@example.com",
            date: "11/5/2025",
            message: "The mobile version of the app needs work. Some buttons are too small to tap easily.",
        },
        {
            id: 8,
            firstName: "Mohamed",
            lastName: "Ali",
            email: "mohamed.ali@example.com",
            date: "11/5/2025",
            message: "Excellent work on the patient tracking system. It has improved our workflow significantly.",
        },
        {
            id: 9,
            firstName: "Shimaa",
            lastName: "Mostafa",
            email: "shimaa.m2@example.com",
            date: "10/5/2025",
            message: "The reporting feature is very helpful, but it would be great to have more export options.",
        },
        {
            id: 10,
            firstName: "Noran",
            lastName: "Ali",
            email: "noran.a2@example.com",
            date: "10/5/2025",
            message: "The system crashes occasionally during peak hours. Please look into server capacity.",
        },
        {
            id: 11,
            firstName: "Hassan",
            lastName: "Ahmed",
            email: "hassan.ahmed@example.com",
            date: "10/5/2025",
            message: "The user interface is clean and professional. Great job on the design team!",
        },
        {
            id: 12,
            firstName: "Fatima",
            lastName: "Omar",
            email: "fatima.omar@example.com",
            date: "10/5/2025",
            message: "Need better integration with the pharmacy system for medication tracking.",
        },
        {
            id: 13,
            firstName: "Youssef",
            lastName: "Mahmoud",
            email: "youssef.mahmoud@example.com",
            date: "09/5/2025",
            message: "The backup system works well, but recovery time could be faster in emergencies.",
        },
        {
            id: 14,
            firstName: "Mona",
            lastName: "Hassan",
            email: "mona.hassan@example.com",
            date: "09/5/2025",
            message: "Love the new color scheme! It's easier on the eyes during long shifts.",
        },
        {
            id: 15,
            firstName: "Omar",
            lastName: "Farid",
            email: "omar.farid@example.com",
            date: "09/5/2025",
            message: "The patient history feature is comprehensive. It helps a lot in diagnosis.",
        },
        {
            id: 16,
            firstName: "Dina",
            lastName: "Salah",
            email: "dina.salah@example.com",
            date: "08/5/2025",
            message: "The scheduling system needs improvement. Double bookings still occur sometimes.",
        },
        {
            id: 17,
            firstName: "Khaled",
            lastName: "Nasser",
            email: "khaled.nasser@example.com",
            date: "08/5/2025",
            message: "Great security features! The two-factor authentication works smoothly.",
        },
        {
            id: 18,
            firstName: "Aya",
            lastName: "Mostafa",
            email: "aya.mostafa@example.com",
            date: "08/5/2025",
            message: "The print functionality needs work. Some reports don't format correctly.",
        },
        {
            id: 19,
            firstName: "Tarek",
            lastName: "Ibrahim",
            email: "tarek.ibrahim@example.com",
            date: "07/5/2025",
            message: "The system is fast and reliable. Rarely experience any downtime.",
        },
        {
            id: 20,
            firstName: "Rania",
            lastName: "Adel",
            email: "rania.adel@example.com",
            date: "07/5/2025",
            message: "Would love to see more customization options for the dashboard layout.",
        },
        {
            id: 21,
            firstName: "Amr",
            lastName: "Saeed",
            email: "amr.saeed@example.com",
            date: "07/5/2025",
            message: "The training materials are helpful, but video tutorials would be even better.",
        },
        {
            id: 22,
            firstName: "Heba",
            lastName: "Fouad",
            email: "heba.fouad@example.com",
            date: "06/5/2025",
            message: "The emergency alert system is excellent. It has helped save lives.",
        },
    ])

    const [feedbacks, setFeedbacks] = useState(allFeedbacks)
    const [searchTerm, setSearchTerm] = useState("")
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedFeedback, setSelectedFeedback] = useState(null)
    const [feedbackToDelete, setFeedbackToDelete] = useState(null)

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Filter feedbacks based on search term
    const filteredFeedbacks = feedbacks.filter(
        (feedback) =>
            feedback.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.message.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Calculate pagination
    const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentFeedbacks = filteredFeedbacks.slice(startIndex, endIndex)

    // Reset to first page when search changes
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }

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
            const updatedFeedbacks = feedbacks.filter((f) => f.id !== feedbackToDelete.id)
            setFeedbacks(updatedFeedbacks)

            // Adjust current page if necessary
            const newTotalPages = Math.ceil(updatedFeedbacks.length / itemsPerPage)
            if (currentPage > newTotalPages && newTotalPages > 0) {
                setCurrentPage(newTotalPages)
            }

            setIsDeleteModalOpen(false)
            setFeedbackToDelete(null)
        }
    }

    const handlePrint = () => {
        window.print()
    }

    // Pagination handlers
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push("...")
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push("...")
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push("...")
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push("...")
                pages.push(totalPages)
            }
        }

        return pages
    }

    return (
        <div  >
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
                        {filteredFeedbacks.map((feedback, index) => (
                            <tr key={feedback.id}>
                                <td>{index + 1}</td>
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

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="feedback-pagination">
                        <button className="pagination-btn" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <LuChevronLeft size={18} />
                        </button>

                        {getPageNumbers().map((page, index) => (
                            <span key={index}>
                                {page === "..." ? (
                                    <span className="pagination-dots">...</span>
                                ) : (
                                    <button
                                        className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                )}
                            </span>
                        ))}

                        <button className="pagination-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <LuChevronRight size={18} />
                        </button>
                    </div>
                )}

                {/* Results info */}
                <div className="feedback-results-info">
                    <span className="results-text">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredFeedbacks.length)} of {filteredFeedbacks.length}{" "}
                        entries
                        {searchTerm && ` (filtered from ${allFeedbacks.length} total entries)`}
                    </span>
                </div>
            </div>

            {/* View Modal */}
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

            {/* Delete Modal */}
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
