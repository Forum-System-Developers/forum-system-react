import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../service/axiosInstance";
import "../styles/login_signup.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError("Username and password are required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/auth/login",
        { username: username, password: password },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-message">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;

// import * as React from "react";
// import { AppProvider } from "@toolpad/core/AppProvider";
// import { SignInPage } from "@toolpad/core/SignInPage";
// import { useTheme } from "@mui/material/styles";

// const providers = [{ id: "credentials", name: "Email and Password" }];

// const signIn = async (provider, formData) => {
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       alert(
//         `Signing in with "${provider.name}" and credentials: ${formData.get(
//           "email"
//         )}, ${formData.get("password")}`
//       );
//       resolve();
//     }, 300);
//   });
//   return promise;
// };

// export default function CredentialsSignInPage() {
//   const theme = useTheme();
//   return (
//     <AppProvider theme={theme}>
//       <SignInPage signIn={signIn} providers={providers} />
//     </AppProvider>
//   );
// }
