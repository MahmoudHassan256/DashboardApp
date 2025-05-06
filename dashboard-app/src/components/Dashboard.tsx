import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { supabase } from "../lib/supabase";
import { getLoggedInUser } from "../hooks/useAuth";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "viewer";
  created_at: string;
}

interface Log {
  id: string;
  message: string;
  time: string;
}

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [adminCount, setAdminCount] = useState<number>(0);
  const [totalLogs, setTotalLogs] = useState<number>(0);
  const [recentLogs, setRecentLogs] = useState<Log[]>([]);
    const loggedin_user = getLoggedInUser();
    const isAdmin = loggedin_user?.role === "admin";

  useEffect(() => {
    const fetchStats = async () => {
      const { data: users, error: userError } = await supabase
        .from("users")
        .select("*");

      const { data: logs, error: logError } = await supabase
        .from("logs")
        .select("*")
        .order("time", { ascending: false })
        .limit(5);

      if (userError || logError) {
        console.error("Error fetching stats:", userError || logError);
        return;
      }

      const userList = users as User[];
      const logList = logs as Log[];

      setTotalUsers(userList.length);
      setAdminCount(userList.filter((u) => u.role === "admin").length);
      setTotalLogs(logList.length);
      setRecentLogs(logList);
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-600">Total Users</p>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-600">Admin Users</p>
          <p className="text-2xl font-bold">{adminCount}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-600">Total Logs</p>
          <p className="text-2xl font-bold">{totalLogs}</p>
        </div>
      </div>
      {isAdmin && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Logs</h2>
          <ul>
            {recentLogs.map((log) => (
              <li key={log.id} className="border-b py-2 last:border-b-0">
                <p>{log.message}</p>
                <span className="text-sm text-gray-500">{log.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
