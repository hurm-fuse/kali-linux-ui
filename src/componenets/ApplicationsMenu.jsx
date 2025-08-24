import { useState } from "react";
import "./ApplicationsMenu.css";
import kalilogo from "../assets/kali-dragon-icon.svg";
import LogoutDialog from "./LogoutDialog/LogoutDialog";
import one from "../assets/1.png";
import two from "../assets/2.png";
import three from "../assets/3.png";
import four from "../assets/4.png";
import five from "../assets/5.png";
import six from "../assets/6.png";
import seven from "../assets/7.png";
import eight from "../assets/8.png";
import nine from "../assets/9.png";
import ten from "../assets/10.png";
import eleven from "../assets/11.png";
import twelve from "../assets/12.png";
import shutdown from "../assets/shutdown.png";
import search from "../assets/search.png";

function ApplicationsMenu({ open, setActiveApp }) {
    const [showLogout, setShowLogout] = useState(false);

    if (!open) return null;

    return (
        <div className="applications-menu">
            <div className="search-bar">
                <img src={search} alt="search" className="search-icon" />
                <input type="text" placeholder="Search..." />
            </div>

            <div className="menu-content">
                <div className="categories">
                    <ul>
                        <li><img src={eleven} alt="" /> Favorites</li>
                        <li>🕒 Recently Used</li>
                        <li>📂 All Applications</li>
                        <li><img src={twelve} alt="" /> Settings</li>
                        <li>📑 Usual Applications</li>
                        <li>01 - Information Gathering</li>
                        <li>02 - Vulnerability Analysis</li>
                        <li>03 - Web Application Analysis</li>
                        <li>04 - Database Assessment</li>
                        <li>05 - Password Attacks</li>
                        <li>06 - Wireless Attacks</li>
                        <li>07 - Reverse Engineering</li>
                    </ul>
                </div>

                <div className="applications-list">
                    <ul>
                        <li onClick={() => setActiveApp("terminal")}>
                            <img src={one} alt="terminal" /> Terminal
                        </li>
                        <li onClick={() => setActiveApp("root-terminal")}>
                            <img src={two} alt="root" /> Root Terminal
                        </li>
                        <li onClick={() => setActiveApp("file-manager")}>
                            <img src={three} alt="file" /> File Manager
                        </li>
                        <li><img src={four} alt="editor" /> Text Editor</li>
                        <li><img src={five} alt="browser" /> Web Browser</li>
                        <li><img src={kalilogo} alt="kali" /> Kali Linux</li>
                        <li><img src={six} alt="docs" /> Kali Docs</li>
                        <li><img src={seven} alt="bugs" /> Kali Bugs</li>
                        <li><img src={eight} alt="training" /> OffSec Training</li>
                        <li><img src={nine} alt="exploit" /> Exploit Database</li>
                        <li><img src={ten} alt="vulnhub" /> VulnHub</li>
                    </ul>
                </div>
            </div>

            {/* ⚙️ Bottom Bar */}
            <div className="bottom-bar">
                <div className="flex">
                    <img src={kalilogo} alt="kali" className="bottom-icon" />
                    <h3>kali</h3>
                </div>

                <div className="bottom-actions">
                    <img src={twelve} alt="settings" />
                    <img 
                      src={shutdown} 
                      alt="power" 
                      onClick={() => setShowLogout(true)} 
                      style={{ cursor: "pointer" }}
                    />
                </div>
            </div>

            {showLogout && (
                <LogoutDialog
                    onCancel={() => setShowLogout(false)}
                    onAction={(action) => {
                        alert("Selected: " + action);
                        setShowLogout(false);
                    }}
                />
            )}
        </div>
    );
}

export default ApplicationsMenu;
