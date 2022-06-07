import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>
);
