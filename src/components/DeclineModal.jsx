import { LuXCircle } from "react-icons/lu";
import "./DeleteModal.css"; // نستعمل نفس ملف الستايل بتاع المودال

const DeclineModal = ({ isOpen, onClose, onConfirm, itemType = "Request" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <LuXCircle size={48} className="text-critical-red" />
          <h2 className="modal-title">Decline Confirmation</h2>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p className="modal-message">
            Are you sure you want to Decline this {itemType.toLowerCase()}?
          </p>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeclineModal;
