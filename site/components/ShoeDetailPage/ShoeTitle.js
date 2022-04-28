import React from 'react'

const ShoeTitle = ({product}) => {
  return (
    <div>
      <h2 className='text-md uppercase font-kumbh-sans  text-gray-500 tracking-widest'>
        {product.gender +
          ' / ' +
          product.category.name +
          ' / ' +
          product.brand.name}
      </h2>
      <h1 className='text-gray-900 text-4xl uppercase font-kumbh-sans font-normal italic mb-1'>
        {product.name + ' ' + product.color.colorName}
      </h1>
    </div>
  )
}

export default ShoeTitle
