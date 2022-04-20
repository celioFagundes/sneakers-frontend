import { useEffect, useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Link from 'next/link'
import { AiOutlineCaretDown, AiOutlineHeart } from 'react-icons/ai'
import CartPreview from '../CartPreview'

const Header = ({ categories, brands }) => {
  const [menuCategoriesMen, setMenuCategoriesMen] = useState(false)
  const [menuCategoriesWomen, setMenuCategoriesWomen] = useState(false)
  const [hideOnScroll, setHideOnScroll] = useState(true)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
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

  return (
    <header
      className='fixed top-0 right-0 left-0 z-50 shadow-md'
      style={{
        visibility: hideOnScroll ? 'visible' : 'hidden',
        transition: `all 200ms ${hideOnScroll ? 'ease-in' : 'ease-out'}`,
        transform: hideOnScroll ? 'none' : 'translate(0, -100%)',
      }}
    >
      <div className='bg-darkBlack py-2 '>
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
                onMouseOver={openMenMenu}
                onClick={openMenMenu}
                className={`text-sm px-2 md:px-4  uppercase text-center inline-flex items-center  font-bold font-kumbh-sans hover:text-primary transition-all   ${menuCategoriesMen? 'text-primary' : 'text-darkBlack'}`}
                type='button'
              >
                MEN{' '}
              </button>
              <div
                onMouseLeave={() => setMenuCategoriesMen(false)}
                className={`${
                  menuCategoriesMen ? 'sm:fixed' : 'hidden'
                } top-20 sm:top-20 left-0 fixed w-full sm:right-0  py-3 sm:left-0 z-10  text-base list-none bg-white rounded divide-y divide-gray-100 shadow transition-all ease-in-out`}
              >
                <p className='text-center uppercase text-gray-700 text-xs font-medium'>
                  Categories
                </p>
                <ul className='flex flex-wrap items-center  justify-center flex-row w-full py-3'>
                  {categories?.map(category => (
                    <li
                      className='  hover:underline text-xs font-kumbh-sans font-medium uppercase px-4 hover:cursor-pointer'
                      key={category.id}
                      onClick={() => setMenuCategoriesMen(false)}
                    >
                      <Link href={`/categoria/${category.slug}`}>
                        <a className='font-medium text-gray-600'>
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
                onMouseOver={openWomenMenu}
                className={`text-sm px-1 md:px-4 font-bold uppercase  text-center inline-flex items-center   hover:text-primary transition-all ${menuCategoriesWomen ? 'text-primary' : 'text-darkBlack'}`}
                type='button'
              >
                Women
              </button>
              <div
                onMouseLeave={() => setMenuCategoriesWomen(false)}
                className={`${
                  menuCategoriesWomen ? 'sm:fixed' : 'hidden'
                } top-20 sm:top-20 left-0 fixed w-full sm:right-0  py-3 sm:left-0 z-10  text-base list-none bg-white rounded divide-y divide-gray-100 shadow transition-all ease-in-out`}
              >
                <p className='text-center uppercase text-gray-700 text-xs font-medium'>
                  Categories
                </p>
                <ul className='flex flex-wrap items-center  justify-center flex-row w-full py-3'>
                  {categories?.map(category => (
                    <li
                      className='  hover:underline text-xs font-kumbh-sans font-medium uppercase px-4 hover:cursor-pointer'
                      key={category.id}
                      onClick={() => setMenuCategoriesWomen(false)}
                    >
                      <Link href={`/categoria/${category.slug}`}>
                        <a className='font-medium text-gray-600'>
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
                className='text-sm px-1 md:px-4 font-bold uppercase  text-center inline-flex items-center text-darkBlack  hover:text-primary transition-all  '
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
                className='text-sm px-1 md:px-4 font-bold uppercase  text-center inline-flex items-center text-darkBlack  hover:text-primary transition-all  '
                type='button'
              >
                SALES{' '}
              </button>
            </div>
          </nav>
          <div className=' flex items-center justify-between'>
            <input
              className='text-black appearance-none bg-slate-100 mr-3 px-2 py-1 rounded-sm border-2 border-transparent focus:border-gray-600 focus:outline-none'
              placeholder='search...'
            />
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
