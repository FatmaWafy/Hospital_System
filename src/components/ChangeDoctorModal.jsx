import { useState } from "react";
import { LuUsers, LuX } from "react-icons/lu";
import "./DeleteModal.css"; // نستخدم نفس ستايل المودال
import "./ChangeDoctorModal.css"; // نستخدم نفس ستايل المودال

const ChangeDoctorModal = ({ isOpen, onClose, onConfirm, currentDoctor }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(currentDoctor);

  // بيانات وهمية (Mock Data) - استبدلها بالـ API
  const mockDoctors = [
    { id: 1, name: "Dr. Ali Mohamed" },
    { id: 2, name: "Dr. Ahmed Hossam" },
    { id: 3, name: "Dr. Mona Kamal" },
    { id: 4, name: "Dr. Tarek Essam" },
  ];

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedDoctor) {
      onConfirm(selectedDoctor);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        

        {/* الهيدر */}
        <div className="modal-header">
          <LuUsers size={40} className="text-primary-blue" />
          <h2 className="modal-title">Change Doctor</h2>
        </div>

        {/* البودي */}
        <div className="modal-body">


          <div className="form-group">
            <label htmlFor="doctor-select" className="input-label">
              Please Select a Doctor to assign.
            </label>
            <select
              id="doctor-select"
              value={selectedDoctor?.id || ""}
              onChange={(e) => {
                const newDoc = mockDoctors.find(
                  (doc) => doc.id === parseInt(e.target.value)
                );
                setSelectedDoctor(newDoc);
              }}
              className="modal-select-input"
            >
              <option value="" disabled>
                Select a doctor
              </option>
              {mockDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* الفوتر */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-danger" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeDoctorModal;
