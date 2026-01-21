import React, { useState } from "react";
import { useNavigate } from "react-router";

const cart = [
  {
    name: "staylish jacket",
    size: "M",
    color: "Black",
    price: 40,
    images: "https://picsum.photos/id/1/200/200",
  },
  {
    name: "short jacket",
    size: "S",
    color: "red",
    price: 50,
    images: "https://picsum.photos/id/25/200/200",
  },
  {
    name: "staylish2 jacket",
    size: "M",
    color: "Black",
    price: 40,
    images: "https://picsum.photos/id/26/200/200",
  },
  {
    name: "staylish3 jacket",
    size: "M",
    color: "Black",
    price: 40,
    images: "https://picsum.photos/id/27/200/200",
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingAdress, setShippingAdress] = useState({
    firstName: "",
    lastName: "",
    Adress: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCheckout= (e)=>{
    e.preventDefault()
    navigate("/order-confirmation") 
    
  }
  // const ss= (e)=>{
  //   navigate("/order")    
  // }
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8  max-w-7xl mb-4 mx-auto py-10 px-6">
      {/* left-sec: form delivery details*/}
      <div className=" bg-white rounded-lg p-6 ">
        <h1 className="text-2xl uppercase mb-6">checkout</h1>
        <form onSubmit={handleCheckout}>
          <h2 className="text-lg mb-4">contact details</h2>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              value="user@example.com"
              disabled
              id=""
              className="w-full border p-2 rounded"
            />
          </div>
          <h3 className="text-lg mb-4">Delivery </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={shippingAdress.firstName}
                onChange={(e) => {
                  setShippingAdress({
                    ...shippingAdress,
                    firstName: e.target.value,
                  });
                }}
                id=""
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={shippingAdress.lastName}
                onChange={(e) => {
                  setShippingAdress({
                    ...shippingAdress,
                    lastName: e.target.value,
                  });
                }}
                id=""
                className="w-full border  p-2 rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">Address</label>
            <input type="text" 
            onChange={(e)=>{setShippingAdress({...shippingAdress,Adress:e.target.value})}} 
            className="w-full border rounded p-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="" className="block text-gray-700">
                City
              </label>
              <input
                type="text"
                value={shippingAdress.city}
                onChange={(e) => {
                  setShippingAdress({
                    ...shippingAdress,
                    city: e.target.value,
                  });
                }}
                id=""
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                value={shippingAdress.postalCode}
                onChange={(e) => {
                  setShippingAdress({
                    ...shippingAdress,
                    postalCode: e.target.value,
                  });
                }}
                id=""
                className="w-full border  p-2 rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">Country</label>
            <input type="text" 
            onChange={(e)=>{setShippingAdress({...shippingAdress,country:e.target.value})}} 
            className="w-full border rounded p-2 "
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">Phone</label>
            <input type="tel" 
            onChange={(e)=>{setShippingAdress({...shippingAdress,phone:e.target.value})}} 
            className="w-full border rounded p-2"
            />
          </div>
          <button type="submit" className="bg-black py-2 w-full text-white rounded" >Continue to payment</button>
        </form>
      </div>
      {/* right-sec: */}
    </div>
  );
};

export default Checkout;
