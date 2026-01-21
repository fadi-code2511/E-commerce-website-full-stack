import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import {Toaster} from "sonner"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductsDetails from "./components/Products/ProductsDetails";


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
          <Route path="collection/:collection" element={<CollectionPage/>}></Route>  
          <Route path="product/:id" element={<ProductsDetails/>}></Route>
        </Route>
        {/*admin layout*/}
        <Route></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// BrowserRouter: providing the necessary context and functionality for client-side routing in a React application. It enables seamless navigation between different application views without requiring a full page reload
{
  /* Route components to manage multiple routs in our app  */
}
