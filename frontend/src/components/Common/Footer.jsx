import React from "react";
import { Link } from "react-router";
import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { CiTwitter } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t-2 py-12">
      <div className=" container mx-auto bg-red-100 grid grid-cols-1 md:grid-cols-4 p-3 gap-8">
        {/* news */}
        <div>
          <h1 className="text-lg text-gray-800 mb-5">News</h1>
          <p className="text-gray-500 mb-4 text-sm">
            would you want to hear form us
          </p>
          <p className="mb-2 text-sm">
            subscrib and get 10% discount on your first order
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter your email"
              className="border-gray-300  p-3 outline-none text-sm transition-all border rounded-s w-full  focus:ring-1 ring-gray-500"
            />
            <button className="bg-black text-sm text-white p-3 rounded-e hover:text-gray-300">
              Subscribe
            </button>
          </div>
        </div>
        {/* shop links */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg text-gray-800 mb-5">Shop</h2>
          <Link to="$" className="text-gray-600 hover:text-gray-700">
            Men's Top wear
          </Link>
          <Link to="$" className="text-gray-600 hover:text-gray-700">
            Women's Top wear
          </Link>
          <Link to="$" className="text-gray-600 hover:text-gray-700">
            Men's Bottom wear
          </Link>
          <Link to="$" className="text-gray-600 hover:text-gray-700">
            Women's Bottom wear
          </Link>
        </div>
        {/* support links */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg text-gray-800 mb-5">Support</h2>
          <Link to="$" className="text-gray-600 hover:text-gray-700">
            Contact us
          </Link>
          <Link to="$" className="text-gray-600 hover:text-gray-700">
            About us
          </Link>
          <Link to="$" className="text-gray-600 hover:text-gray-700">
            FAQs
          </Link>
          <Link to="$" className="text-gray-600 hover:text-gray-700">
            Features
          </Link>
        </div>
        {/* Follow us */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg text-gray-800 mb-5">Follow us</h2>
          <div className="flex gap-2">
            <a href="#" className="hover:text-gray-500">
              <CiFacebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-500">
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-500">
              <CiTwitter className="h-5 w-5" />
            </a>
          </div>
          <div className="felx">
            <p className="text-gray-500">Call us</p>
            <p>
              <FiPhoneCall className="inline-block" /> +123456
            </p>
          </div>
        </div>
      </div>
      <div className="container border-t-2 mx-auto mt-6 pt-6">
        <p className="text-center text-gray-500 text-sm mb-2"> ©2025 ,all rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
