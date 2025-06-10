import { Routes, Route, useLocation, Navigate  } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function AppRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
    {user ? (
        <div className="flex">
          <Sidebar />
          <main className="text-black flex-1 p-6 bg-gray-100 min-h-screen">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}

export default AppRoutes;
