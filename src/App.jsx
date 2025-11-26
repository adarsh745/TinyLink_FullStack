import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../src/components/pages/Dashboard.jsx";
import Stats from "./components/pages/Stats.jsx";
import Health from "./components/pages/Health.jsx";   // ✅ Added

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-lightbg">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<Stats />} />
          <Route path="/health" element={<Health />} />   {/* ✅ Mounted */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
