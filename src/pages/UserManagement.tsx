import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Staff';
};

export default function UserManagement() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>(() => [
    {
      id: '1',
      name: 'Aarav Shrestha',
      email: 'aarav@example.com',
      role: 'Admin',
    },
    { id: '2', name: 'Sita Karki', email: 'sita@example.com', role: 'Manager' },
    { id: '3', name: 'Ravi Thapa', email: 'ravi@example.com', role: 'Staff' },
  ]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q),
    );
  }, [query, users]);

  const addUser = () => {
    const id = String(Date.now());
    setUsers((prev) => [
      ...prev,
      { id, name: 'New User', email: `user${id}@example.com`, role: 'Staff' },
    ]);
  };

  const removeUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0F3057]">User Management</h2>
        <p className="text-sm text-gray-500">Manage users, roles and access.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search users by name, email or role..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button
              className="bg-[#1A4B84] hover:bg-[#163C6A]"
              onClick={addUser}
            >
              Add user
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Role</th>
                  <th className="py-2 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="py-2 px-4">{u.name}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4">{u.role}</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          className="hover:bg-blue-50"
                          onClick={() =>
                            setUsers((prev) =>
                              prev.map((x) =>
                                x.id === u.id
                                  ? {
                                      ...x,
                                      role:
                                        x.role === 'Staff'
                                          ? 'Manager'
                                          : x.role === 'Manager'
                                            ? 'Admin'
                                            : 'Staff',
                                    }
                                  : x,
                              ),
                            )
                          }
                        >
                          Toggle role
                        </Button>
                        <Button
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => removeUser(u.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
