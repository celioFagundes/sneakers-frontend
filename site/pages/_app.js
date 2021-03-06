import '../css/styles.css'
import { CartProvider } from '../lib/CartContext'
import '../components/CarouselSingle/carousel-single.css'
import '../components/Carousel/carousel.css'


const App = ({ Component, pageProps }) => {
  
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}
export default App
