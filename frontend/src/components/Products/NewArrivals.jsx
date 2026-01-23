import React from "react";
import { useRef,useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router";

const NewArrivals = () => {
    // const scrollRef=useref(null)
    // const [isDragging,setIsDragging]=useState("")
  const newArrivals = [
    {
      _id: "1",
      name: "staylish jacket",
      price: 40,
      images: {
        url: "https://picsum.photos/id/1/200/200",
        altText: "staylish jacket",
      },
    },
    {
      _id: "2",
      name: "staylish short",
      price: 50,
      images: {
        url: "https://picsum.photos/id/2/200",
        altText: "staylish jacket",
      },
    },
    {
      _id: "3",
      name: "staylish T-shirt",
      price: 120,
      images: {
        url: "https://picsum.photos/id/3/200",
        altText: "staylish jacket",
      },
    },
    {
      _id: "4",
      name: "staylish jacket",
      price: 40,
      images: {
        url: "https://picsum.photos/200",
        altText: "staylish jacket",
      },
    },
    {
      _id: "5",
      name: "staylish jacket",
      price: 40,
      images: {
        url: "https://picsum.photos/200",
        altText: "staylish jacket",
      },
    },
    {
      _id: "6",
      name: "staylish jacket",
      price: 40,
      images: {
        url: "https://picsum.photos/200",
        altText: "staylish jacket",
      },
    },
    {
      _id: "7",
      name: "staylish jacket",
      price: 40,
      images: {
        url: "https://picsum.photos/200",
        altText: "staylish jacket",
      },
    },
  ];
  return (
    <section className="px-6 mt-12">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-extrabold mb-5">
          Explor our new arrivals
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          Discover the latest style........... ...... ...... ...... ....... ........ ......
        </p>
        {/* scroll button */}
        {/* <div className="absolute right-0 top-[70px] space-x-3">
          <button className="bg-white border rounded p-2">
            <FiChevronLeft />
          </button>
          <button className="bg-white border rounded p-2">
            <FiChevronRight />
          </button>
        </div> */}
        <div className="container mx-auto overflow-x-scroll flex space-x-2">
            {newArrivals.map(item=>{
               return <div key={item._id} className="relative min-w-[100%] sm:min-w-[50%] lg:min-w-[30%]">
                <img className="h-[400px] w-full object-cover rounded-lg" src={item.images.url} alt={item.images.altText} />
                <div className=" w-full backdrop-blur-md absolute bottom-0  text-white">
                    <Link to="#">     
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="mt-1">{item.price}$</p>
                    </Link>
                </div>
               </div>
            })}
            {/* <div className=" bg-black rounded h-[200px] w-[100px]"></div> */}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
