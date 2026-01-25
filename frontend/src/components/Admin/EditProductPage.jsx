import React, { useState } from "react";

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    sizes: [],
    colors: [],
    collection: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/id/237/200/300",
        alt:""
      },
      {
        url: "https://picsum.photos/id/232/200/300",
        alt:""
      },
    ],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
    console.log(productData);
  }
  function handleImageUplaod(e) {
    console.log(e.target.files[0].name);
  }
  function handleSubmit(e) {
    e.preventDefault()
    console.log(productData);
  }

  return (
    <div className="max-w-5xl m-auto p-6 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        {/* product name */}
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Product Name
          </label>
          <input
            value={productData.name}
            onChange={handleChange}
            type="text"
            name="name"
            id=""
            className="border rounded w-full"
            required
          />
        </div>
        {/* description */}
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Description
          </label>
          <textarea
            value={productData.description}
            onChange={handleChange}
            name="description"
            id=""
            rows={5}
            className="border rounded w-full"
            required
          ></textarea>
        </div>
        {/* price */}
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Price
          </label>
          <input
            value={productData.price}
            onChange={handleChange}
            type="number"
            name="price"
            id=""
            className="border rounded w-full"
            required
          />
        </div>
        {/* Count in stock */}
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Count in stock
          </label>
          <input
            value={productData.countInStock}
            onChange={handleChange}
            type="number"
            name="countInStock"
            id=""
            className="border rounded w-full"
            required
          />
        </div>
        {/* SKU */}
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            SKU
          </label>
          <input
            value={productData.sku}
            onChange={handleChange}
            type="text"
            name="sku"
            id=""
            className="border rounded w-full"
            required
          />
        </div>
        {/* sizes  */}
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Sizes (Comma-separated)
          </label>
          <input
            value={productData.sizes.join(",")} //we add join function becouase the input takes string and => sizes is an array (join() convert the array to string)
            onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                sizes: e.target.value.split(",").map((size) => size.trim()), //split() to convert string to array and map to using trim() to delete spaces.
              }));
            }}
            type="text"
            name="sizes"
            id=""
            className="border rounded w-full"
            required
          />
        </div>
        {/* colors  */}
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Colors (Comma-separated)
          </label>
          <input
            value={productData.colors.join(",")}
            onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                colors: e.target.value.split(",").map((color) => color.trim()),
              }));
            }}
            type="text"
            name="colors"
            id=""
            className="border rounded w-full"
            required
          />
        </div>
        {/* colors  */}
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Upload Image
          </label>
          <input
            onChange={handleImageUplaod}
            type="file"
            name="images"
            id=""
            className="border rounded w-full"
          />
          <div className="flex gap-4 mt-4">
            {productData.images.map((img,index) => (
              <div key={index}>
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                ></img>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
            
        <button type="submit" className="bg-green-600 hover:bg-green-700 py-2 text-white rounded-md w-1/4 text-center ">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
