import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//retrive user info and token from localStorage if available
const userFromStorage=localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

//check for an existing guest ID in the local storage or generate new one
const initialGuestID=localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId",initialGuestID)

//initial state
const initialState={
    user:userFromStorage,
    guestId:initialGuestID,
    loading:false,
    error:null,
}

//Async thunk for user login
export const loginUser=createAsyncThunk("auth/loginUser",async (userData,{rejectWithValue}) => {
    try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,userData); 
        localStorage.setItem("userInfo",JSON.stringify(response.data.user));
        localStorage.setItem("userToken",response.data.token);
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

//Async thunk for user registertion
export const registerUser=createAsyncThunk("auth/registerUser",async (userData,{rejectWithValue}) => {
    try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,userData); 
        localStorage.setItem("userInfo",JSON.stringify(response.data.user));
        localStorage.setItem("userToken",response.data.token);
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.name=null;
            state.guestId=`guestId_${new Date.getTime()}`;//reset guestId on logout
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId",state.guestId);//set new guestId in localstorage
        },
        generateNewGuestId:(state)=>{
            state.guestId=`guestId_${new Date.getTime()}`;
            localStorage.setItem("guestId",state.guestId);
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        builder.addCase(registerUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        builder.addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})

export const {logout,generateNewGuestId}=authSlice.actions;
export const authReducer= authSlice.reducer
