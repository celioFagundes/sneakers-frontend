import { useEffect, useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Link from 'next/link'
import { AiOutlineClose, AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'
import CartPreview from '../CartPreview'
import NavItem from './NavItem'
import Search from './Search'
import TopHeader from './TopHeader'
import useWindowDimensions from '../../lib/useWindowsDimensions'

const Header = ({ categories, brands }) => {
  const [navbarShow, setNavbarShow] = useState(false)
  const [menuCategoriesMen, setMenuCategoriesMen] = useState(false)
  const [menuCategoriesWomen, setMenuCategoriesWomen] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [hideOnScroll, setHideOnScroll] = useState(true)
  const {width} = useWindowDimensions()

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (currPos.y === 0) {
        setHideOnScroll(true)
      }
      if (currPos.y < -100) {
        const isShow = currPos.y > prevPos.y
        if (isShow !== hideOnScroll) {
          setHideOnScroll(isShow)
        }
      }
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

  useEffect(() =>{
    if(!navbarShow ||  !showInput){
      document.body.style.overflow ='initial'
    }if(navbarShow ||  showInput){
      document.body.style.overflow= 'hidden'
    }
    
  },[navbarShow , showInput])
  
  useEffect(() =>{
    if(width >= 786){
      closeAllMenus()
    }
  },[width])
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
      <TopHeader />
      <div className='bg-white w-full h-full'>
        <div
          className='
        md:container mx-auto  w-full 
        flex flex-wrap  flex-row justify-between items-center
        px-5 md:px-0 py-4 
        '
        >
          <div className='flex items-center justify-start'>
            {!navbarShow ? (
              <AiOutlineMenu
                size={24}
                className='lg:hidden hover:cursor-pointer'
                onClick={openNavBar}
              />
            ) : (
              <AiOutlineClose
                size={24}
                className='lg:hidden hover:cursor-pointer'
                onClick={closeAllMenus}
              />
            )}
            <Link href='/'>
            
              <a
                className='
              flex items-center
              title-font font-medium  text-gray-900 
              ml-4 '
              >
                <img src='/logo.svg' />
              </a>
            </Link>
          </div>
          <nav
            className={`
            w-1/2 lg:w-max h-full
            fixed lg:static top-24 ${navbarShow ? 'left-0' : '-left-full'}
            flex flex-wrap flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center
            transition-all ease-in-out
            px-4 py-5 lg:px-0 lg:py-0
            bg-white 
            text-base `}
          >
            <NavItem label={'All'} url='/shoes' onClick={closeAllMenus}/>
            <NavItem.WithOptions
              label={'Men'}
              options={categories}
              isOpen={menuCategoriesMen}
              openOptions={openMenMenu}
              closeOptions={closeAllMenus}
              baseUrl={'/shoes?gender=Men&category='}
            />
            <NavItem.WithOptions
              label={'Women'}
              options={categories}
              isOpen={menuCategoriesWomen}
              openOptions={openWomenMenu}
              closeOptions={closeAllMenus}
              baseUrl={'/shoes?gender=Women&category='}
            />
            <NavItem label={'Kids'} url='/shoes' />
            <NavItem label={'Sales'} url='/shoes' />
          </nav>
          <div className=' flex items-center justify-between'>
            <Search showInput={showInput} handleShowInput={handleShowInput} />
            <div
              className='
              mr-3 
              hover:cursor-pointer hover:bg-gray-100 hover:text-black hover
              text-darkBlack 
              px-2 py-2 
              rounded-full '
            >
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
