import React from 'react'

const Title = ({ children }) => {
  return (
    <div className='bg-white py-2 px-2 rounded shadow-md'>
      <h3 className='text-black font-bold text-xl  font-kumbh-sans'>
        {children}
      </h3>
    </div>
  )
}

export default Title
