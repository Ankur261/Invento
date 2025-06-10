import React, { useState, useEffect } from "react";
import { getUserById, updateUserById } from "../services/userService";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const userId = 3;

  useEffect(() => {
    getUserById(userId)
      .then(res => setUser(res.data))
      .catch(err => console.error("Error fetching user:", err));
  }, [userId]);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUserById(userId, user)
      .then(() => setIsEditing(false))
      .catch(err => console.error("Error updating user:", err));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full border px-3 py-2 rounded ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>

        <div>
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full border px-3 py-2 rounded ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>

        <div>
          <label className="block text-gray-600">Address</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full border px-3 py-2 rounded ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>

        {isEditing && (
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter new password (optional)"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        {isEditing ? (
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>
              Save Changes
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
