import { useState } from 'react'
import Link from 'next/link'
import { RiShoppingBag3Fill } from 'react-icons/ri'
import { AiOutlineCaretDown, AiOutlineHeart } from 'react-icons/ai'
import { useCart } from '../../lib/CartContext'
import CartPreview from '../CartPreview'

const Header = ({ categories, brands }) => {
  const cart = useCart()
  const [menuCategories, setMenuCategories] = useState(false)
  const [menuBrands, setMenuBrands] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const openCategoriesMenu = () => {
    setMenuCategories(!menuCategories)
    setMenuBrands(false)
  }
  const openBrandsMenu = () => {
    setMenuBrands(!menuBrands)
    setMenuCategories(false)
  }
  return (
    <header className='text-white  body-font w-full'>
      <div className='bg-lightBlack py-2'>
        <div className='container flex items-center justify-end'>
          <p className='font-kumbh-sans mx-4 text-secondary text-xs'>Support</p>
          <span className='text-xs text-secondary'>|</span>
          <p className='font-kumbh-sans mx-4 text-secondary text-xs'>
            {' '}
            Join us
          </p>
          <span className='text-xs text-secondary'>|</span>
          <p className='font-kumbh-sans mx-4 text-secondary text-xs'>Sign In</p>
        </div>
      </div>
      <div className='bg-white   w-full h-full'>
        <div className='container mx-auto  w-full flex flex-wrap px-1 xs:px-5 py-2 flex-row justify-between items-center'>
          <Link href='/'>
            <a className='flex title-font font-medium items-center text-gray-900  md:mb-0'>
              <img src='logo.svg' />
            </a>
          </Link>
          <nav className='flex flex-wrap flex-row items-center text-base justify-center'>
            <div className='relative'>
              <button
                onClick={openCategoriesMenu}
                className='text-md px-2 md:px-4  uppercase text-center inline-flex items-center text-primary font-bold hover:text-secondary border-b-2 border-transparent hover:border-primary'
                type='button'
              >
                MEN{' '}
                <AiOutlineCaretDown
                  size={12}
                  className='hidden xs:block ml-1'
                />
              </button>
              <div
                className={`${
                  menuCategories ? 'sm:absolute' : 'hidden'
                } top-14 sm:top-10 left-0 fixed w-full sm:right-0  sm:left-0 z-10 sm:w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow `}
              >
                <ul className='flex flex-wrap flex-row w-full py-3'>
                  {categories?.map(category => (
                    <li
                      className='sm:w-full  hover:bg-blue-100 px-4 hover:cursor-pointer'
                      key={category.id}
                      onClick={() => setMenuCategories(false)}
                    >
                      <Link href={`/categoria/${category.slug}`}>
                        <a className='font-medium text-blue-900'>
                          {category.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='relative'>
              <button
                onClick={openBrandsMenu}
                className='text-md px-1 md:px-4 font-bold uppercase  text-center inline-flex items-center text-primary hover:text-secondary border-b-2 border-transparent hover:border-primary'
                type='button'
              >
                Women{' '}
                <AiOutlineCaretDown
                  size={12}
                  className='ml-1 hidden xs:block'
                />
              </button>
              <div
                className={`${
                  menuBrands ? 'sm:absolute' : 'hidden'
                } top-14 sm:top-10 left-0 fixed w-full sm:right-0  sm:left-0 z-10 sm:w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow `}
              >
                <ul className='flex flex-wrap flex-row w-full py-3'>
                  {brands?.map(brand => (
                    <li
                      className='sm:w-full  hover:bg-blue-100 px-4 hover:cursor-pointer'
                      key={brand.id}
                      onClick={() => setMenuBrands(false)}
                    >
                      <Link href={`/marca/${brand.slug}`}>
                        <a className='font-medium text-blue-900'>
                          {brand.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='relative'>
              <button
                onClick={openBrandsMenu}
                className='text-md px-1 md:px-4 font-bold uppercase  text-center inline-flex items-center text-primary hover:text-secondary border-b-2 border-transparent hover:border-primary'
                type='button'
              >
                KIDS{' '}
                <AiOutlineCaretDown
                  size={12}
                  className='ml-1 hidden xs:block'
                />
              </button>
              <div
                className={`${
                  menuBrands ? 'sm:absolute' : 'hidden'
                } top-14 sm:top-10 left-0 fixed w-full sm:right-0  sm:left-0 z-10 sm:w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow `}
              >
                <ul className='flex flex-wrap flex-row w-full py-3'>
                  {brands?.map(brand => (
                    <li
                      className='sm:w-full  hover:bg-blue-100 px-4 hover:cursor-pointer'
                      key={brand.id}
                      onClick={() => setMenuBrands(false)}
                    >
                      <Link href={`/marca/${brand.slug}`}>
                        <a className='font-medium text-blue-900'>
                          {brand.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='relative'>
              <button
                onClick={openBrandsMenu}
                className='text-md px-1 md:px-4 font-bold uppercase  text-center inline-flex items-center text-primary hover:text-secondary border-b-2 border-transparent hover:border-primary'
                type='button'
              >
                SALES{' '}
                <AiOutlineCaretDown
                  size={12}
                  className='ml-1 hidden xs:block'
                />
              </button>
              <div
                className={`${
                  menuBrands ? 'sm:absolute' : 'hidden'
                } top-14 sm:top-10 left-0 fixed w-full sm:right-0  sm:left-0 z-10 sm:w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow `}
              >
                <ul className='flex flex-wrap flex-row w-full py-3'>
                  {brands?.map(brand => (
                    <li
                      className='sm:w-full  hover:bg-blue-100 px-4 hover:cursor-pointer'
                      key={brand.id}
                      onClick={() => setMenuBrands(false)}
                    >
                      <Link href={`/marca/${brand.slug}`}>
                        <a className='font-medium text-blue-900'>
                          {brand.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
          <div className=' flex items-center justify-between'>
            <input className='text-black appearance-none bg-slate-100 mr-3 px-2 py-1 rounded-sm border-2 border-transparent focus:border-gray-600 focus:outline-none' placeholder='search...'/>
            <div className='mr-3 hover:cursor-pointer hover:bg-gray-100 text-primary px-2 py-2 rounded-full hover:text-black hover'>
              <AiOutlineHeart size={28} />
            </div>
            <CartPreview />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
