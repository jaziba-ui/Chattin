import React, { useState } from "react";
import "../login.css";

function LoginForm({ onLogin, users }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const matchedUser = users.find(
      (user) => user.name === username && user.password === password
    );

    if (matchedUser) {
      onLogin(matchedUser);
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter your cute username ✨"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password please 🐰"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
}

export default LoginForm;
