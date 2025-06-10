// src/components/UsersManagement.jsx
import React, { useState, useEffect } from 'react';
import { getAllUsers, addUser, deleteUser } from '../services/userService';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'CUSTOMER'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    if (!form.name || !form.email || !form.password || !form.address || !form.role) {
      alert('Please fill all fields');
      return;
    }

    await addUser(form);
    setForm({ name: '', email: '', password: '', address: '', role: 'CUSTOMER' });
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="p-6 flex gap-6">
      {/* Add User Form */}
      <div className="w-1/3 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <input type="text" name="name" placeholder="Enter Name"
               className="w-full p-2 mb-2 border rounded"
               value={form.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Enter Email"
               className="w-full p-2 mb-2 border rounded"
               value={form.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Enter Password"
               className="w-full p-2 mb-2 border rounded"
               value={form.password} onChange={handleInputChange} />
        <input type="text" name="address" placeholder="Enter Address"
               className="w-full p-2 mb-2 border rounded"
               value={form.address} onChange={handleInputChange} />
        <select name="role" className="w-full p-2 mb-4 border rounded"
                value={form.role} onChange={handleInputChange}>
          <option value="ADMIN">Admin</option>
          <option value="CUSTOMER">Customer</option>
        </select>
        <button onClick={handleAddUser}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Add User
        </button>
      </div>

      {/* User Table */}
      <div className="w-2/3">
        <h2 className="text-xl font-semibold mb-4">Users Management</h2>
        <input type="text" placeholder="Search users..."
               className="w-full p-2 mb-3 border rounded" />
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2 lowercase">{user.role}</td>
                <td className="p-2">
                  <button onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
