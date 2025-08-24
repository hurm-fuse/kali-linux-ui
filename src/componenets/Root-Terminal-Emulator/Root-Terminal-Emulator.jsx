import { useState, useRef, useEffect } from "react";
import two from "../../assets/2.png";
import "./Root-Terminal-Emulator.css";

function RootTerminalEmulator({ onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");

  // Window position
  const [position, setPosition] = useState({ x: 80, y: 80 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

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
    } else if (cmd.includes("sudo")) {
      output = "Running as root... ✅";
    } else {
      output = `root@kali:~# ${cmd}: command not found`;
    }

    setHistory([...history, { command: cmd, output }]);
    setInput("");
  };

  // Drag events
  const handleMouseDown = (e) => {
    if (isMaximized) return;
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;

    // viewport ka size
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    // window ka size
    const el = document.querySelector(".root-terminal-window");
    const rect = el.getBoundingClientRect();

    let newX = e.clientX - offset.current.x;
    let newY = e.clientY - offset.current.y;

    // X-axis boundary
    if (newX < 0) newX = 0;
    if (newX + rect.width > winWidth) newX = winWidth - rect.width;

    // Y-axis boundary
    if (newY < 0) newY = 0;
    if (newY + rect.height > winHeight) newY = winHeight - rect.height;

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  // Attach listeners to window (global drag)
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (isMinimized) {
    return (
      <div
        className="root-terminal-minimized"
        onClick={() => setIsMinimized(false)}
      >
        🖥 Root Terminal
      </div>
    );
  }

  return (
    <div
      className={`root-terminal-window ${isMaximized ? "maximized" : ""}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
      }}
    >
      {/* Titlebar */}
      <div className="titlebar" onMouseDown={handleMouseDown}>
        <span>
          <img
            src={two}
            alt="root-terminal"
            style={{ width: "16px", marginRight: "6px" }}
          />
          <span>Root Terminal Emulator</span>
        </span>
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

      {/* Body */}
      <div className="terminal-body">
        {history.map((item, index) => (
          <div key={index}>
            <p>
              <span className="user root">root@kali</span>:
              <span className="path">~#</span> {item.command}
            </p>
            <p className="output">{item.output}</p>
          </div>
        ))}

        {/* Input */}
        <form onSubmit={handleCommand} className="input-line">
          <span className="user root">root@kali</span>:
          <span className="path">~#</span>&nbsp;
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

export default RootTerminalEmulator;
