import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import CampDetails from "../pages/CampDetails/CampDetails";
import Dashboard from "../layouts/Dashboard";
import Login from "../pages/JoinUs/Login";
import Register from "../pages/JoinUs/Register";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Profile from "../pages/Dashboard/Common/Profile";
import AddCamp from "../pages/Dashboard/Admin/AddCamp";
import ManageCamps from "../pages/Dashboard/Admin/ManageCamps";
import UpdateCamp from "../pages/Dashboard/Admin/UpdateCamp";

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
        path: "/login",
        element: <Login></Login>,
        // element: <Register></Register>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/camps/:id",
        element: <CampDetails></CampDetails>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/camps/${params.id}`),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>,
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin-profile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Profile />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-camp",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddCamp />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-camps",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCamps />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "update-camp/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateCamp />
            </AdminRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/camps/${params.id}`),
      },
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
