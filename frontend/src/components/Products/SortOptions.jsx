import React from "react";
import { useSearchParams } from "react-router";

const SortOptions = () => {
  const [searchParams,setSearchParams]=useSearchParams();
  function handleSortChange(e){
    const sortBy=e.target.value
    searchParams.set("sortBy",sortBy)  // we use .set becouse we need to add one param only to the url , unlike the filter we used [ const params = new URLSearchParams();]
    setSearchParams(searchParams)
  }
  return (
    <div className="left-0 mb-4 flex items-center justify-end">
      <select onChange={handleSortChange}
      value={searchParams.get("sortBy") || ""}  // we used .get becouse when we do a refresh , the ui will get the vlaue from url
       name="" id="" className="border p-2 focus:outline-none rounded-md ">
        <option value="" className=" text-sm ">Default</option>
        <option value="priceAsc" className=" text-sm " >Price: low to high</option>
        <option value="priceDsc" className=" text-sm " >Price: high to low</option>
        <option value="popularity" className=" text-sm " >Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
