import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import SirioGPT from "./components/SirioGPT/SirioGPT";
import Home from "./pages/HomePage/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/SirioGPT" element={<SirioGPT />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
