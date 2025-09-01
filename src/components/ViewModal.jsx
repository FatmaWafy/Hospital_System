
import { LuEye, LuX } from "react-icons/lu"
import "./ViewModal.css"

const ViewModal = ({ isOpen, onClose, feedback }) => {
  if (!isOpen || !feedback) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <LuEye size={48} className="text-critical-red" />
          <h2 className="modal-title">View Message</h2>
        </div>
        <div className="modal-body">
          <p className="modal-message">{feedback.message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

        </div>
      </div>
    </div>
  )
}

export default ViewModal
