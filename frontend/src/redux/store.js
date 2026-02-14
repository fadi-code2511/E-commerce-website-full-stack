import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "../redux/slices/authSlice.js"
import { productReducer } from './slices/productsSlice.js'

const store=configureStore({
  reducer: {
    auth:authReducer,
    products:productReducer,
  }
})

export default store