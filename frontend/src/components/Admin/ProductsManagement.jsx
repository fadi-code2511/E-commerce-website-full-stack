import React from "react";
import { Link, useNavigate } from "react-router";

const products = [
    {
      _id: 1,
      name: "short",
      price: 55,
      sku:"45fsd-dsff-sdf"
    },
    {
      _id: 2,
      name: "t-shirt",
      price: 45,
      sku:"545sw"
    },
];

const ProductsManagement = () => {
  const navigate = useNavigate();


  function handleDelete() {
    if(window.confirm("Are you sure you want delete this item?")){
        console.log("deleted");
        
    }
  }
  return (
    <div className="max-w-7xl mr-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products Managemant</h1>
      <div className="rounded-md overflow-x-auto">
        <table className="text-sm min-w-full  text-left shadow-md ">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="uppercase p-2 w-1/2">name</th>
              <th className="uppercase p-2">price</th>
              <th className="uppercase p-2">sku</th>
              <th className="uppercase p-2">action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-100 cursor-pointer text-gray-500 font-semibold"
                >
                  <td className="p-2 text-black font-semibold  ">
                    {product.name}
                  </td>
                  <td className="p-2 ">${product.price}</td>
                  <td className="p-2 ">{product.sku}</td>
                  <td className="p-2 ">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className=" text-white bg-yellow-500 p-2 rounded w-1/2 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      className=" text-white bg-red-500 p-2 rounded mt-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td className="text-gray-600 p-4 text-xl" colSpan={4}>No orders added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsManagement;
