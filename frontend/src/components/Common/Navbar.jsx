import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";

function Navbar() {

    const [drawOpen,setDrawOpen]=useState(false);
    function toggleCartDrawer(){
        setDrawOpen(!drawOpen)
    }

  return (
    <>
      <nav className="container  bg-slate-100 flex justify-between items-center py-4 px-6 mx-auto">
        {/* logo-left */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        {/* Navigation-links-middle */}
        <div className=" md:flex hidden space-x-6">
          <Link
            to="#"
            className=" text-sm font-medium text-gray-700 hover:text-black uppercase"
          >
            men
          </Link>
          <Link
            to="#"
            className=" text-sm font-medium text-gray-700 hover:text-black uppercase"
          >
            women
          </Link>
          <Link
            to="#"
            className=" text-sm font-medium text-gray-700 hover:text-black uppercase"
          >
            topwear
          </Link>
          <Link
            to="#"
            className=" text-sm font-medium text-gray-700 hover:text-black uppercase"
          >
            bottomwear
          </Link>
        </div>
        {/* icons-right */}
        {/* profile icon */}
        <div className="flex  items-center  space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          {/* cart icon */}
          <button className="hover:text-black relative" onClick={toggleCartDrawer}>
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className=" bg-red-700 text-white absolute text-xs py-0.5 px-1.5 -top-1 rounded-full">
              5
            </span>
          </button>
          {/* search-bar */}
          <div>
            <SearchBar />
          </div>

          {/* menuBurger */}
          <button className="hover:text-black md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawOpen={drawOpen} toggleCartDrawer={toggleCartDrawer} />
    </>
   
    
  );
}
export default Navbar;
