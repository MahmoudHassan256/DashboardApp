import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { getLoggedInUser } from "../hooks/useAuth";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const handleLogout = () => {
    localStorage.removeItem("logged_in");
    navigate("/");
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="p-4 border-b">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
        </div>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:underline">
            Home
          </Link>
          <Link to="/dashboard/users" className="hover:underline">
            Users
          </Link>
          <Link to="/dashboard/logs" className="hover:underline">
            Logs
          </Link>
          <Button
            variant="destructive"
            className="mt-auto w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
};

export default DashboardLayout;
