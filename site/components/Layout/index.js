import { useEffect, useState } from 'react';
import Footer from '../Footer'
import Header from '../Header'

const Layout = ({ children, categories , brands}) => {
  
  return (
    <div className='flex flex-col justify-between  min-h-screen '>
      <Header categories={categories} brands = {brands} />
      <div className='w-full mx-auto '>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
