import ReactDOM from "react-dom";
import App from "./App.jsx";
import React from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ModelProvider } from "./contexts/ModelContext.jsx";

const app = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <ModelProvider>
      <App />
    </ModelProvider>
  </BrowserRouter>,
  app
);
