import "./FileManager.css";
import folder from "../../assets/folder.png";
import { useState, useRef } from "react";

function FileManager({ onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Window position
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (isMaximized) return;
    if (!e.target.closest(".titlebar")) return;

    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!dragging.current || isMaximized) return;

    const windowWidth = 800;
    const windowHeight = 500;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let newX = e.clientX - offset.current.x;
    let newY = e.clientY - offset.current.y;

    // Clamp to screen
    newX = Math.max(0, Math.min(newX, screenWidth - windowWidth));
    newY = Math.max(0, Math.min(newY, screenHeight - windowHeight));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  if (isMinimized) {
    return (
      <div className="filemanager-minimized" onClick={() => setIsMinimized(false)}>
        📁 File Manager
      </div>
    );
  }

  return (
    <div
      className={`filemanager-window ${isMaximized ? "maximized" : ""}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        position: "absolute",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Titlebar */}
      <div className="titlebar" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <span>File System - File Manager</span>
        <div className="titlebar-buttons">
          <button onClick={() => setIsMinimized(true)}>―</button>
          <button onClick={() => setIsMaximized(!isMaximized)}>□</button>
          <button onClick={onClose}>✕</button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="terminal-menubar">
        <span>File</span>
        <span>Actions</span>
        <span>Edit</span>
        <span>View</span>
        <span>Help</span>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <li>←</li>
        <li>→</li>
        <li>⌂</li>
        <input type="text" value="/" readOnly />
      </div>

      <div className="content">
        {/* Sidebar */}
        <div className="sidebar">
          <h4>DEVICES</h4>
          <ul>
            <li>File System</li>
            <li>255 MB Volume</li>
            <li>367 GB Volume</li>
          </ul>

          <h4>PLACES</h4>
          <ul>
            <li>root</li>
            <li>Desktop</li>
            <li>Trash</li>
          </ul>

          <h4>NETWORK</h4>
          <ul>
            <li>Browse Network</li>
          </ul>
        </div>

        {/* Main Panel */}
        <div className="main-panel">
          <div className="folder-grid">
            {[
              "bin",
              "boot",
              "dev",
              "etc",
              "home",
              "lib",
              "lib32",
              "lib64",
              "media",
              "mnt",
              "opt",
              "proc",
              "root",
              "run",
              "sbin",
              "srv",
            ].map((name) => (
              <div key={name} className="folder">
                <img src={folder} alt="folder" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileManager;
