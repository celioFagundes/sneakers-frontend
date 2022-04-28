import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Link from 'next/link'
import { useCart } from '../../lib/CartContext'
import { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const CartPreview = () => {
  const cart = useCart()
  const [cartDisplayed, setCartDisplayed] = useState(cart.items)
  const [cartOpen, setCartOpen] = useState(false)

  const closeCart = () => {
    setCartOpen(false)
  }
  useEffect(() => {
    const loadedCart = localStorage.getItem('cart')
    if (loadedCart) {
      const newCart = JSON.parse(loadedCart)
      setCartDisplayed(newCart)
    }
  }, [cart.items])

  const onFocus = () => {
    const loadedCart = localStorage.getItem('cart')
    if (loadedCart) {
      const newCart = JSON.parse(loadedCart)
      setCartDisplayed(newCart)
    }
  }
  const onBlur = () => {
    closeCart()
  }
  useEffect(() => {
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    onFocus()
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])
  return (
    <div>
      <div
        onClick={() => setCartOpen(!cartOpen)}
        className='hover:bg-gray-100 text-darkBlack px-2 py-2 rounded-full hover:text-black hover:cursor-pointer relative'
      >
        <AiOutlineShoppingCart size={28} />
        {cart && cart.cartSize > 0 && (
          <div
            className='absolute bottom-5 -right-1 bg-orange-400 text-xs text-white'
            style={{
              height: '15px',
              width: '15px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              borderRadius: '50%',
            }}
          >
            <span>{Object.keys(cartDisplayed).length}</span>
          </div>
        )}
      </div>
      {cartOpen && (
        <div
          className={`${
            Object.keys(cartDisplayed).length > 0 &&
            'h-52 sm:w-90 overflow-scroll'
          } w-full  sm:w-auto absolute z-50 right-0 sm:right-12 top-24 bg-gray-50 px-3  py-3 rounded shadow-sm`}
        >
          <div className='border-b flex flex-row items-center justify-between py-2'>
            <p className='text-gray-900 font-medium '>Your cart:</p>
            <Link href='/cart'>
              <a className='text-blue-600 font-medium text-sm hover:underline px-4  rounded'>
                Go to cart
              </a>
            </Link>
          </div>

          {Object.keys(cartDisplayed).length > 0 && (
            <div>
              {Object.keys(cartDisplayed).map(item => (
                <div
                  className='py-2 border-b flex justify-start items-center '
                  key={item}
                >
                  <img
                    className='h-full w-10 mr-2 bg-gray-900'
                    src={
                      cartDisplayed[item].images
                        ? cartDisplayed[item].images[0]
                        : 'https://dummyimage.com/40x50'
                    }
                  />
                  <div className='flex flex-col items-start justify-start px-0 mx-0 w-full '>
                    <Link href={`/shoe/${cartDisplayed[item].slug}`} passHref>
                      <a
                        className='text-gray-800 font-medium text-sm hover:underline'
                        onClick={closeCart}
                      >
                        {cartDisplayed[item].name}
                      </a>
                    </Link>

                    <div className='flex items-center justify-start'>
                      <p className='text-gray-500 font-medium text-xs mr-5'>
                        Color: {cartDisplayed[item].color.colorName}
                      </p>

                      <p className='text-gray-500 font-medium text-xs mr-5'>
                        Size: {cartDisplayed[item].variation.size}
                      </p>
                    </div>

                    <p className='text-gray-400 font-medium text-sm'>
                      $ {cartDisplayed[item].price.toLocaleString('en-us')} x{' '}
                      {cartDisplayed[item].qtd}{' '}
                      <span className='text-gray-800'>
                        ${' '}
                        {(
                          cartDisplayed[item].price * cartDisplayed[item].qtd
                        ).toLocaleString('en-us')}
                      </span>
                    </p>
                  </div>
                  <div className='flex flex-row justify-items-end  items-center '>
                    <button className='ml-5' onClick={() => cart.addOne(item)}>
                      <AiOutlinePlus color='#000' />
                    </button>
                    <button
                      className='ml-5'
                      onClick={() => cart.removeOne(item)}
                    >
                      <AiOutlineMinus color='#000' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {Object.keys(cartDisplayed).length === 0 && (
            <p className='text-gray-400 font-medium text-sm'>
              Your cart is empty
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default CartPreview
