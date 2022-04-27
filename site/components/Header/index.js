import { useEffect, useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Link from 'next/link'
import useWindowDimensions from '../../lib/useWindowsDimensions'
import {
  AiOutlineArrowLeft,
  AiOutlineCaretDown,
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineLeft,
  AiOutlineMenu,
  AiOutlineMenuFold,
  AiOutlineSearch,
} from 'react-icons/ai'
import CartPreview from '../CartPreview'

const Header = ({ categories, brands }) => {
  const [navbarShow, setNavbarShow] = useState(false)
  const [menuCategoriesMen, setMenuCategoriesMen] = useState(false)
  const [menuCategoriesWomen, setMenuCategoriesWomen] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [hideOnScroll, setHideOnScroll] = useState(true)
  const { width } = useWindowDimensions()

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if(currPos.y === 0){
        setHideOnScroll(true)
      }
      if(currPos.y < -100){
        const isShow = currPos.y > prevPos.y
        if (isShow !== hideOnScroll) {
          setHideOnScroll(isShow)
        }
      }
      console.log(currPos.y)
    },
   
    [hideOnScroll],
    false,
    false,
    300,
  )
  const openMenMenu = () => {
    setMenuCategoriesMen(!menuCategoriesMen)
    setMenuCategoriesWomen(false)
  }
  const openWomenMenu = () => {
    setMenuCategoriesWomen(!menuCategoriesWomen)
    setMenuCategoriesMen(false)
  }

  const openNavBar = () => {
    setShowInput(false)
    setNavbarShow(true)
  }
  const handleShowInput = () => {
    if (showInput) {
      return setShowInput(false)
    }
    closeAllMenus()
    setShowInput(true)
  }
  const closeAllMenus = () => {
    setMenuCategoriesMen(false)
    setMenuCategoriesWomen(false)
    setNavbarShow(false)
  }
  return (
    <header
      className={`
      md:fixed 
      top-0 right-0 left-0 
      z-50 
      shadow-md 

      ${
        hideOnScroll
          ? 'visible transform-none'
          : 'md:invisible md:-translate-y-full'
      }`}
      style={{
        transition: `all 200ms ${hideOnScroll ? 'ease-in' : 'ease-out'}`,
      }}
    >
      <div className='bg-darkBlack py-2 '>
        <div className='container flex items-center justify-end'>
          <p className='font-kumbh-sans mx-4 text-gray-300 text-xs hover:text-white hover:cursor-pointer'>
            Support
          </p>
          <span className='text-xs text-gray-300'>|</span>
          <p className='font-kumbh-sans mx-4 text-gray-300 text-xs hover:text-white hover:cursor-pointer'>
            {' '}
            Join us
          </p>
          <span className='text-xs text-gray-300'>|</span>
          <p className='font-kumbh-sans mx-4 text-gray-300 text-xs hover:text-white hover:cursor-pointer'>
            Sign In
          </p>
        </div>
      </div>
      <div className='bg-white   w-full h-full'>
        <div className='md:container mx-auto  w-full flex flex-wrap  px-5 md:px-0 py-4 flex-row justify-between items-center'>
          <div className='flex items-center justify-start'>
            {!navbarShow ? (
              <AiOutlineMenu
                size={24}
                className='md:hidden hover:cursor-pointer'
                onClick={openNavBar}
              />
            ) : (
              <AiOutlineClose
                size={24}
                className='md:hidden hover:cursor-pointer'
                onClick={closeAllMenus}
              />
            )}
            <Link href='/'>
              <a className='ml-4 flex title-font font-medium items-center text-gray-900 '>
                <img src='/logo.svg' />
              </a>
            </Link>
          </div>
          <nav
            className={`
          fixed md:static
          top-24 ${navbarShow ? 'left-0' : '-left-full'}
          transition-all ease-in-out
           flex flex-wrap flex-col md:flex-row
           items-start md:items-center justify-start md:justify-center px-4 py-5 md:px-0 md:py-0
          bg-white w-1/2 md:w-max h-full
          text-base `}
          >
            <Link href={'/shoes'}>
              <a
                className={`
                inline-flex items-center  
                px-2 md:px-4  py-4 md:py-0
                text-xl md:text-sm 
                font-bold font-kumbh-sans  uppercase text-center 
                hover:text-primary`}
              >
                All
              </a>
            </Link>
            <div className='relative'>
              <button
                onMouseOver={() => width > 768 && openMenMenu()}
                onClick={openMenMenu}
                className={`
                inline-flex items-center  
                px-2 md:px-4  py-4 md:py-0
                text-xl md:text-sm 
                font-bold font-kumbh-sans  uppercase text-center 
                hover:text-primary 
                transition-all   ${
                  menuCategoriesMen ? 'text-primary' : 'text-darkBlack'
                }`}
                type='button'
              >
                MEN{' '}
              </button>
              <div
                onMouseLeave={() => width > 768 && setMenuCategoriesMen(false)}
                className={`${
                  menuCategoriesMen ? 'fixed ' : 'hidden'
                } top-24 sm:top-24 left-0 sm:left-0 sm:right-0 
                w-1/2 md:w-full h-full md:h-max   py-10 md:py-3 z-10  text-base list-none 
                bg-white
                shadow 
                transition-all ease-in-out`}
              >
                <div className='flex items-center justify-start md:justify-center px-4 '>
                  <button
                    onClick={() => setMenuCategoriesMen(false)}
                    className='md:hidden'
                  >
                    <AiOutlineArrowLeft size={20} />
                  </button>
                  <p className='ml-3 md:ml-0 text-center uppercase text-gray-700 text-lg md:text-xs font-medium'>
                    Categories
                  </p>
                </div>

                <ul
                  className='
                flex flex-col md:flex-row flex-wrap 
                items-start md:items-center  justify-start md:justify-center 
                w-full 
                py-3'
                >
                  {categories?.map(category => (
                    <li
                      className='hover:underline text-xs font-kumbh-sans font-medium uppercase px-4 hover:cursor-pointer'
                      key={category.id}
                      onClick={() => setMenuCategoriesMen(false)}
                    >
                      <Link href={`/categoria/${category.slug}`}>
                        <a className='font-medium text-gray-600 text-lg md:text-sm'>
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
                onMouseOver={() => width > 768 && openWomenMenu()}
                onClick={openWomenMenu}
                className={`
                inline-flex items-center  
                px-2 md:px-4  py-4 md:py-0
                text-xl md:text-sm 
                font-bold font-kumbh-sans  uppercase text-center 
                hover:text-primary 
                transition-all   ${
                  menuCategoriesWomen ? 'text-primary' : 'text-darkBlack'
                }`}
                type='button'
              >
                WOMEN{' '}
              </button>
              <div
                onMouseLeave={() =>
                  width > 768 && setMenuCategoriesWomen(false)
                }
                className={`${
                  menuCategoriesWomen ? 'fixed' : 'hidden'
                } top-24 sm:top-24 left-0 sm:left-0 sm:right-0 
                w-1/2 md:w-full h-full md:h-max    py-10 md:py-3 z-10  text-base list-none 
                bg-white
                shadow 
                transition-all ease-in-out`}
              >
                <div className='flex items-center justify-start md:justify-center px-4'>
                  <button
                    onClick={() => setMenuCategoriesWomen(false)}
                    className='md:hidden'
                  >
                    <AiOutlineArrowLeft size={20} />
                  </button>
                  <p className='ml-3 md:ml-0 text-center uppercase text-gray-700 text-lg md:text-xs font-medium'>
                    Categories
                  </p>
                </div>

                <ul
                  className='
                flex flex-col md:flex-row flex-wrap 
                items-start md:items-center  justify-start md:justify-center 
                w-full 
                py-3'
                >
                  {categories?.map(category => (
                    <li
                      className='hover:underline text-xs font-kumbh-sans font-medium uppercase px-4 hover:cursor-pointer'
                      key={category.id}
                      onClick={() => setMenuCategoriesWomen(false)}
                    >
                      <Link href={`/categoria/${category.slug}`}>
                        <a className='font-medium text-gray-600 text-lg md:text-sm'>
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
                onClick={openWomenMenu}
                className='text-xl md:text-sm px-1  py-4 md:py-0 md:px-4 font-bold uppercase  text-center inline-flex items-center text-darkBlack  hover:text-primary transition-all  '
                type='button'
              >
                KIDS{' '}
                <AiOutlineCaretDown
                  size={12}
                  className='ml-1 hidden xs:block'
                />
              </button>
            </div>
            <div className='relative'>
              <button
                onClick={openWomenMenu}
                className='text-xl md:text-sm  py-4 md:py-0 px-1 md:px-4 font-bold uppercase  text-center inline-flex items-center text-darkBlack  hover:text-primary transition-all  '
                type='button'
              >
                SALES{' '}
              </button>
            </div>
          </nav>
          <div className=' flex items-center justify-between'>
            <div className='relative flex items-center'>
              <input
                className={`
                text-black appearance-none 
                 top-28 
                ${showInput ? 'right-0' : '-right-full'}
                fixed md:static
                transition-all
                w-full md:w-max
                md:bg-gray-200 bg-white
                md:mr-3 px-2 py-1 
                rounded-sm border-2 border-transparent 
                focus:border-gray-600 focus:outline-none`}
                placeholder='search...'
              />
              <AiOutlineSearch
                size={24}
                className='md:absolute md:top-2 md:right-5 hover:cursor-pointer'
                onClick={handleShowInput}
              />
            </div>

            <div className='mr-3 hover:cursor-pointer hover:bg-gray-100 text-darkBlack px-2 py-2 rounded-full hover:text-black hover'>
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
