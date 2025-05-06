import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

interface Log {
  id: number;
  message: string;
  time: string;
}

const LOGS_KEY = 'dashboard_logs';

const Logs = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const storedLogs = localStorage.getItem(LOGS_KEY);
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">System Logs</h1>
      <ul className="bg-white border rounded shadow-sm">
        {logs.map((log) => (
          <li key={log.id} className="p-4 border-b last:border-b-0">
            <p className="font-medium">{log.message}</p>
            <span className="text-sm text-gray-500">{log.time}</span>
          </li>
        ))}
        {logs.length === 0 && (
          <li className="p-4 text-gray-500">No logs available.</li>
        )}
      </ul>
    </DashboardLayout>
  );
};

export default Logs;
