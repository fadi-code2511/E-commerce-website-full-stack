import { Link } from "react-router";
import featursImg from "../../assets/featursImg.jpg";

function FeaturedCollection() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className=" container mx-auto flex  flex-col-reverse lg:flex-row items-center  bg-red-300 rounded-3xl ">
        {/* left content */}
        <div className="lg:w-1/2 text-center lg:text-left p-8">
          <h2 className="text-lg  font-semibold text-gray-700 mb-2">
            Comfort and style
          </h2>
          <h2 className="text-4xlg lg:text-5xl  font-bold  mb-6">
            Made for you
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Discover high quality and more and more and more
          </p>
          <Link
            to="#"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
          >
            Shop now
          </Link>
        </div>
        {/* right content */}
        <div className="lg:w-1/2">
          <img
            className="w-full h-full object-cover lg:rounded-br-3xl lg:rounded-tr-3xl "
            src={featursImg}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollection;
