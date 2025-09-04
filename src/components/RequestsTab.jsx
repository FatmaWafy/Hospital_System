 
const RequestsTab = ({
  addPatients,
  setAddPatients,
  allowAssign,
  setAllowAssign,
  allowConsult,
  setAllowConsult,
  allowChangeStatus,
  setAllowChangeStatus,
  notificationMessage,
  setNotificationMessage,
  handleSavePermissions,
  handleSendNotification,
}) => {
  return (
    <div>
      <p className="profile-title">Requests</p>
      <div className="permissions-section">
        <label>
          <input
            type="checkbox"
            checked={addPatients}
            onChange={(e) => setAddPatients(e.target.checked)}
          />
          Add New Patients
        </label>
        <label>
          <input
            type="checkbox"
            checked={allowAssign}
            onChange={(e) => setAllowAssign(e.target.checked)}
          />
          Allow Assign Patients
        </label>
        <label>
          <input
            type="checkbox"
            checked={allowConsult}
            onChange={(e) => setAllowConsult(e.target.checked)}
          />
          Allow Consultation Requests
        </label>
        <label>
          <input
            type="checkbox"
            checked={allowChangeStatus}
            onChange={(e) => setAllowChangeStatus(e.target.checked)}
          />
          Allow Change Status
        </label>
        <div className="action-buttons-group">
          <button className="btn-save" onClick={handleSavePermissions}>
            Save
          </button>
        </div>
      </div>
      <h2 className="profile-title">Send Notification</h2>
      <textarea
        value={notificationMessage}
        onChange={(e) => setNotificationMessage(e.target.value.slice(0, 100))}
        placeholder="Enter your message here, it will be sent to all doctors' notification centers."
        className="notification-textarea"
      />
      <div className="character-count">
        Maximum 100 characters
        <span>{notificationMessage.length} / 100</span>
      </div>
      <div className="action-buttons-group">
        <button className="btn-send" onClick={handleSendNotification}>
          Send
        </button>
      </div>
    </div>
  );
};

export default RequestsTab;
 