import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { router } from './Router/Router';

import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="w-full max-w-4xl mx-auto p-4">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
