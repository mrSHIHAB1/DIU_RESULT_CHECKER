import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import CGPA from "../pages/CGPA";
import About from "../pages/About";


export const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>,
  },
  {
    path: "/cgpa",
    element: <CGPA></CGPA>,
  },
  {
    path: "/about",
    element: <About></About>
  },
]);
