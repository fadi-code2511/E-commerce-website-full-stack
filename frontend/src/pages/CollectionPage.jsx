import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import ProudctsGrid from "../components/Products/ProudctsGrid";
import SortOptions from "../components/Products/SortOptions";
import { useParams, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fectchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
  const { collection } = useParams();  //reading from (path)
  const [searchParams] = useSearchParams();//readinf from (query)
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);  //convert searchParams to an object
  // console.log(searchParams) to check the type of searchParams

  // const [products, setProducts] = useState([]); hardcoded
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    dispatch(fectchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

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
  // useEffect(() => {   hardcoded
  //   setTimeout(() => {
  //     const fetchedProducts = [
  //       {
  //         _id: 1,
  //         name: "product1",
  //         price: 50,
  //         images: [{ url: "https://picsum.photos/id/11/500/500" }],
  //       },

  //       {
  //         _id: 2,
  //         name: "product2",
  //         price: 20,
  //         images: [{ url: "https://picsum.photos/id/22/500/500" }],
  //       },
  //       {
  //         _id: 3,
  //         name: "product3",
  //         price: 30,
  //         images: [{ url: "https://picsum.photos/id/33/500/500" }],
  //       },
  //       {
  //         _id: 4,
  //         name: "product4",
  //         price: 40,
  //         images: [{ url: "https://picsum.photos/id/44/500/500" }],
  //       },
  //       {
  //         _id: 5,
  //         name: "product1",
  //         price: 50,
  //         images: [{ url: "https://picsum.photos/id/11/500/500" }],
  //       },

  //       {
  //         _id: 6,
  //         name: "product2",
  //         price: 20,
  //         images: [{ url: "https://picsum.photos/id/22/500/500" }],
  //       },
  //       {
  //         _id: 7,
  //         name: "product3",
  //         price: 30,
  //         images: [{ url: "https://picsum.photos/id/33/500/500" }],
  //       },
  //       {
  //         _id: 8,
  //         name: "product4",
  //         price: 40,
  //         images: [{ url: "https://picsum.photos/id/44/500/500" }],
  //       },
  //     ];
  //     setProducts(fetchedProducts);
  //   }, 1000);
  // }, []);

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
        <ProudctsGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
