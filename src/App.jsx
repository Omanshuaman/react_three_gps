import React from "react";

import Earth from "./Earth";
import Test from "./Test";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Mountain from "./Mountain";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Earth />} />

        <Route path="/test" element={<Test />} />
        <Route path="/mountain" element={<Mountain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
