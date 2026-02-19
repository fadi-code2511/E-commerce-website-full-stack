import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const CartDrawer = ({ toggleCartDrawer, drawOpen }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const {cart} = useSelector((state) => state.cart);
;
  
  const userId = user ? user._id : null;

  const handleCheckOut = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`w-3/4 sm:w-1/2 md:w-[30rem] bg-white/95 z-50 fixed h-full top-0 right-0 flex  flex-col transition delay-100 ${drawOpen ? "taranlate-x-0" : "translate-x-full"}  `}
    >
      {/* close cart drawer button */}
      <div className="p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600 hover:text-gray-700" />
        </button>
      </div>
      {/* cart content with scrollable area */}
      <div className="ml-3 flex grow flex-col overflow-y-auto">
        <span className=" text-xl font-semibold mb-2">Your cart</span>
        {/* cart-content */}
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-center m-32">your cart is empty</p>
        )}
      </div>
      <div className="flex  flex-col sticky  bottom-0 p-4  bg-gray-100 justify-center items-center border-t-2 ">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckOut}
              className="text-white w-full bg-black hover:bg-gray-600 py-3 rounded-lg transition "
            >
              checkout
            </button>
            <p className="text-gray-400 text-sm mt-2">Included Taxes</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
