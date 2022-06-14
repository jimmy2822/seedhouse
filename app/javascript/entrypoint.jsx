import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./components/app.js";

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('app');
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
})
