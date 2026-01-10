import React from "react";

const selectedProduct = {
  name: "short jeans",
  price: 50,
  originalPrice: 120,
  description: "this short is fit for any occuasion very recommended ",
  brand: "nike",
  matirial: "leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/id/1/500/500",
      altText: "short jeans",
    },
    {
      url: "https://picsum.photos/id/2/500/500",
      altText: "short jeans 2",
    },
  ],
};

const ProductsDetails = () => {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto p-8 rounded-lg ">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {/*  thumnails */}
            {selectedProduct.images.map((img, index) => {
              return (
                <img
                  key={index}
                  src={img.url}
                  alt={img.altText}
                  className="w-20 h-20 border cursor-pointer rounded-lg object-cover"
                />
              );
            })}
          </div>
          {/* main image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={selectedProduct.images[0]?.url}
                alt=""
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
          {/* mobile thumnails */}
          <div className=" flex md:hidden gap-2 mb-4  ">
            {selectedProduct.images.map((Product, index) => {
              return (
                <img
                  key={index}
                  src={Product.url}
                  alt=""
                  className="w-20 h-20 object-cover rounded-lg border cursor-pointer "
                />
              );
            })}
          </div>
          {/* right side */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
            <p className="text-lg text-red-600 mb-1  line-through">{selectedProduct.originalPrice && `${selectedProduct.originalPrice}$`}</p>
            <p className="text-xl  text-gray-500 mb-2">{selectedProduct.price}</p>
            <p className=" text-gray-600 mb-4">{selectedProduct.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
