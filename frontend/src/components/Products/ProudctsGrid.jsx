import React from "react";
import { Link } from "react-router";

const ProudctsGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => {
        return (
          <Link to={`/product/${product._id}`} key={index}>
            <div className="bg-white rounded-lg  p-4">
              <div className="w-full h-96 mb-4 ">
                <img className="h-full w-full object-cover rounded-lg " src={product.image[0].url} alt="" />
              </div>
                <h3 className="text-sm mb-2">{product.name}</h3>
                <p className="text-sm font-medium text-gray-500 tracking-tighter">{product.price} $</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProudctsGrid;
