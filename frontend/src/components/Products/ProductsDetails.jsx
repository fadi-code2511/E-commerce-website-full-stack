import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const selectedProduct = {
  name: "short jeans",
  price: 50,
  originalPrice: 120,
  description: "this short is fit for any occuasion very recommended ",
  brand: "nike",
  matirial: "leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Green"],
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
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setColor] = useState("");
  const [selectedSize, setSzie] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsbuttonDisabled] = useState(false);

  useEffect(() => {
    if (selectedProduct.images.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  function handleQuantitiy(sign) {
    if (sign === "plus") {
      setQuantity((prev) => {
        return prev + 1;
      });
    } else if (sign == "minus" && quantity > 1) {
      setQuantity((prev) => {
        return prev - 1;
      });
    }
    return;
  }

  function handleAddToCart() {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select size and color", { duration: 1000 });
      return
    }

    setIsbuttonDisabled(true);
    setTimeout(() => {
      toast.success("added to cart",{duration:1000});
      setIsbuttonDisabled(false)
    }, 500);
  }

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
                  className={` w-20 h-20  cursor-pointer rounded-lg object-cover border-2 ${
                    mainImage === img.url ? "border-black" : "border-gray-500"
                  } `}
                  onClick={() => {
                    setMainImage(img.url);
                  }}
                />
              );
            })}
          </div>
          {/* main image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt=""
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
          {/* mobile thumnails */}
          <div className=" flex md:hidden gap-2 mb-4  ">
            {selectedProduct.images.map((img, index) => {
              return (
                <img
                  key={index}
                  src={img.url}
                  alt=""
                  className={` w-20 h-20  cursor-pointer rounded-lg object-cover border-2 ${
                    mainImage === img.url ? "border-black" : "border-gray-300"
                  } `}
                  onClick={() => {
                    setMainImage(img.url);
                  }}
                />
              );
            })}
          </div>
          {/* right side */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-red-600 mb-1  line-through">
              {selectedProduct.originalPrice &&
                `${selectedProduct.originalPrice}$`}
            </p>
            <p className="text-xl  text-gray-500 mb-2">
              {selectedProduct.price}$
            </p>
            <p className=" text-gray-600 mb-4">{selectedProduct.description}</p>
            <div className="m-b-4">
              <p className="text-gray-700"> Color</p>
              <div className=" flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => {
                  return (
                    <button
                      onClick={() => {
                        setColor(color);
                      }}
                      key={color}
                      className={`w-8 h-8 rounded-full border  ${
                        selectedColor === color
                          ? " border-gray-800 border-2"
                          : " border-gray-300"
                      } `}
                      style={{ backgroundColor: color.toLocaleLowerCase() }}
                    ></button>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <p>Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => {
                  return (
                    <button
                      onClick={() => {
                        setSzie(size);
                      }}
                      key={size}
                      className={`border mt-2 px-4 py-2 ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex gap-2 mt-2 items-center">
                <button
                  onClick={() => handleQuantitiy("minus")}
                  className="border px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  -
                </button>
                <p className="text-lg">{quantity}</p>
                <button
                  onClick={() => {
                    handleQuantitiy("plus");
                  }}
                  className="border px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={` w-full rounded py-2 px-6 text-white mb-4 ${isButtonDisabled ? "bg-gray-400":"bg-black"}`}
            >
              {isButtonDisabled? "Adding to cart":"Add to cart"}
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristic:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Matirial</td>
                    <td className="py-1">{selectedProduct.matirial}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
