import { useState } from "react";
import { LuFileCheck, LuX } from "react-icons/lu";
import "./DeleteModal.css";
import "./ChangeDoctorModal.css";

const ChangePatientStatusModal = ({ isOpen, onClose, onConfirm, currentStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(""); // ✅ حالة للنوتس

  const mockStatuses = [
    "In Consultation",
    "In Triage",
    "Waiting for Test",
    "Discharged",
    "Admitted",
  ];

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedStatus) {
      onConfirm({ status: selectedStatus, notes }); // ✅ نبعت الاتنين مع بعض
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <LuX size={20} />
        </button>

        <div className="modal-header">
          <LuFileCheck size={40} className="text-primary-blue" />
          <h2 className="modal-title">Change Patient’s Fate</h2>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="status-select" className="input-label">
              Please Select the patient outcome.
            </label>
            <select
              id="status-select"
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="modal-select-input"
            >
              {mockStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ حقل النوتس */}
          <div className="form-group">
            <label htmlFor="notes" className="input-label">
              Add Notes (Optional):
            </label>
            <input
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="modal-input"
              placeholder="Write notes here..."
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-danger" onClick={handleConfirm}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePatientStatusModal;
