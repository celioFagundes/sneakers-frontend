import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

const AddToCartButton = ({
  isOnCart,
  addToCart,
  removeFromCart,
  product,
  sizeSelected,
}) => {
  return (
    <div>
      <div className='flex flex-col sm:flex-row my-2 justify-center lg:justify-start '>
        {sizeSelected !== '' ? (
          isOnCart ? (
            <button
              onClick={removeFromCart}
              className='
            w-full sm:w-60 
            my-3 sm:my-0
            text-white  text-center uppercase font-medium
            bg-gray-900  border-0 py-2 px-6 
            focus:outline-none 
            hover:bg-gray-600 
            rounded-sm
            shadow'
            >
              Remove from cart
            </button>
          ) : (
            <button
              onClick={addToCart}
              className='
            w-full sm:w-60 
            my-3 sm:my-0
            text-white  text-center uppercase font-medium
            bg-gray-900  border-0 py-2 px-6 
            focus:outline-none 
            hover:bg-gray-600 
            rounded-sm
            shadow'
            >
              {product && 'Add to cart'}
            </button>
          )
        ) : (
          <button
          disabled  = {sizeSelected === ''}
            className='
      w-full sm:w-60 
      my-3 sm:my-0
      text-white  text-center uppercase font-medium
      bg-gray-900  border-0 py-2 px-6 
      focus:outline-none 
      hover:bg-gray-600 
      rounded-sm
      shadow'
          >
            Select size
          </button>
        )}
        <button
        
          className='
      p-2 ml-1
      border-2 border-darkBlack 
      flex items-center justify-center 
      text-black 
      bg-white 
      hover:bg-darkBlack hover:text-white hover:cursor-pointer
      transition-all
      '
        >
          <AiOutlineHeart size={28} />
        </button>
      </div>
    </div>
  )
}

export default AddToCartButton
