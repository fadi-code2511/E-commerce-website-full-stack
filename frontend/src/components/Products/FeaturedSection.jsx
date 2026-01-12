import React from "react";
import { HiShoppingBag } from "react-icons/hi2";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { HiOutlineCreditCard } from "react-icons/hi";



const FeaturedSection = () => {
  return (
    <section className="py-16 p-x-4 bg-white">
      <div className=" container mx-auto grid md:grid-cols-3 grid-cols-1 gap-8 text-center">
        {/* featur 1 */}
        <div className="flex flex-col items-center">
          <div className="p-4 mb-4 rounded-full">
            <HiShoppingBag />
          </div>
          <h4 className="mb-2">Free inernational shipping</h4>
          <p className="text-sm text-gray-600 tracking-tight">
            on all orders above 200$
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 mb-4 rounded-full">
            <HiArrowPathRoundedSquare />
          </div>
          <h4 className="mb-2">45 days return</h4>
          <p className="text-sm text-gray-600 tracking-tight">
            Money back gaurantee
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 mb-4 rounded-full">
            <HiOutlineCreditCard />
          </div>
          <h4 className="mb-2">Secure checkout</h4>
          <p className="text-sm text-gray-600 tracking-tight">
           100% secured checkout
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
