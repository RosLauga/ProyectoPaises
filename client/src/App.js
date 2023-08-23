import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import LandingPage from "./components/Landingpage";
import Home from "./components/Home";
import CountryDetail from "./components/CountryDetail";
import CreateActivity from "./components/CreateActivity";

// import LandingPage from "./components/Landingpage.js";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/countries" element={< Home />} />
        <Route exact path="/countries/:idname" element={< CountryDetail />} />
        <Route exact path="/activity" element={< CreateActivity />} />
      </Routes>
    </div>
    </BrowserRouter>       
  );
}

export default App;
