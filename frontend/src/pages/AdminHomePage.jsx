import React from "react";
import { Link } from "react-router";

const AdminHomePage = () => {
  const orders = [
    {
      _id: "1212sds",
      user: { name: "Sam" },
      totalPrice: 1521,
      status: "processing",
    },
    {
      _id: "sfe234sdf",
      user: { name: "Ram" },
      totalPrice: 555,
      status: "processing",
    },
    {
      _id: "efwwe23423sfd",
      user: { name: "Sandy" },
      totalPrice: 234,
      status: "processing",
    },
  ];
  return (
    <div className=" max-w-7xl mx-auto p-6">
      <h1 className="  text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-6 mb-6 ">
        <div className="  shadow-md   rounded p-2">
          <h3 className="text-xl font-semibold ">Revenue</h3>
          <h3 className="text-xl font-semibold ">$320.44</h3>
        </div>
        <div className="  shadow-md   rounded p-2">
          <h3 className="text-xl font-semibold ">Total Orders</h3>
          <h3 className="text-xl font-semibold ">13</h3>
          <Link to="/admin/orders" className="text-blue-400 hover:underline ">
            Manage orders
          </Link>
        </div>
        <div className="shadow-md   rounded p-2">
          <h3 className="text-xl font-semibold ">Total Products</h3>
          <h3 className="text-xl font-semibold ">40</h3>
          <Link to="/admin/products" className="text-blue-400 hover:underline">
            Manage Products
          </Link>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-3">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 p-2">
                <th className="p-4">Order ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Toltal Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="">
              {orders.length > 0 ? (
                orders.map((item) => (
                  <tr
                    key={item._id}
                    className=" hover:bg-gray-50 cursor-pointer border-b "
                  >
                    <td className=" p-4">{item._id}</td>
                    <td className="text-gray-500 p-4">{item.user.name}</td>
                    <td className="text-gray-500 p-4">
                      {item.totalPrice.toLocaleString()}
                    </td>
                    <td className="text-gray-500 p-4">{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 ">
                    no recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
