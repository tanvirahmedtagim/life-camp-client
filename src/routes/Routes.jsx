import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import CampDetails from "../pages/CampDetails/CampDetails";
import Dashboard from "../layouts/Dashboard";
import Login from "../pages/JoinUs/Login";
import Register from "../pages/JoinUs/Register";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/availableCamps",
        element: <AvailableCamps></AvailableCamps>,
      },
      {
        path: "JoinUs",
        element: <Login></Login>,
        // element: <Register></Register>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/camp-details/:campId",
        element: <CampDetails></CampDetails>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'users',
        element:<AllUsers></AllUsers>
      }
    ]
  },
]);
