import { Link } from "react-router";
import heroSecImg from "../../assets/heroSecImg.png";


const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroSecImg}
        alt=""
        className="w-full h-[400px] md:h-[620px] sm:h-[500px] object-cover"
      />
      {/* text-hero-sec */}
      <div className=" absolute inset-0  items-center flex justify-center ">
        <div className="text-center">
          <h1 className="text-white font-extrabold text-4xl md:text-9xl mb-5">
            Explore
          </h1>
          <p className="text-gray-500 text-sm md:text-lg mb-3">Explore our trendy outfits</p>
          <Link  to="#" className="bg-white rounded text-black px-3 py-1 hover:bg-gray-100">Shop Now</Link>
        </div>
      </div>     
    </section>
  );
};

export default Hero;
