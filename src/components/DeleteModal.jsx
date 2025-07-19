"use client"
import { LuX,  LuTrash2 } from "react-icons/lu"
import "./DeleteModal.css"

const DeleteModal = ({ isOpen, onClose, onConfirm, itemType = "Doctor" }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <LuTrash2 size={48} className="text-critical-red" />
          <h2 className="modal-title">Delete Confirmation</h2>
        </div>
        <div className="modal-body">
          <p className="modal-message">Are you sure you want to Delete this {itemType}?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal