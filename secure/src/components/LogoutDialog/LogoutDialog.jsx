import { useState, useEffect } from "react";
import { LogOut, RotateCcw, Power, Loader2 } from "lucide-react";
import './LogoutDialog.css'

function LogoutDialog({ onCancel, onAction }) {
    const [saveSession, setSaveSession] = useState(false);
    const [loading, setLoading] = useState(null); // "shutdown" | "restart" | null
    const [blackout, setBlackout] = useState(false);

    const handleAction = (type) => {
        setLoading(type);

        setTimeout(() => {
            setBlackout(true);
        }, 5000);
    };

    return (
        <div className="logout-overlay">
            {/* Blackout screen */}
            {blackout && <div className="blackout"></div>}

            {/* Agar shutdown ya restart hua to loading screen */}
            {loading && !blackout && (
                <div className="loading-screen">
                    <Loader2 className="spinner" size={80} />
                    <p>{loading === "shutdown" ? "Shutting down..." : "Restarting..."}</p>
                </div>
            )}

            {/* Normal dialog */}
            {!loading && (
                <div className="logout-dialog">
                    {/* Title */}
                    <h2 className="logout-title">Log out Kali Linux</h2>

                    {/* Buttons */}
                    <div className="logout-buttons">
                        <button className="logout-option" onClick={() => handleAction("logout")}>
                            <LogOut size={32} />
                            <span>Log Out</span>
                        </button>

                        <button className="logout-option" onClick={() => handleAction("restart")}>
                            <RotateCcw size={32} />
                            <span>Restart</span>
                        </button>

                        <button className="logout-option" onClick={() => handleAction("shutdown")}>
                            <Power size={32} />
                            <span>Shut Down</span>
                        </button>
                    </div>

                    {/* Save session */}
                    <label className="logout-checkbox">
                        <input
                            type="checkbox"
                            checked={saveSession}
                            onChange={() => setSaveSession(!saveSession)}
                        />
                        Save session for future logins
                    </label>

                    {/* Cancel */}
                    <div className="logout-footer">
                        <button className="cancel-btn" onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LogoutDialog;
