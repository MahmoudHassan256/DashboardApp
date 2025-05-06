import DashboardLayout from '../components/DashboardLayout';

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@example.com' },
];

const Users = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="w-full border border-gray-300 bg-white shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border-b">ID</th>
            <th className="text-left p-2 border-b">Name</th>
            <th className="text-left p-2 border-b">Email</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border-b">{user.id}</td>
              <td className="p-2 border-b">{user.name}</td>
              <td className="p-2 border-b">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default Users;
