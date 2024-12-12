import React from "react";

import Earth from "./Earth";
import Test from "./Test";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Suit from "./Suit";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Earth />} />

      <Route path="/test" element={<Test />} />
      <Route path="/suit" element={<Suit />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
