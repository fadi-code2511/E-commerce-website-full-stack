import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaBoxOpen, FaUser,FaRegListAlt, FaStore,FaSignOutAlt  } from "react-icons/fa";

const AdminSidebar = () => {
    const navigate=useNavigate()
    function handleLogout() {
        navigate("/")
    }
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          to="/admin"
          className="text-2xl font-medium text-green-500 hover:text-green-400t block text-center uppercase w-full"
        >
          Trendy
        </Link>
      </div>
      <h1 className="text-xl font-medium mb-6 text-center">Admin Dashbourd</h1>
      {/* sidebar buttons */}
      <nav className="flex flex-col space-y-2">
      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
            : "text-gray-300 hover:bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
        }
      >
        <FaUser />
        <span>Users</span>
      </NavLink>
      <NavLink
        to="/admin/products"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
            : "text-gray-300 hover:bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
        }
      >
        <FaBoxOpen />
        <span>Products</span>
      </NavLink>
      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
            : "text-gray-300 hover:bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
        }
      >
        <FaRegListAlt  />
        <span>Orders</span>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
            : "text-gray-300 hover:bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
        }
      >
        <FaStore />
        <span>Shop</span>
      </NavLink>
      </nav>
      <div className="mt-6">
        <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 py-1 px-2 rounded flex items-center justify-center gap-2 ">
            <FaSignOutAlt />
            Logout</button>
      </div>
    </div>
  );
};

export default AdminSidebar;
