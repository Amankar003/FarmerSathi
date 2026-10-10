import Header from '@/components/sathi/Header'
import Playground from '@/components/Playground'
import Footer from '@/components/sathi/Footer'

const page = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="py-8">
        <div className="text-center mb-4 px-4 reveal">
          <h1 className="font-heading text-4xl md:text-5xl mb-2">KRISHI LAB</h1>
          <p className="font-bold text-black/60 max-w-xl mx-auto">
            AI-powered tools for smart farming — detect diseases, predict yields, and check live prices.
          </p>
        </div>
        <Playground />
      </main>
      <Footer />
    </div>
  )
}

export default page