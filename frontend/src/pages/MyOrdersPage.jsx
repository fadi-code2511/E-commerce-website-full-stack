import React, { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "123",
          createdAt: new Date(),
          shippingAddress: { city: "NY", country: "USA" },
          orderItems: [
            {
              name: "Product1",
              image: "https://picsum.photos/id/58/500/500",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: "456",
          createdAt: new Date(),
          shippingAddress: { city: "BEY", country: "Lebanon" },
          orderItems: [
            {
              name: "Product2",
              image: "https://picsum.photos/id/59/500/500",
            },
          ],
          totalPrice: 150,
          isPaid: false,
        },
      ];
      setOrders(mockOrders);
    }, 500);
  }, []);
  return (
    <div className="max-w-7xl  mx-auto p-4 sm-p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto ">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => {
                return (
                  <tr
                    key={order._id}
                    className="border-b hover:border-gray-50 cursor-pointer"
                  >
                    <td className="py-2 px-4 sm:px-4 sm:py-4">
                      <img
                        className="h-10 w-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                        src={order.orderItems[0].image}
                        alt={order.orderItems[0].name}
                      />
                    </td>
                    <td className="py-2 px-4 sm:px-4 sm:py-4 font-medium text-gray-900  whitespace-nowrap ">
                      #{order._id}
                    </td>
                    <td className="py-2 px-4 sm:px-4 sm:py-4">
                      {order.createdAt.toLocaleTimeString()}{" "}
                      {order.createdAt.toLocaleDateString()}{" "}
                    </td>
                    <td className="py-2 px-4 sm:px-4 sm:py-4">
                      {order.shippingAddress
                        ? `${order.shippingAddress.city},${order.shippingAddress.country}`
                        : "NA"}
                    </td>
                    <td className="py-2 px-4 sm:px-4 sm:py-4">
                      {order.orderItems.length}
                    </td>
                    <td className="py-2 px-4 sm:px-4 sm:py-4">
                      {order.totalPrice}
                    </td>
                    <td className="py-2 px-4 sm:px-4 sm:py-4">
                      <span
                        className={` text-black text-xs md:text-sm px-2 py-1 rounded-full font-medium ${
                          order.isPaid ? "bg-green-400" : " bg-red-400 "
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no order.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
