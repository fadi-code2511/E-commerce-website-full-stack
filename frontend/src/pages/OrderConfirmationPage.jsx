import React from "react";

const checkout = {
  _id: "12323",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "Red",
      size: "M",
      price: 22,
      quantity: 1,
      image: "https://picsum.photos/id/35/500/500",
    },
    {
      productId: "2",
      name: "Short",
      color: "Blue",
      size: "L",
      price: 22,
      quantity: 1,
      image: "https://picsum.photos/id/123/500/500",
    },
  ],
  shippingAdress: {
    address: "123 street",
    city: "Beirut",
    country: "Lebanon",
  },
};

const OrderConfirmationPage = () => {
  function calculateEstimatedDate(createdAt) {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 4);
    return orderDate.toLocaleDateString();
  }
  return (
    <div className=" max-w-4xl bg-white p-6 mx-auto  ">
      <h1 className="text-4xl font-bold text-center text-[#E67E22] mb-8 ">
        Thank You for ordering from our shop
      </h1>

      {checkout && (
        <div className="p-6 border rounded-lg">
          <div className="flex justify-between mb-20">
            <div>
              <h2 className="text-xl font-semibold">Order ID:{checkout._id}</h2>
              <p className="text-gray-500">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>{" "}
              {/* we use , new Date befor checkout.createdAt in case we grab the date from the database as sting  */}
            </div>
            {/* estimated delivery */}
            <div>
              <p className="text-[#E67E22]">
                Estimated Delivery: {calculateEstimatedDate(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Ordered items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => {
              return (
                <div key={item._id} className="flex items-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md mr-4"
                  />
                  <div>
                    <h4 className="text-md  font-semibold">{item.name}</h4>
                    <p className="text-gray-500 text-sm">
                      {item.color}|{item.size}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-md font-semibold">${item.price}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 justify-between">
            {/* Payment info */}
            <div>
              <h4 className="font-semibold text-lg mb-2">Payment</h4>
              <p className="text-gray-600">Visa</p>
            </div>
            {/* delivery info */}
            <div className="text-end">
              <h4 className="font-semibold text-lg mb-2">Delivery</h4>
              <p className="text-gray-600">{checkout.shippingAdress.city}</p>
              <p className="text-gray-600">{checkout.shippingAdress.country}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
