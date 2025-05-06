import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { getLoggedInUser } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

type Role = "admin" | "viewer";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  created_at: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("viewer");
  const [loading, setLoading] = useState(true);
  const loggedin_user = getLoggedInUser();
  const isAdmin = loggedin_user?.role === "admin";

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching users:", error.message);
      } else {
        setUsers(data || []);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  const addLog = async (message: string) => {
    await supabase.from("logs").insert([
      {
        message,
        time: new Date().toISOString(),
      },
    ]);
  };

  const handleAddUser = async () => {
    if (!name || !email) return;

    const { error } = await supabase.from("users").insert([
      {
        name,
        email,
        role,
      },
    ]);

    if (error) {
      console.error("Error adding user:", error.message);
      return;
    }

    await addLog(`Added user ${name}`);

    setName("");
    setEmail("");
    setRole("viewer");

    const { data: updatedUsers } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: true });

    setUsers(updatedUsers || []);
  };

  const handleDeleteUser = async (id: string) => {
    const user = users.find((u) => u.id === id);

    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      console.error("Error deleting user:", error.message);
      return;
    }

    if (user) {
      await addLog(`Deleted user ${user.name}`);
    }

    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {isAdmin && (
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
          <Select value={role} onValueChange={(value) => setRole(value as Role)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddUser}>Add User</Button>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border border-gray-300 bg-white shadow-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2 border-b">ID</th>
              <th className="text-left p-2 border-b">Name</th>
              <th className="text-left p-2 border-b">Email</th>
              <th className="text-left p-2 border-b">Role</th>
              {isAdmin && <th className="text-left p-2 border-b">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border-b">{user.id}</td>
                <td className="p-2 border-b">{user.name}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b capitalize">{user.role}</td>
                {isAdmin && (
                  <td className="p-2 border-b">
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
};

export default Users;
