import Link from 'next/link'
import React from 'react'

const Banner = () => {
  return (
    <div>
      <div className='bg-darkBlack w-full '>
        <div className='container mx-auto py-20 flex items-center justify-center'>
          <Link href={'#'}>
            <div
              className='
                flex items-center justify-start 
                bg-white  
                text-darkBlack text-2xl uppercase font-kumbh-sans
                px-5  py-1 
                border border-gray-400 
              hover:bg-lightBlack hover:text-white transition-all hover:cursor-pointer'
            >
              <a className='font-kumbh-sans mr-2'>Browse All Products</a>
            </div>
          </Link>
        </div>
      </div>
      <div className='bg-white w-full '>
        <div className='container mx-auto py-20 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-around text-center'>
          <Link href={'#'}>
            <div
              className='
                flex items-center justify-start 
                bg-darkBlack  
                text-white text-2xl uppercase font-kumbh-sans
                px-5  py-1 
                border border-gray-400 
              hover:bg-lightGray hover:text-darkBlack transition-all hover:cursor-pointer'
            >
              <a className='font-kumbh-sans mr-2'>Sign up for free</a>
            </div>
          </Link>
          <p className='uppercase text-2xl my-2 md:my-0 w-full md:w-fit'>Get exclusive discounts</p>
          <p className='uppercase text-2xl my-2 md:my-0 w-full md:w-fit'>Get Rewards</p>
          <p className='uppercase text-2xl my-2 md:my-0 w-full md:w-fit'>Get First Access</p>
        </div>
       
      </div>
    </div>
  )
}

export default Banner
