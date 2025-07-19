import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  {
    name: "Overview",
    path: "/",
    icon: "/overview.svg",
    activeIcon: "/overview-active.svg",
  },
  {
    name: "Doctors",
    path: "/doctors",
    icon: "/doc.svg",
    activeIcon: "/doc-active.svg",
  },
  {
    name: "Patients",
    path: "/patients",
    icon: "/patient.svg",
    activeIcon: "/patient-active.svg",
  },
  {
    name: "My Profile",
    path: "/profile",
    icon: "/profile.svg",
    activeIcon: "/profile-active.svg",
  },
];

const settingsItems = [
  {
    name: "Settings",
    path: "/settings",
    icon: "/setting.svg",
    activeIcon: "/setting-active.svg",
  },
  {
    name: "Help Center",
    path: "/help",
    icon: "/helpcenter.svg",
    activeIcon: "/helpcenter-active.svg",
  },
];

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        {/* Logo */}
        <div className="sidebar-logo">
          <img src="/Logo.svg" alt="Logo" className="logo-img" />
        </div>

        {/* Navigation */}
        <div className="sidebar-menu">
          <div className="sidebar-section">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-item active" : "sidebar-item"
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? item.activeIcon : item.icon}
                      alt={`${item.name} icon`}
                      className="sidebar-icon"
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <hr className="sidebar-separator" />

          <div className="sidebar-settings-label">SETTINGS</div>

          <div className="sidebar-section">
            {settingsItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-item active" : "sidebar-item"
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? item.activeIcon : item.icon}
                      alt={`${item.name} icon`}
                      className="sidebar-icon"
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer to push the sidebar-user further down */}
      <div className="sidebar-spacer"></div>

      {/* User Info + Logout */}
      <div className="sidebar-user">
        <div className="user-info">
          <img
            src="/avatar.svg"
            alt="Profile"
            className="profile-pic-img"
          />
          <div className="user-details">
            <div className="user-name">Ahmed Safwat</div>
            <div className="user-email">a.safwat@gmail.com</div>
          </div>
        </div>
        <button className="logout-button">
          <img
            src="/logout.svg"
            alt="Logout Icon"
            className="logout-icon-img"
          />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
