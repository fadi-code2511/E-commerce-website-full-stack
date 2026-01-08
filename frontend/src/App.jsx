import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}> {/*user layout*/}</Route>
        <Route>{/*admin layout*/}</Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// BrowserRouter: providing the necessary context and functionality for client-side routing in a React application. It enables seamless navigation between different application views without requiring a full page reload
{
  /* Route components to manage multiple routs in our app  */
}
