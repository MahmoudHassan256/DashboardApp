import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { supabase } from "../lib/supabase";
import { getLoggedInUser } from "../hooks/useAuth";

interface Log {
  id: string;
  message: string;
  time: string;
}

const Logs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const loggedin_user = getLoggedInUser();
  const isAdmin = loggedin_user?.role === "admin";

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("logs")
        .select("*")
        .order("time", { ascending: false });

      if (error) {
        console.error("Error fetching logs:", error.message);
      } else {
        setLogs(data || []);
      }
      setLoading(false);
    };

    fetchLogs();
  }, []);

  return (
    <DashboardLayout>
      {isAdmin ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">System Logs</h1>
          {loading ? (
            <p className="text-gray-500">Loading logs...</p>
          ) : logs.length === 0 ? (
            <p className="text-gray-500">No logs available.</p>
          ) : (
            <ul className="bg-white border rounded shadow-sm">
              {logs.map((log) => (
                <li key={log.id} className="p-4 border-b last:border-b-0">
                  <p className="font-medium">{log.message}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(log.time).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>Only admins can view logs.</div>
      )}
    </DashboardLayout>
  );
};

export default Logs;
