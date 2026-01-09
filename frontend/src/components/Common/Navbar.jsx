import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [drawOpen, setDrawOpen] = useState(false);
  const [menuBurgerOpen, setMenuBurger] = useState(false);
  function toggleCartDrawer() {
    setDrawOpen(!drawOpen);
  }

  function toggleMenuBurger() {
    setMenuBurger(!menuBurgerOpen);
  }

  return (
    <>
      <nav className="container  flex justify-between  py-4 px-6 mx-auto">
        {/* logo-left */}
        <div>
          <Link to="/" className="text-2xl font-medium hover:text-green-600 uppercase">
            Trendy
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
          <button
            className="hover:text-black relative"
            onClick={toggleCartDrawer}
          >
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

          <button
            onClick={toggleMenuBurger}
            className="hover:text-black md:hidden"
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawOpen={drawOpen} toggleCartDrawer={toggleCartDrawer} />
      {/* mobile navigation */}
      <div
        className={` flex flex-col bg-white/95 top-0 left-0 h-full fixed shadow-lg z-50  transation-transform duration-300 w-3/4 md:w-1/3 sm:w-1/2 ${
          menuBurgerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className=" bg-gray-50 flex justify-end">
          <button onClick={toggleMenuBurger}>
            <IoMdClose className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="flex flex-col ml-1">
          <h2 className="font-semibold uppercase text-xl">menu</h2>
          <nav className="flex flex-col space-y-2">
            
          <Link
            to="#"
            onClick={toggleMenuBurger}
            className=" text-gray-600 mt-5 hover:text-black uppercase"
          >
            men
          </Link>
          <Link
            to="#"
            onClick={toggleMenuBurger}
            className=" text-gray-600  hover:text-black uppercase"
          >
            women
          </Link>
          <Link
            to="#"
            onClick={toggleMenuBurger}
            className=" text-gray-600  hover:text-black uppercase"
          >
            topwear
          </Link>
          <Link
            to="#"
            onClick={toggleMenuBurger}
            className=" text-gray-600 hover:text-black uppercase"
          >
            bottomwear
          </Link>

          </nav>
        </div>
      </div>
      {/* menu items */}
    </>
  );
}
export default Navbar;
