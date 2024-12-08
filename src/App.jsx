import React from "react";

import Earth from "./Earth";
import Test from "./Test";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Mountain from "./Mountain";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Earth />} />

        <Route path="/test" element={<Test />} />
        <Route path="/mountain" element={<Mountain />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
