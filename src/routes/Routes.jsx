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
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import RegisteredCamps from "../pages/Dashboard/User/RegisteredCamps/RegisteredCamps";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory/PaymentHistory";
import Analytics from "../pages/Dashboard/User/Analytics/Analytics";
import ManageRegisteredCamps from "../pages/Dashboard/Admin/RegisteredCampsTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/camp-details/:id",
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
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "manage-registered-camps",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageRegisteredCamps />
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
        path: "analytics",
        element: (
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        ),
      },
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "registered-camps",
        element: (
          <PrivateRoute>
            <RegisteredCamps />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
