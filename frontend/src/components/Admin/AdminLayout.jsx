import React, { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router";

const AdminLayout = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  function toggleSidebar() {
    setisSidebarOpen(!isSidebarOpen);
  }

  // (second method)
  // function handleClickOutside(e) {
  //   if (sidbarRef.current && !sidbarRef.current.contains(e.target)) {
  //     setisSidebarOpen(false);
  //   }
  // }
  // const sidbarRef = useRef();
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  return (
    <div className="flex flex-col md:flex-row relative min-h-screen">
      {/* mobile toggle Btn */}
      <div className="bg-gray-900 flex  md:hidden p-4 z-20 text-white">
        <button onClick={toggleSidebar}>
          <IoMenu className="w-8 h-8" />
        </button>
        <h1 className="ml-4 text-lg font-medium">Admin Dashboard</h1>
      </div>
      {/* black overlay for mobile sidebar */}
        {isSidebarOpen&& (<div className="fixed inset-0 bg-opacity-50 md:hidden z-10 bg-black"
        onClick={toggleSidebar}> 
        </div>)}
        {/* sidebar */}
        <div 
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform
        ${isSidebarOpen?"translate-x-0":"-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:block md:static z-20`}>
          <AdminSidebar />
        </div>
        {/* main content */}
        <main className="flex-grow p-6 overflow-auto">
          <Outlet />
        </main>
        
          {/* second method more complicated */}
      {/* <div
        ref={sidbarRef}
        className={`${isSidebarOpen ? "translate-x-0 bg-opacity-90" : "-translate-x-full  "}
         transition-transform bg-gray-900 text-white  w-1/2 md:w-1/5 min-h-screen  flex-shrink-0  md:translate-x-0 md:static p-4  fixed z-20 `}
      >
        <h1>Trendy</h1>
        <h1>admon dajsd</h1>
        <div>
          <p>sds</p>
          <p>sds</p>
          <p>sds</p>
          <p>sds</p>
        </div>
        <button className="bg-red-400 rounded px-4 py-1 w-full">sdsd</button>
      </div>
      <div className="">
        <p>
          e? Possimus maxime minima
        </p>
      </div> */}
    </div>
  );
};

export default AdminLayout;
