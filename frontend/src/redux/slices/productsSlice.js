import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products by collections and filters
export const fectchProductsByFilters = createAsyncThunk(
  "poducts/fetchByFilters",
  async ({
    collection,
    category,
    size,
    color,
    brand,
    maxPrice,
    minPrice,
    material,
    gender,
    search,
    sortBy,
    limit,
  }) => {
    const query = new URLSearchParams(); //create query params for building a daynamic filter url
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (category) query.append("category", category);
    if (color) query.append("color", color);
    if (brand) query.append("brand", brand);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (minPrice) query.append("minPrice", minPrice);
    if (material) query.append("material", material);
    if (gender) query.append("gender", gender);
    if (search) query.append("search", search);
    if (sortBy) query.append("sortBy", sortBy);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`,
    );
    return response.data;
  },
);

//Async thun fetch a single product by id
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/porducts/${id}`,
    );
    return response.data;
  },
);

//Async thun fetch a similar products 
export const fethcSimilarProducts = createAsyncThunk(
  "products/fethcSimilarProducts",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/porducts/similar/${id}`,
    );
    return response.data;
  },
);

//Async thun update a  product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/porducts/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return response.data;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    similarProducts: [],
    selectedProduct: null,
    loading: false,
    error: null,
    filters: {
      collection: "",
      category: "",
      size: "",
      color: "",
      brand: "",
      maxPrice: "",
      minPrice: "",
      material: "",
      gender: "",
      search: "",
      sortBy: "",
      limit: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };   //this called {partial update}==> ...action.payload to merge it with filters object no add new key like(action:payload)
    },
    clearFilters: (state) => {
      state.filters = {
        collection: "",
        category: "",
        size: "",
        color: "",
        brand: "",
        maxPrice: "",
        minPrice: "",
        material: "",
        gender: "",
        search: "",
        sortBy: "",
        limit: "",
      };
    },
  },
  extraReducers:(builder)=>{
    //handle filters
    builder.addCase(fectchProductsByFilters.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })
    builder.addCase(fectchProductsByFilters.fulfilled,(state,action)=>{
        state.loading=false;
        state.products=Array.isArray(action.payload)? action.payload: [];   // to check if the api return an array of objects
    })
    builder.addCase(fectchProductsByFilters.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message;
    })

    //handle fetching single product details
    builder.addCase(fetchProductDetails.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })
    builder.addCase(fetchProductDetails.fulfilled,(state,action)=>{
        state.loading=false;
        state.products=action.payload;
    })
    builder.addCase(fetchProductDetails.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message;
    })
    
    //handle update  product 
    builder.addCase(updateProduct.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })
    builder.addCase(updateProduct.fulfilled,(state,action)=>{
        state.loading=false;
        const updatedProduct=action.payload;
        const index=state.products.findIndex(product=>product.id===updatedProduct.id)
        if(index!==-1){
            state.products[index]=updatedProduct;
        }
    })
    builder.addCase(updateProduct.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message;
    }
)
    //handle similar  products
    builder.addCase(fethcSimilarProducts.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })
    builder.addCase(fethcSimilarProducts.fulfilled,(state,action)=>{
        state.loading=false;
        state.similarProducts=action.payload
    })
    builder.addCase(fethcSimilarProducts.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message;
    })
  }
});

export const {setFilters,clearFilters}=productsSlice.actions;
export const productReducer=productsSlice.reducer