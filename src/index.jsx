import ReactDOM from "react-dom";
import App from "./App.jsx";
import React from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
const app = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  app
);
