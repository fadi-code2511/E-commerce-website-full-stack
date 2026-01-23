import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, searchParams.get("maxPrice") || 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["red", "black", "blue", "yellow", "gray", "green", "Pink"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Wool", "Denim", "Silk"];
  const genders = ["Men", "Women"];
  const brands = ["Street style", "Nike", "Polo"];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newFilters = { ...filters };

    if (type == "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => {
          return item != value;
        });
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    console.log(newFilters);
    updateUrlParams(newFilters);
  }

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]); // captures the URL's query parameters and stores them as a standard JavaScript key-value object named params
    // console.log("@params");
    // console.log(params.cat); // www.somting.com?cat=5, output is the value of cat which is 5
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
  }, [searchParams]);

  function updateUrlParams(newFilters) {
    const params = new URLSearchParams();
    // console.log(params);
    // console.log(Object.keys(newFilters)) 
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));  // we used .join becouse the url doesn't understad array , so we need to to convert it a string "S,M,L" instead of ["S","M","L"]
        // console.log(params,"@@");
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
        
      }
    });
    setSearchParams(params);
    // console.log(params.toString());
    
    navigate(`?${params.toString()}`);
  }

  function hangleChangePrice(e){
    const newPrice=e.target.value;
    setPriceRange([0,newPrice])
    const newFilters={...filters,minPrice: 0 ,maxPrice:newPrice};
    setFilters(newFilters)
    updateUrlParams(newFilters)
  }

  return (
    <div className="p-4">
      <h3 className="text-xl text-gray-800 font-medium mb-4">Filter</h3>
      {/* category */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Category</label>
        {categories.map((category) => {
          return (
            <div key={category} className="flex items-center mb-1">
              <input
                onChange={handleChange}
                value={category}
                type="radio"
                name="category"
                checked={filters.category === category}
                className="mr-2 h-4 w-4 form-radio   accent-green-500"
              />
              <label className="text-gray-700">{category}</label>
            </div>
          );
        })}
      </div>
      {/* gender */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Gender</label>
        {genders.map((gender) => {
          return (
            <div key={gender} className="flex items-center mb-1">
              <input
                onChange={handleChange}
                value={gender}
                type="radio"
                name="gender"
                checked={filters.gender===gender}
                className="mr-2 h-4 w-4 form-radio   accent-green-500"
              />
              <label className="text-gray-700">{gender}</label>
            </div>
          );
        })}
      </div>
      {/* colors */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Color</label>
        {colors.map((color) => {
          return (
            <button
              value={color}
              name="color"
              onClick={handleChange}
              key={color}
              className={`rounded-full h-7 w-7 ml-1 transition hover:scale-110 ${
                filters.color === color
                  ? "border-gray-600 border-2 ring-2"
                  : "bg-white"
              }`}
              style={{ backgroundColor: color.toLocaleLowerCase() }}
            ></button>
          );
        })}
      </div>
      {/* sizes */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Size</label>
        {sizes.map((size) => {
          return (
            <div key={size} className="flex items-center mb-1">
              <input
                onChange={handleChange}
                value={size}
                type="checkbox"
                checked={filters.size.includes(size)}
                name="size"
                className="mr-2 h-4 w-4  accent-green-500"
              />
              <label className="text-gray-700">{size}</label>
            </div>
          );
        })}
      </div>
      {/* material */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Material</label>
        {materials.map((material) => {
          return (
            <div key={material} className="flex items-center mb-1">
              <input
                onChange={handleChange}
                value={material}
                type="checkbox"
                name="material"
                className="mr-2 h-4 w-4  accent-green-500"
                checked={filters.material.includes(material)}
              />
              <label className="text-gray-700">{material}</label>
            </div>
          );
        })}
      </div>
      {/* brand */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Brand</label>
        {brands.map((brand) => {
          return (
            <div key={brand} className="flex items-center mb-1">
              <input
                value={brand}
                onChange={handleChange}
                type="checkbox"
                name="brand"
                checked={filters.brand.includes(brand)}
                className="mr-2 h-4 w-4  accent-green-500"
              />
              <label className="text-gray-700">{brand}</label>
            </div>
          );
        })}
      </div>
      {/* Price range */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">
          Price range
        </label>
        <div className="block items-center mb-1 ">
          <input
          
            type="range"
            name="priceRange"
            className="mr-2 w-full  accent-green-500 cursor-pointer  "
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={hangleChangePrice}
          />
          <div className="flex justify-between mt-2">
            <label className="text-gray-700">0$</label>
            <label className="text-gray-700">{priceRange[1]}$</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
