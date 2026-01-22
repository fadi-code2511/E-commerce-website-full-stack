import React, { useEffect, useState } from "react";
import { data, Link, useParams } from "react-router";

const OrderDetailsPage = () => {
  const { id } = useParams(); // useParams Used to extract variables that are part of the route path itself (Route Parameters ex: [<Route path="order/:id elemennt=......."]).  while=>  useSearchParams Used to work with Query Parameters (the parameters that come after the ? in the URL).
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "Visa",
      shippingMethod: "Standard",
      shippingAddress: { city: "beirut", country: "Lebanon" },
      orderItems: [
        {
          productId: "1",
          name: "jackect",
          price: 120,
          quantity: 2,
          image: "https://picsum.photos/id/42/500/500",
        },
        {
          productId: "2",
          name: "short",
          price: 60,
          quantity: 1,
          image: "https://picsum.photos/id/43/500/500",
        },
      ],
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>no order details found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3>Order ID: #{orderDetails._id}</h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100"} px-3 py-1 rounded-full text-sm font-semibold mb-2`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100"} px-3 py-1 rounded-full text-sm font-semibold mb-2`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Delivery Pending"}
              </span>
            </div>
          </div>
          {/* payment and shipping info */}
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">payment info</h4>
              <p>Payment method:{orderDetails.paymentMethod}</p>
              <p>Status:{orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping info</h4>
              <p>Shipping method:{orderDetails.shippingMethod}</p>
              <p>
                Address:{orderDetails.shippingAddress.city},
                {orderDetails.shippingAddress.country}
              </p>
            </div>
          </div>
          {/* items table */}
          <div className=" overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4 ">Products</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className=" bg-gray-100 ">
                <tr>
                  <th className=" py-2 px-4">Name</th>
                  <th className=" py-2 px-4">Unit price</th>
                  <th className=" py-2 px-4">Quantity</th>
                  <th className=" py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td className="py-2 px-4 flex items-center ">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 mr-4 rounded-md object-cover  "
                      />
                      <Link to={`/product/${item.productId}`} className="text-blue-500 hover:underline">
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4 text-center ">{item.price}</td>
                    <td className="py-2 px-4 text-center ">{item.quantity}</td>
                    <td className="py-2 px-4 text-center ">
                      {item.quantity*item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* back to my orders */}
          <Link to='/my-orders' className="text-gray-700 hover:underline">Back to my orders</Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
