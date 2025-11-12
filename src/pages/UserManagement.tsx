import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Modal from '@/components/Modal';
import { useMemo, useState } from 'react';
import { Search, Edit2, Trash2, UserPlus, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Staff';
  company: string;
};

export default function UserManagement() {
  const [query, setQuery] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState<'Admin' | 'Manager' | 'Staff'>(
    'Staff',
  );
  const [editCompany, setEditCompany] = useState('');
  const [users, setUsers] = useState<User[]>(() => [
    {
      id: '1',
      name: 'राजेश श्रेष्ठ',
      email: 'rajesh.shrestha@nabilbank.com',
      role: 'Admin',
      company: 'Nabil Bank',
    },
    {
      id: '2',
      name: 'सीता कार्की',
      email: 'sita.karki@himalayanbank.com',
      role: 'Manager',
      company: 'Himalayan Bank',
    },
    {
      id: '3',
      name: 'रवि थापा',
      email: 'ravi.thapa@nibl.com',
      role: 'Staff',
      company: 'Nepal Investment Bank',
    },
    {
      id: '4',
      name: 'प्रिया गुरुङ',
      email: 'priya.gurung@kumaribank.com',
      role: 'Manager',
      company: 'Kumari Bank',
    },
    {
      id: '5',
      name: 'अमित महर्जन',
      email: 'amit.maharjan@globalimebank.com',
      role: 'Staff',
      company: 'Global IME Bank',
    },
    {
      id: '6',
      name: 'सुनिता तामाङ',
      email: 'sunita.tamang@machhapuchhre.com',
      role: 'Staff',
      company: 'Machhapuchhre Bank',
    },
    {
      id: '7',
      name: 'दीपक पाण्डे',
      email: 'deepak.pande@nrb.com',
      role: 'Admin',
      company: 'Nepal Rastra Bank',
    },
    {
      id: '8',
      name: 'अंजना शाक्य',
      email: 'anjana.shakya@everestbank.com',
      role: 'Manager',
      company: 'Everest Bank',
    },
    {
      id: '9',
      name: 'बिक्रम बस्नेत',
      email: 'bikram.basnet@laxmibank.com',
      role: 'Staff',
      company: 'Laxmi Bank',
    },
    {
      id: '10',
      name: 'मीना राई',
      email: 'meena.rai@citizensbank.com',
      role: 'Staff',
      company: 'Citizens Bank',
    },
  ]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.company.toLowerCase().includes(q),
    );
  }, [query, users]);

  const addUser = () => {
    const id = String(Date.now());
    setEditName('नयाँ प्रयोगकर्ता');
    setEditEmail(`user${id}@example.com`);
    setEditRole('Staff');
    setEditCompany('');
    setEditingUser({
      id,
      name: 'नयाँ प्रयोगकर्ता',
      email: `user${id}@example.com`,
      role: 'Staff',
      company: '',
    });
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setEditCompany(user.company);
  };

  const saveUser = () => {
    if (!editingUser) return;

    if (editingUser.id && users.find((u) => u.id === editingUser.id)) {
      // Update existing user
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: editName,
                email: editEmail,
                role: editRole,
                company: editCompany,
              }
            : u,
        ),
      );
    } else {
      // Add new user
      const id = String(Date.now());
      setUsers((prev) => [
        ...prev,
        {
          id,
          name: editName,
          email: editEmail,
          role: editRole,
          company: editCompany,
        },
      ]);
    }
    setEditingUser(null);
  };

  const updateUserRole = (id: string, role: 'Admin' | 'Manager' | 'Staff') => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  const removeUser = (id: string) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Manager':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Staff':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-[#0F3057]">User Management</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage users, roles and access permissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Users</CardTitle>
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name, email, company or role..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              className="bg-[#1A4B84] hover:bg-[#163C6A] text-white shadow-sm"
              onClick={addUser}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No users found</p>
              <p className="text-sm mt-1">Try adjusting your search query</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Company</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => (
                  <TableRow key={u.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell className="text-gray-600">{u.email}</TableCell>
                    <TableCell className="text-gray-700 font-medium">
                      {u.company}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={u.role}
                        onValueChange={(value: 'Admin' | 'Manager' | 'Staff') =>
                          updateUserRole(u.id, value)
                        }
                      >
                        <SelectTrigger
                          className={`w-[140px] border ${getRoleBadgeColor(u.role)}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end">
                        <DropdownMenu
                          align="right"
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-gray-100"
                            >
                              <MoreVertical className="h-4 w-4 text-gray-600" />
                            </Button>
                          }
                        >
                          <DropdownMenuItem onClick={() => openEditModal(u)}>
                            <Edit2 className="h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => removeUser(u.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Modal
        open={editingUser !== null}
        title={
          editingUser?.id && users.find((u) => u.id === editingUser.id)
            ? 'Edit User'
            : 'Add New User'
        }
        onClose={() => setEditingUser(null)}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Enter user name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder="Enter user email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company / Bank
            </label>
            <Input
              value={editCompany}
              onChange={(e) => setEditCompany(e.target.value)}
              placeholder="Enter company or bank name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <Select
              value={editRole}
              onValueChange={(value: 'Admin' | 'Manager' | 'Staff') =>
                setEditRole(value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancel
            </Button>
            <Button
              className="bg-[#1A4B84] hover:bg-[#163C6A] text-white"
              onClick={saveUser}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
