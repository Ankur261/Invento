import React, { useState, useEffect } from "react";
import { updateUserById } from "../services/userService";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        name: storedUser.name || "",
        email: storedUser.email || "",
        address: storedUser.address || "",
        password: "" // Never store password in state from localStorage
      });
    }
  }, []);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!user.name || !user.email) {
      setError("Name and email are required");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.id) {
      setError("User ID not found");
      return;
    }

    const updateData = {
      name: user.name,
      email: user.email,
      address: user.address,
      ...(user.password && { password: user.password }) // Only include password if changed
    };

    updateUserById(storedUser.id, updateData)
      .then(response => {
        // Update localStorage with new data
        localStorage.setItem("user", JSON.stringify({
          ...storedUser,
          name: user.name,
          email: user.email,
          address: user.address
        }));
        setIsEditing(false);
        setError("");
      })
      .catch(err => {
        console.error("Error updating user:", err);
        setError(err.response?.data?.message || "Failed to update profile");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 border rounded-md ${isEditing ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50"}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 border rounded-md ${isEditing ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50"}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 border rounded-md ${isEditing ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50"}`}
          />
        </div>

        {isEditing && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password (leave blank to keep current)
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="••••••••"
            />
            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
          </div>
        )}

        <div className="pt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-700">
            {JSON.parse(localStorage.getItem("user"))?.role || "USER"}
          </div>
        </div>
      </div>

      {/* <div className="mt-6 flex space-x-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setError("");
                // Reset form to original values
                const storedUser = JSON.parse(localStorage.getItem("user"));
                setUser({
                  name: storedUser.name,
                  email: storedUser.email,
                  address: storedUser.address,
                  password: ""
                });
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Edit Profile
          </button>
        )}
      </div> */}
    </div>
  );
};

export default UserProfile;