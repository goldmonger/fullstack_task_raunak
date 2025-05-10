import { StrictMode } from "react";
import { Container, createRoot } from "react-dom/client";
import React from "react";
import './style/global.css'
import App from "./App.tsx";

createRoot(document.getElementById("root") as Container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
