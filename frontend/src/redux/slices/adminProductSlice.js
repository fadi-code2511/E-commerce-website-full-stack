import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL; // check later if error
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

//async thunk to fetch all products
export const fetchAllProdcuts = createAsyncThunk(
  "adminProducts/fetchAllProdcuts",
  async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });
    return response.data;
  },
);
//async thunk to create new product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData) => {
    const response = await axios.post(`${API_URL}/api/products`, productData, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });
    return response.data;
  },
);

//Async thun update a  product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/porducts/${id}`,
      productData,
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      },
    );
    return response.data;
  },
);

//Async thun delete a  product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id) => {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/porducts/${id}`, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });
    return id;
  },
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProdcuts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProdcuts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProdcuts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //create product

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id,
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      //delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products=state.products.filter(product=>product._id!==action.payload)
      })
      
  },
});

export const adminProductReducer=adminProductSlice.reducer