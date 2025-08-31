import React, { useState, useEffect } from "react";
import "./Modal.css";
import { LuFileEdit, LuPlus } from "react-icons/lu";

const EditSpecialtyModal = ({ isOpen, onClose, specialty, onSave }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Enabled");

  useEffect(() => {
    if (specialty) {
      setName(specialty.name || "");
      setStatus(specialty.status || "Enabled");
    }
  }, [specialty]);

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content second'>
        <div className='modal-header'>
          <LuFileEdit size={48} className='text-critical-red' />
          <h2 style={{ color: "#0d425d", marginBottom: "0px" }}>
            Edit Specialty
          </h2>{" "}
        </div>

        <div
          className='modal-body'
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "0px",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <label
              style={{
                fontWeight: "bold",
                color: "#0d425d",
                marginBottom: "5px",
              }}
            >
              Specialty Name:
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "250px",
                padding: "8px",
                border: "1px solid #0d425d",
                fontWeight: "bold",
                color: "#0d425d",
                borderRadius: "5px",
                fontSize: "13px",
                opacity: 0.5,
              }}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label
              style={{
                fontWeight: "bold",
                color: "#0d425d",
                marginBottom: "5px",
              }}
            >
              Status:
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                width: "250px",
                padding: "8px 12px",
                border: "1px solid #0d425d",
                borderRadius: "5px",
                fontSize: "13px",
                backgroundColor: "#fff",
                fontWeight: "bold",
                color: "#0d425d",
                appearance: "none",
                cursor: "pointer",
              }}
            >
              <option
                value='Enabled'
                style={{ backgroundColor: "#fff", color: "#0d425d" }}
              >
                Enabled
              </option>
              <option
                value='Disabled'
                style={{ backgroundColor: "#fff", color: "#0d425d" }}
              >
                Disabled
              </option>
            </select>
          </div>{" "}
        </div>

        <div className='modal-footer' style={{ marginTop: "20px" }}>
          <button className='btn-secondary' onClick={onClose}>
            Cancel
          </button>
          <button
            className='btn-danger'
            onClick={() => onSave({ ...specialty, name, status })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSpecialtyModal;
