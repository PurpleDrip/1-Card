import React, { useState } from "react";

interface Props {
  onSubmit: (password: string) => void;
  onCancel: () => void;
  message: string;
}

const PasswordModal: React.FC<Props> = ({ onSubmit, onCancel, message }) => {
  const [password, setPassword] = useState("");

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
    }}>
      <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 300 }}>
        <h3 style={{ marginBottom: 16 }}>{message}</h3>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 16, padding: 8 }}
          placeholder="Enter your password"
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={() => onSubmit(password)} disabled={!password}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
