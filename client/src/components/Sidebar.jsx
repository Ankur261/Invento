import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  Settings,
  LogOut,
  Grid2x2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { InventoLogo } from '../components/InventoLogo';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg">
      {/* Logo Header */}
      <div className="flex items-center justify-center p-6 border-b border-gray-700 gap-3">
        <InventoLogo className="h-10 w-10" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
          Invento
        </h1>
      </div>

      {/* User Profile (Optional) */}
      {user && (
        <div className="px-6 py-4 flex items-center gap-3 border-b border-gray-700">
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-gray-400 capitalize">{role.toLowerCase()}</p>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {role === "ADMIN" && (
          <>
            <SidebarLink to="/" icon={<Home size={18} />} text="Dashboard" />
            <SidebarLink to="/categories" icon={<Grid2x2 size={18} />} text="Categories" />
            <SidebarLink to="/users" icon={<Users size={18} />} text="Users" />
          </>
        )}
        <SidebarLink to="/products" icon={<Package size={18} />} text="Products" />
        <SidebarLink to="/orders" icon={<ShoppingCart size={18} />} text="Orders" />
        <SidebarLink to="/profile" icon={<Settings size={18} />} text="Profile" />
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-800 transition-colors w-full text-gray-300 hover:text-white"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-3 py-2 rounded transition-colors text-gray-300 hover:text-white ${
        isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
      }`
    }
  >
    <span className={({ isActive }) => isActive ? "text-indigo-400" : ""}>
      {icon}
    </span>
    <span className="text-sm">{text}</span>
  </NavLink>
);

export default Sidebar;