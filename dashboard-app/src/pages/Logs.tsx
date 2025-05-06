import DashboardLayout from '../components/DashboardLayout';

const mockLogs = [
  { id: 1, message: 'Admin logged in', time: '2025-05-06 10:00' },
  { id: 2, message: 'User "Bob Smith" deleted', time: '2025-05-06 10:15' },
  { id: 3, message: 'User "Alice Johnson" updated', time: '2025-05-06 10:45' },
];

const Logs = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">System Logs</h1>
      <ul className="bg-white border rounded shadow-sm">
        {mockLogs.map((log) => (
          <li key={log.id} className="p-4 border-b last:border-b-0">
            <p className="font-medium">{log.message}</p>
            <span className="text-sm text-gray-500">{log.time}</span>
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
};

export default Logs;
