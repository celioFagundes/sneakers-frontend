import Footer from '../Footer'
import Header from '../Header'

const Layout = ({ children, categories , brands}) => {
  return (
    <div className='flex flex-col justify-between  min-h-screen bg-slate-100'>
      <Header categories={categories} brands = {brands} />
      <div className=' pb-8 mx-auto '>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
