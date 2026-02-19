import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removefromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  //adding or subtracting to cart
  const handleAddtocart = (quantity, delta, color, size, productId) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          quantity: newQuantity,
          color,
          size,
          userId,
          guestId,
          productId,
        }),
      );
    }
  };
  const handleRemoveFromCart = (color, size, productId) => {
    dispatch(
      removefromCart({
        productId,
        size,
        color,
        userId,
        guestId,
      }),
    );
  };

  // const cartProducts = [
  //   {
  //     productID: "1",
  //     name: "short",
  //     size: "S",
  //     color: "red",
  //     quantity: 1,
  //     price: 20,
  //     Image: "https://picsum.photos/400",
  //   },
  //   {
  //     productID: "2",
  //     name: "jeans",
  //     size: "M",
  //     color: "blue",
  //     quantity: 2,
  //     price: 45,
  //     Image: "https://picsum.photos/400",
  //   },
  // ];

  return (
    <div>
      {cart.products.map((product) => {
        return (
          <div
            key={`${product.productId}-${product.color}-${product.size}`} //key should be uniqe becouase each item has many colors , many sizes
            className=" flex justify-between   bg-gray-100  border-b p-2 "
          >
            <div>
              <img
                src="https://picsum.photos/400"
                alt=""
                className="w-20 h-24 rounded"
              />
            </div>
            <div className="flex flex-col">
              <h3>{product.name}</h3>
              <div>
                <p className="text-sm text-gray-500">
                  size:{product.size} | Color:{product.color}{" "}
                </p>
              </div>
              <div>
                <button
                  onClick={() =>
                    handleAddtocart(
                      product.quantity,
                      -1,
                      product.color,
                      product.size,
                      product.productId,
                    )
                  }
                  className="text-l border rounded font-medium bg-gray-300 py-1 px-2 hover:bg-gray-400"
                >
                  -
                </button>
                <span className="ml-2 font-medium">{product.quantity} </span>
                <button
                  onClick={() =>
                    handleAddtocart(
                      product.quantity,
                      +1,
                      product.color,
                      product.size,
                      product.productId,
                    )
                  }
                  className="text-l border rounded font-medium bg-gray-300 py-1 px-2 hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <span>{product.price} $</span>
              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product.color,
                    product.size,
                    product.productId,
                  )
                }
                className=" text-red-500 font-semibold text-xs hover:text-red-700 "
              >
                <MdDeleteForever className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
