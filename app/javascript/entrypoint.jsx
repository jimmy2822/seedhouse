import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./components/app.jsx";

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('app');
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
})
