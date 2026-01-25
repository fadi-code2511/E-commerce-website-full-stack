import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import {Toaster} from "sonner"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductsDetails from "./components/Products/ProductsDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductsManagement from "./components/Admin/ProductsManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";


function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>
        {/*user layout*/}
        <Route path="/" element={<UserLayout />}> 
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="collection/:collection" element={<CollectionPage />}></Route>  
          <Route path="product/:id" element={<ProductsDetails />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route path="order-confirmation" element={<OrderConfirmationPage />}></Route>
          <Route path="order/:id" element={<OrderDetailsPage />}></Route>
          <Route path="my-orders" element={<MyOrdersPage />}></Route>
        </Route>
        {/*admin layout*/}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage/>}></Route>
          <Route path="users" element={<UserManagement/>}></Route>
          <Route path="products" element={<ProductsManagement/>}></Route>
          <Route path="products/:id/edit" element={<EditProductPage/>}></Route>
          <Route path="orders" element={<OrderManagement/>}></Route>
          
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// BrowserRouter: providing the necessary context and functionality for client-side routing in a React application. It enables seamless navigation between different application views without requiring a full page reload
{
  /* Route components to manage multiple routs in our app  */
}
