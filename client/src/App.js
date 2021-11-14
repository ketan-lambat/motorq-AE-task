import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Vehicles } from "./components/Vehicles";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
