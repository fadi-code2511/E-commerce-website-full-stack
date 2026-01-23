import React from "react";
import { MdDeleteForever } from "react-icons/md";


const CartContents = () => {
  const cartProducts = [
    {
      productID: "1",
      name: "short",
      size: "S",
      color: "red",
      quantity: 1,
      price: 20,
      Image: "https://picsum.photos/400",
    },
    {
      productID: "2",
      name: "jeans",
      size: "M",
      color: "blue",
      quantity: 2,
      price: 45,
      Image: "https://picsum.photos/400",
    },
  ];

  return <div>
    {cartProducts.map(product=>{
        return <div key={product.productID} className=" flex justify-between   bg-gray-100  border-b p-2 ">
      <div>
        <img src="https://picsum.photos/400" alt="" className="w-20 h-24 rounded" />
      </div>
      <div className="flex flex-col">
        <h3>{product.name}</h3>
        <div>
          <p className="text-sm text-gray-500">size:{product.size} | Color:{product.color} </p>
        </div>
        <div>
          <button className="text-l border rounded font-medium bg-gray-300 py-1 px-2 hover:bg-gray-400">-</button>
          <span className="ml-2 font-medium">{product.quantity} </span>
          <button className="text-l border rounded font-medium bg-gray-300 py-1 px-2 hover:bg-gray-400">+</button>
        </div>
      </div>
      <div className="flex flex-col">
        <span>{product.price} $</span>
        <button className=" text-red-500 font-semibold text-xs hover:text-red-700 ">
            <MdDeleteForever className="w-5 h-5" />
        </button>
      </div>
    </div>

    })}
   
    </div>
  
};

export default CartContents;
