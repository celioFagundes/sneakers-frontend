import { useEffect, useState } from 'react';
import Footer from '../Footer'
import Header from '../Header'
import Banner from '../Home/Banner';

const Layout = ({ children, categories , brands}) => {
  
  return (
    <div className='flex flex-col justify-between  min-h-screen '>
      <Header categories={categories} brands = {brands} />
      <div className='w-full mx-auto pt-28'>{children}</div>
      <Banner/>
      <Footer />
    </div>
  )
}

export default Layout
