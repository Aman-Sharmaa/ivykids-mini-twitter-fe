import React, { useState } from "react";
import MiniTwiiterLogoWBG from "../../assets/media/logo_wbg.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (prop) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlefullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const handleLogin = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      email: username,
      password: password,
      fullName: fullName,
      userType: "ivykids",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/secure/ivy/registration`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === true) {
          navigate("/home");
          window.location.reload();
          sessionStorage.setItem("userToken", response.data.userToken);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignupScreen = () => {
    navigate("/");
  };

  return (
    <div className="mt-app">
      <div className="mt-loginscreen">
        <img src={MiniTwiiterLogoWBG} alt="mini-twitter" />
        <h1>Sign up to Mini Twitter</h1>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={handlefullNameChange}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="off"
        />
        <button onClick={handleLogin}>Next</button>
        <button id="forgot-password">Forgot Password?</button>
        <p onClick={handleSignupScreen}>
          Don't have an account? <a href="/">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
