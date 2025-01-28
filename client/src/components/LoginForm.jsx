import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/e-commerce/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); 
        setError(""); 
        navigate("/"); 
      } else {
        setError("Login failed, please try again.");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };
  

  return (
    
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
    <DotLottieReact
      src="https://lottie.host/a21fe1e4-d518-44e6-817a-f562353994e8/G4NZCDYJNl.lottie"
      loop
      autoplay
    />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email <FontAwesomeIcon icon={faEnvelope} /></label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password <FontAwesomeIcon icon={faLock} /></label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            backgroundColor: "#FF9900",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "#FF9900", cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;

