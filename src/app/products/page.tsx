import Header from "@/components/sathi/Header"
import ProductCard from "@/components/ProductCard"
import { productdata } from "../data/productdata"
import Footer from "@/components/sathi/Footer"
import { Store } from "lucide-react"

const page = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="min-h-screen py-8 px-4">
        {/* Title */}
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="bg-orange-accent border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_#111]">
              <Store className="text-black" size={28} />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl">DUKAAN</h1>
          </div>
          <p className="font-bold text-black/60 max-w-xl mx-auto">
            Top-quality seeds, fertilizers, and agricultural tools recommended for your specific crop needs.
          </p>
        </div>

        {/* Product Grid */}
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {productdata.map((i) => (
            <ProductCard
              key={i.id}
              name={i.productname}
              description={i.desc}
              price={i.price}
              image={i.img}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default page