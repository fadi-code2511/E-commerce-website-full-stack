import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router";
import { fectchProductsByFilters, setFilters } from "../../redux/slices/productsSlice";


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch=useDispatch();
  const navigate=useNavigate()

  function handleSearchToggle() {
    setIsOpen(!isOpen);
  }
  function handleChangeInput(e){
    setSearchTerm(e.target.value)
  }
  function handleFormSubmit(e){
    e.preventDefault()
    // console.log("we are in the search bar:",searchTerm);
    dispatch(setFilters({search:searchTerm}));
    dispatch(fectchProductsByFilters({search:searchTerm}))
    navigate(`/collection/all?search=${searchTerm}`)
    setSearchTerm("")
    setIsOpen(!isOpen)
    

    
  }

  return (
    <div
      className={` flex justify-center items-center w-full transition-all duration-300 ${
        isOpen ? "absolute left-0 top-0 h-24 w-full bg-white z-50 " : "w-auto"
      }`}
    >
      {isOpen ? (
        <form className="  flex justify-center items-center w-full relative" onSubmit={handleFormSubmit}>
          <div className="relative w-1/2">
            <input
              type="text"
              onChange={handleChangeInput}
              value={searchTerm}
              placeholder="Search"
              className=" rounded-lg bg-gray-200 py-2 pl-2 pr-12 focus:outline-none w-full"
            />
            <button
              type="submit"
              
              className=" absolute right-2 top-2 text-gray-500 hover:text-gray-800 "
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          <button
            onClick={handleSearchToggle}
            type="button"
            className="  text-red-400 hover:text-gray-800 absolute top-1/2 right-10 transform -translate-y-1/2 "
          >
            <HiMiniXMark className="w-7 h-7" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
export default SearchBar;
