import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
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
