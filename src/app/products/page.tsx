import Navbar from "@/components/Navbar"
import ProductCard from "@/components/ProductCard"
import { productdata } from "../data/productdata"
import Footer from "@/components/Footer"

const page = () => {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen py-[6rem] px-[5%] relative">
          
          <div className="text-center mb-[5rem]">
              <h1 className="section-title gradient-text-gold">Farming Solutions Hub</h1>
              <p className="section-subtitle mx-auto">
                  Discover top-quality seeds, fertilizers, and agricultural tools recommended for your specific crop needs.
              </p>
          </div>

          <div className="flex flex-wrap justify-center gap-[3rem]">
              {
                  productdata.map((i)=>{
                      return(
                          <ProductCard
                          key={i.id}
                          name={i.productname}
                          description={i.desc}
                          price={i.price}
                          image={i.img}
                          />
                      )
                  })
              }
          </div>
      </div>
      <Footer/>
    </>
  )
}

export default page