import Hero from "../components/Layout/Hero"
import GenderCollectionSection from "../components/Products/GenderCollectionSection"
import NewArrivals from "../components/Products/NewArrivals"
import ProductsDetails from "../components/Products/ProductsDetails"
import ProudctsGrid from "../components/Products/ProudctsGrid"
import FeaturedCollection from "../components/Products/FeaturedCollection"
import FeaturedSection from "../components/Products/FeaturedSection"
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react"
import { fectchProductsByFilters } from "../redux/slices/productsSlice"
import axios from "axios"


// const placeHolderProducts=[
//   {
//     _id:1,
//   name: "product1",
//   price: 50,
//   image: [{url:"https://picsum.photos/id/11/500/500"}],
    
// },
 
//   {
//     _id:2,
//   name: "product2",
//   price: 20,
//   image: [{url:"https://picsum.photos/id/22/500/500"}],

// },
//   {
//     _id:3,
//   name: "product3",
//   price: 30,
//   image: [{url:"https://picsum.photos/id/33/500/500"}],

// },
//   {
//     _id:4,
//   name: "product4",
//   price: 40,
//   image: [{url:"https://picsum.photos/id/44/500/500"}],

// },
//   {
//     _id:5,
//   name: "product1",
//   price: 50,
//   image: [{url:"https://picsum.photos/id/11/500/500"}],
    
// },
 
//   {
//     _id:6,
//   name: "product2",
//   price: 20,
//   image: [{url:"https://picsum.photos/id/22/500/500"}],

// },
//   {
//     _id:7,
//   name: "product3",
//   price: 30,
//   image: [{url:"https://picsum.photos/id/33/500/500"}],

// },
//   {
//     _id:8,
//   name: "product4",
//   price: 40,
//   image: [{url:"https://picsum.photos/id/44/500/500"}],

// }
// ];

function Home(){
  const dispatch=useDispatch();
  const {products,loading,error}=useSelector((state)=>state.products);
  const [bestSellerProduct,setBestSellerProduct]=useState(null)
  useEffect(()=>{
    // ferch products for specific collection
    dispatch(fectchProductsByFilters({
      gender: "Women",
      category: "Top Wear",
      limit: 8,
    }))
    //fectch bestseller product
    const fetchBestSeller=async()=>{
      try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data);
        
      } catch (error) {
        console.error(error)
      }
    }
    fetchBestSeller();
  },[dispatch])

    return <div>
        <Hero />
        <GenderCollectionSection />
        <NewArrivals />
        {/* best seller */}
        <h2 className="text-3xl font-bold mb-2 text-center">Best seller</h2>
        {bestSellerProduct ? (<ProductsDetails productId={bestSellerProduct._id} /> ): (<p className="text-center">...loading best seller product</p>)}
        
        <div className=" container mx-auto ">
            <h2 className="text-2xl text-center font-bold mb-2"> Top Women Wears</h2>
            <ProudctsGrid products={products} loading={loading} error={error} />
        </div>
        <FeaturedCollection />
        <FeaturedSection />
    </div>
}

export default Home