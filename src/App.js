import "../src/assets/styles/mini-twitter-main.css";
import "../src/assets/styles/mini-twitter-responsive.css";
import "./App.css";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Home from "./pages/dashboard/home";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { userToken } from "../src/api.js/services";

function App() {
  const [show, setShow] = useState();
  return (
    <>
      <Routes>
        {userToken ? (
          <Route path="/" element={<Home setShow={setShow} />} />
        ) : (
          <Route path="/" element={<Login setShow={setShow} />} />
        )}
        {userToken ? (
          <></>
        ) : (
          <Route path="/signup" element={<Signup setShow={setShow} />} />
        )}

        {userToken ? (
          <Route path="/home" element={<Home setShow={setShow} />} />
        ) : (
          <Route path="/home" element={<Login setShow={setShow} />} />
        )}
      </Routes>
    </>
  );
}

export default App;
