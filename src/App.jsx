import { useState, useRef, useEffect } from "react";
import kalilogo from "./assets/Kali-dragon-icon.svg";
import terminal from "./assets/1.png";
import folder from "./assets/3.png";
import browser from "./assets/5.png";
import upper from "./assets/vecteezy_abstract-blue-candlestick-chart-stock-market-finance_60119309.png";
import volumeIcon from "./assets/volume.svg";
import muteIcon from "./assets/mute.png";
import user from "./assets/user.svg";
import bell from "./assets/bell.svg";

import ApplicationsMenu from "./componenets/ApplicationsMenu";
import TerminalEmulator from "./componenets/Terminal-Emulator/Terminal-Emulator";
import RootTerminalEmulator from "./componenets/Root-Terminal-Emulator/Root-Terminal-Emulator";
import FileManager from "./componenets/FileManager/FileManager";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeApp, setActiveApp] = useState(null);

  // Functional states
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef();
  const userRef = useRef();

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    "System update available",
    "New message from admin",
    "Backup completed successfully",
  ];

  return (
    <>
      <div>
        <ApplicationsMenu open={menuOpen} setActiveApp={setActiveApp} />
        {activeApp === "terminal" && (
          <TerminalEmulator onClose={() => setActiveApp(null)} />
        )}
        {activeApp === "root-terminal" && (
          <RootTerminalEmulator onClose={() => setActiveApp(null)} />
        )}
        {activeApp === "file-manager" && (
          <FileManager onClose={() => setActiveApp(null)} />
        )}
      </div>

      {/* Navbar */}
      <div className="navbar">
        <div className="left-section">
          <img
            src={kalilogo}
            alt="Kali"
            className="logo"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          <hr className="firsthr" />

          <div className="shortcuts">
            <img
              src={folder}
              alt="Files"
              onClick={() => setActiveApp("file-manager")}
            />
            <img
              src={terminal}
              alt="Terminal"
              onClick={() => setActiveApp("terminal")}
            />
            <img src={browser} alt="Browser" />
          </div>

          <hr className="firsthr" />

          <div className="workspaces">
            <h3>1</h3>
            <h3>2</h3>
            <h3>3</h3>
          </div>

          <hr className="sechr" />
        </div>

        <div className="right-section">
          <span className="scale">
            <img src={upper} alt="chart" />
          </span>

          {/* Volume */}
          <div className="picon white" style={{ position: "relative" }}>
            <img
              src={muted ? muteIcon : volumeIcon}
              alt="volume"
              onClick={() => setMuted(!muted)}
              title={muted ? "Unmute" : "Mute"}
              style={{ cursor: "pointer" }}
            />
            <div className="volume-popup">
              <p>Volume: {muted ? 0 : volume}%</p>
              <input
                type="range"
                min="0"
                max="100"
                value={muted ? 0 : volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="picon white" ref={notifRef} style={{ position: "relative" }}>
            <img
              src={bell}
              alt="bell"
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ cursor: "pointer" }}
            />
            {showNotifications && (
              <div className="notification-popup">
                {notifications.map((n, i) => (
                  <p key={i}>{n}</p>
                ))}
              </div>
            )}
          </div>

          {/* User */}
          <div className="picon white" ref={userRef} style={{ position: "relative" }}>
            <img
              src={user}
              alt="user"
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ cursor: "pointer" }}
            />
            {showUserMenu && (
              <div className="user-popup">
                <p>Profile</p>
                <p>Settings</p>
                <p>Logout</p>
              </div>
            )}
          </div>

          <span className="clock">10:36</span>
          <span>⏻</span>
        </div>
      </div>
    </>
  );
}

export default App;
