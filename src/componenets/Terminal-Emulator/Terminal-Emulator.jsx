import { useState, useRef, useEffect } from "react";
import one from "../../assets/1.png";
import "./Terminal-Emulator.css";

function TerminalEmulator({ onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");

  // Window position
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // ✅ Add global listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging.current || isMaximized) return;

      const windowWidth = 600;
      const windowHeight = 400;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let newX = e.clientX - offset.current.x;
      let newY = e.clientY - offset.current.y;

      newX = Math.max(0, Math.min(newX, screenWidth - windowWidth));
      newY = Math.max(0, Math.min(newY, screenHeight - windowHeight));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMaximized]);

  // Command handler
  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    let cmd = input.trim();
    let output = "";

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (cmd.includes("sudo apt install")) {
      output = "Download complete ✅";
    } else if (cmd.includes("--version")) {
      output = "2025";
    } else if (cmd.startsWith("cd")) {
      output = "you dive in this folder 📂";
    } else {
      output = `kali@kali:~$ ${cmd}: command not found ❌`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

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

  // ✅ Minimized dock
  if (isMinimized) {
    return (
      <div
        className="terminal-minimized"
        onClick={() => setIsMinimized(false)}
      >
        🖥 Terminal
      </div>
    );
  }

  return (
    <div
      className={`terminal-window ${isMaximized ? "maximized" : ""}`}
      style={
        isMaximized
          ? {}
          : { left: position.x, top: position.y } // ✅ no conflict with CSS
      }
      onMouseDown={handleMouseDown}
    >
      {/* Titlebar */}
      <div className="titlebar">
        <span>
          <img
            src={one}
            alt="terminal"
            style={{ width: "16px", marginRight: "6px" }}
          />
          <span>Terminal Emulator</span>
        </span>

        <div className="titlebar-buttons">
          {/* Minimize */}
          <button onClick={() => setIsMinimized(true)}>
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="1" y="8" width="8" height="1" fill="white" />
            </svg>
          </button>

          {/* Maximize */}
          <button onClick={() => setIsMaximized(!isMaximized)}>
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect
                x="1"
                y="1"
                width="8"
                height="8"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </button>

          {/* Close */}
          <button onClick={onClose}>
            <svg width="10" height="10" viewBox="0 0 10 10">
              <line x1="2" y1="2" x2="8" y2="8" stroke="white" strokeWidth="1.5" />
              <line x1="8" y1="2" x2="2" y2="8" stroke="white" strokeWidth="1.5" />
            </svg>
          </button>
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

      {/* Body */}
      <div className="terminal-body">
        {history.map((item, index) => (
          <div key={index}>
            <p>
              <span className="user">kali@kali</span>:
              <span className="path">~$</span> {item.command}
            </p>
            <p className="output">{item.output}</p>
          </div>
        ))}

        <form onSubmit={handleCommand} className="input-line">
          <span className="user">kali@kali</span>:
          <span className="path">~$</span>&nbsp;
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}

export default TerminalEmulator;
