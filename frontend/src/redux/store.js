import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "../redux/slices/authSlice.js"
import { productReducer } from './slices/productsSlice.js'
import { cartReducer } from './slices/cartSlice.js'

const store=configureStore({
  reducer: {
    auth:authReducer,
    products:productReducer,
    cart:cartReducer
  }
})

export default store