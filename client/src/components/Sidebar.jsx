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
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        Invento
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarLink to="/products" icon={<Package size={20} />} text="Products" />
        <SidebarLink to="/orders" icon={<ShoppingCart size={20} />} text="Orders" />
        <SidebarLink to="/profile" icon={<Settings size={20} />} text="Profile" />

        {role === "ADMIN" && (
          <>
            <SidebarLink to="/" icon={<Home size={20} />} text="Dashboard" />
            <SidebarLink to="/categories" icon={<Grid2x2 size={20} />} text="Categories" />
            <SidebarLink to="/users" icon={<Users size={20} />} text="Users" />
          </>
        )}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-800 transition-colors w-full"
        >
          <LogOut size={20} />
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
      `flex items-center space-x-3 px-3 py-2 rounded transition-colors ${isActive ? "bg-gray-800" : "hover:bg-gray-800"
      }`
    }
  >
    {icon}
    <span className="text-sm">{text}</span>
  </NavLink>
);

export default Sidebar;
