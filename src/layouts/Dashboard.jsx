import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
   
    if (user) {
      if (isAdmin) {
        
        navigate("/dashboard/admin-profile");
      } else {
        navigate("/dashboard/analytics");
      }
    }
  }, [user, isAdmin, navigate]);
  return (
    <div className="relative min-h-screen lg:flex">
      <Sidebar></Sidebar>
      {/* dashboard content */}
      <div className="flex-1  lg:ml-[270px]">
        <div className="flex-1 lg:p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
