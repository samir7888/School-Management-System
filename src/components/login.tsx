import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState<string>("prakashbanjade191@gmail.com");
  const [password, setPassword] = useState<string>("Prakash@122");
  const [rememberme, setRememberme] = useState<boolean>(false);
  const navigate = useNavigate();
  const { accessToken, handleLogin, currentUser } = useAuth();

  // Redirect based on user role
  useEffect(() => {
    if (accessToken && currentUser) {
      if (currentUser.role === "admin") {
        navigate("/admin");
      } else if (currentUser.role === "super_admin") {
        navigate("/superAdmin");
      } else if (currentUser.role === "teacher") {
        navigate("/teacher");
      } else if (currentUser.role === "student") {
        navigate("/student");
      } else {
        navigate("/login");
      }
    }
  }, [accessToken, currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleLogin({ email, password, rememberme });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={rememberme}
            onChange={() => {
              setRememberme((prev) => {
                const newRememberme = !prev;
                localStorage.setItem("rememberme", newRememberme.toString());
                return newRememberme;
              });
            }}
          />
          Remember Me
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
