import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import ProudctsGrid from "../components/Products/ProudctsGrid";
import SortOptions from "../components/Products/SortOptions";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  function handleClickOutside(e) {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setisSidebarOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleSidebar() {
    setisSidebarOpen(!isSidebarOpen);
  }
  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "product1",
          price: 50,
          image: [{ url: "https://picsum.photos/id/11/500/500" }],
        },

        {
          _id: 2,
          name: "product2",
          price: 20,
          image: [{ url: "https://picsum.photos/id/22/500/500" }],
        },
        {
          _id: 3,
          name: "product3",
          price: 30,
          image: [{ url: "https://picsum.photos/id/33/500/500" }],
        },
        {
          _id: 4,
          name: "product4",
          price: 40,
          image: [{ url: "https://picsum.photos/id/44/500/500" }],
        },
        {
          _id: 5,
          name: "product1",
          price: 50,
          image: [{ url: "https://picsum.photos/id/11/500/500" }],
        },

        {
          _id: 6,
          name: "product2",
          price: 20,
          image: [{ url: "https://picsum.photos/id/22/500/500" }],
        },
        {
          _id: 7,
          name: "product3",
          price: 30,
          image: [{ url: "https://picsum.photos/id/33/500/500" }],
        },
        {
          _id: 8,
          name: "product4",
          price: 40,
          image: [{ url: "https://picsum.photos/id/44/500/500" }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row ">
      <button
        onClick={toggleSidebar}
        className="flex justify-center items-center p-2 border lg:hidden  "
      >
        <FaFilter className="mr-2" />
      </button>

      {/* filter sidebar */}
      <div
        ref={sidebarRef}
        className={` ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }  w-64 transition duration-500 inset-y-0 lg:translate-x-0 lg:static overflow-y-auto left-0 bg-white z-50 fixed `}
      >
        <FilterSidebar />
      </div>

      <div className="flex-grow p-4">
        <h1 className="text-2xl uppercase mb-4">all collection</h1>
        {/* sort options */}
        <SortOptions />
        {/* products grid */}
        <ProudctsGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
