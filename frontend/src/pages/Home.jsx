import Hero from "../components/Layout/Hero"
import GenderCollectionSection from "../components/Products/GenderCollectionSection"
import NewArrivals from "../components/Products/NewArrivals"
import ProductsDetails from "../components/Products/ProductsDetails"

function Home(){
    return <div>
        <Hero />
        <GenderCollectionSection />
        <NewArrivals />
        {/* best seller */}
        <h2 className="text-3xl font-bold mb-4 text-center">Best seller</h2>
        <ProductsDetails />
    </div>
}

export default Home