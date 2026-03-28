"use client";

import { useState, useEffect } from "react";

const SITE_PASSWORD = "Rawlins#IC2026!";
const STORAGE_KEY = "rawlins-preview-auth";

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        setAuthed(true);
      }
    } catch {}
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === SITE_PASSWORD) {
      try { sessionStorage.setItem(STORAGE_KEY, "true"); } catch {}
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  };

  if (checking) return null;
  if (authed) return <>{children}</>;

  return (
    <div className="pw-gate">
      <div className="pw-gate-card">
        <div className="pw-gate-lock">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className="pw-gate-title">Preview Access</h1>
        <p className="pw-gate-text">This page is currently under development. Enter the password to continue.</p>
        <form onSubmit={handleSubmit} className="pw-gate-form">
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Enter password"
            className={`pw-gate-input${error ? " pw-error" : ""}`}
            autoFocus
          />
          <button type="submit" className="pw-gate-btn">
            <span>Enter</span>
          </button>
        </form>
        {error && <p className="pw-gate-error">Incorrect password. Please try again.</p>}
      </div>
    </div>
  );
}
