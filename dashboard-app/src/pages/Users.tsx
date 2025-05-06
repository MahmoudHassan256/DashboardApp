import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
}

const USERS_KEY = "dashboard_users";
const LOGS_KEY = "dashboard_logs";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Sync users to localStorage when they change
  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  const addLog = (message: string) => {
    const logs = JSON.parse(localStorage.getItem(LOGS_KEY) || "[]");
    const newLog = {
      id: Date.now(),
      message,
      time: new Date().toLocaleString(),
    };
    localStorage.setItem(LOGS_KEY, JSON.stringify([newLog, ...logs]));
  };
  const handleAddUser = () => {
    if (!name || !email) return;
    const newUser: User = {
      id: Date.now(),
      name,
      email,
    };
    setUsers((prev) => [...prev, newUser]);
    addLog(`Added user ${name}`);
    setName("");
    setEmail("");
  };

  const handleDeleteUser = (id: number) => {
    const user = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
    if (user) addLog(`Deleted user ${user.name}`);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleAddUser}>Add User</Button>
      </div>

      <table className="w-full border border-gray-300 bg-white shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border-b">ID</th>
            <th className="text-left p-2 border-b">Name</th>
            <th className="text-left p-2 border-b">Email</th>
            <th className="text-left p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border-b">{user.id}</td>
              <td className="p-2 border-b">{user.name}</td>
              <td className="p-2 border-b">{user.email}</td>
              <td className="p-2 border-b">
                <Button
                  className="text-black-100"
                  variant="destructive"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default Users;
