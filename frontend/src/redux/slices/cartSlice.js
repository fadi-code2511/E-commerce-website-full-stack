import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//Helper function to load cart from localstorage
const loadCartFromLocalStorage=()=>{
   const storedCart= localStorage.getItem("cart");
   return storedCart?JSON.parse(storedCart) : {products:[]}
}

//helper function to add cart to localStorage
const saveCartToLocalStorage=(cart)=>{
     localStorage.setItem("cart",JSON.stringify(cart))
}

//fetch cart for a user or guest
export const fetchCart=createAsyncThunk("cart/fetchCart",async({userId,guestId},{rejectWithValue})=>{
    try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{params:{guestId,userId}});
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
    }
});

// add an item to cart for user or guest
export const addToCart=createAsyncThunk("cart/addToCart",async( {productId, size, color, userId, guestId, quantity},{rejectWithValue})=>{
    try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{ productId, size, color, userId, guestId, quantity});
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)
    }
})

// update Cart Item Quantity 
export const updateCartItemQuantity=createAsyncThunk("cart/updateCartItemQuantity",async( {productId, size, color, userId, guestId, quantity},{rejectWithValue})=>{
    try {
        const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{ productId, size, color, userId, guestId, quantity});
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)
    }
})

// Remove an item from the cart
export const removefromCart=createAsyncThunk("cart/removefromCart",async( {productId, userId, guestId, size, color},{rejectWithValue})=>{
    try {
        const response=await axios({ // DELETE and GET method in axios take 2 params(url,config) , unlike (POST,PUT,PATCH) 3 params(url,data,config)
            method:"DELETE",
            url:`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data:{ productId, size, color, userId, guestId},
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)
    }
})

//merg guset cart into user cart
export const mergeCart=createAsyncThunk("cart/mergeCart",async({guestId,user},{rejectWithValue})=>{
    try {
        const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,{guestId,user},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`,
            }
        })
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)
    }
})

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cart:loadCartFromLocalStorage(),
        loading:false,
        error:null,
    },
    reducers:{
        clearCart:(state)=>{
            state.cart={products:[]};
            localStorage.removeItem("cart");
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToLocalStorage(action.payload)
        })
        .addCase(fetchCart.rejected,(state)=>{
            state.loading=false;
            state.error=action.error.message || "faild to feth cart";
        })
        .addCase(addToCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToLocalStorage(action.payload)
        })
        .addCase(addToCart.rejected,(state)=>{
            state.loading=false;
            state.error=action.payload?.message || "faild to add to cart";
        })
        .addCase(updateCartItemQuantity.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateCartItemQuantity.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToLocalStorage(action.payload)
        })
        .addCase(updateCartItemQuantity.rejected,(state)=>{
            state.loading=false;
            state.error=action.payload?.message || "faild to update item quantity in cart";
        })
        .addCase(removefromCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(removefromCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToLocalStorage(action.payload)
        })
        .addCase(removefromCart.rejected,(state)=>{
            state.loading=false;
            state.error=action.payload?.message || "faild to remove from cart";
        })
        .addCase(mergeCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(mergeCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToLocalStorage(action.payload)
        })
        .addCase(mergeCart.rejected,(state)=>{
            state.loading=false;
            state.error=action.payload?.message || "faild to merge cart";
        })
    }

})

export const{clearCart}=cartSlice.actions;
export const cartReducer=cartSlice.reducer;