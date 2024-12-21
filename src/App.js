import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import Login from "./Login";
import Signup from "./Signup";

import "./index.css"

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />  
      </Routes>
    </Router>
  );
}

export default App;
