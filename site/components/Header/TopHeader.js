import React from 'react'

const TopHeader = () => {
  return (
    <div className='bg-black py-2 '>
      <div className='container flex items-center justify-end'>
        <p className='
          mx-4
          font-kumbh-sans text-gray-300 text-xs 
        hover:text-white hover:cursor-pointer'>
          Support
        </p>
        <span className='text-xs text-gray-300'>|</span>
        <p className='
        mx-4 
        font-kumbh-san text-gray-300 text-xs 
        hover:text-white hover:cursor-pointer'>

          Join us
        </p>
        <span className='text-xs text-gray-300'>|</span>
        <p className='
        mx-4 
        font-kumbh-san text-gray-300 text-xs 
        hover:text-white hover:cursor-pointer'>
          Sign In
        </p>
      </div>
    </div>
  )
}

export default TopHeader
