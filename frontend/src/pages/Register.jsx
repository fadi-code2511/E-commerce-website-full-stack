import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import registerImg from "../assets/registerImg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  //get redirect parameter and check if it checkout somthing
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, name);
    dispatch(registerUser({ email, password, name }));
  };

  function handdlePassword(e) {
    setPassword(e.target.value);
  }
  return (
    <div className="flex justify-center items-center">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          action=""
          className="w-full max-w-md  p-8 rounded-lg border shadow-sm"
        >
          <div className="flex flex-col p-5 ">
            <h3 className="text-center text-xl mb-4 font-semibold">Trendy</h3>
            <h2 className="text-center mb-4 font-extrabold text-2xl">
              Hey there 👋
            </h2>
            <p className="text-center mb-4 text-sm text-black">
              Enter your name and email and password.
            </p>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                required
                name="name"
                placeholder="Enter you name"
                className=" text-gray-700 p-1 placeholder:text-sm border rounded outline-blue-400 mb-2 "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="font-semibold">
                Uername
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="Email"
                required
                name="email"
                placeholder="Enter you email address"
                className=" text-gray-700 p-1 placeholder:text-sm border rounded outline-blue-400 mb-2 "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                value={password}
                onChange={handdlePassword}
                type="text"
                required
                name="password"
                placeholder="Enter you password "
                className=" text-gray-700 p-1 placeholder:text-sm border rounded outline-blue-400 mb-2"
              />
            </div>
            <button className="bg-black p-2 text-sm rounded-md mb-4 text-white">
              Sign up
            </button>
            <p className=" text-center text-sm tracking-tighter">
              Do you have an account?{" "}
              <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-sm text-blue-400 font-bold  ">
                login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className=" hidden md:block w-1/2  ">
        <div className="w-full flex flex-col justify-center items-center ">
          <img
            src={registerImg}
            alt=""
            className="h-[600px] object-cover w-full mb-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
