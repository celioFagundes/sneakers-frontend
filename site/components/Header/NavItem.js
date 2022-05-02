import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import useWindowDimensions from '../../lib/useWindowsDimensions'

const NavItem = ({ label, url ,onClick}) => {
  return (
    <div className='relative'>
      <Link href={url}>
        <a
        onClick={onClick}
          className='
          inline-flex items-center  
          px-2 lg:px-4  py-4 lg:py-0
          text-xl lg:text-sm 
          font-bold font-kumbh-sans  uppercase text-center 
          hover:text-primary 
          transition-all'
        >
          {label}
        </a>
      </Link>
    </div>
  )
}
const NavItemWithOptions = ({
  label,
  openOptions,
  isOpen,
  closeOptions,
  options,
  baseUrl,
}) => {
  const { width } = useWindowDimensions()
  return (
    <div className='relative'>
      <button
        onMouseOver={() => width > 1024 && openOptions()}
        onClick={openOptions}
        className={`
        inline-flex items-center  
        px-2 lg:px-4  py-4 lg:py-0
        text-xl lg:text-sm 
        font-bold font-kumbh-sans  uppercase text-center 
        hover:text-primary 
        transition-all   ${isOpen ? 'text-primary' : 'text-darkBlack'}`}
        type='button'
      >
        {label}
      </button>
      <div
        onMouseLeave={() => width > 1024 && closeOptions()}
        className={`${
          isOpen ? 'fixed ' : 'hidden'
        } top-24 sm:top-24 left-0 sm:left-0 sm:right-0 
          w-1/2 lg:w-full h-full lg:h-max   
          py-10 lg:py-3 z-10  
          text-base list-none 
          bg-white
          shadow 
          transition-all ease-in-out`}
      >
        <div className='
        flex items-center justify-start lg:justify-center 
        px-4 '>
          <button onClick={() => closeOptions()} className='lg:hidden'>
            <AiOutlineArrowLeft size={20} />
          </button>
          <p className='
          ml-3 lg:ml-0 
          text-center uppercase text-gray-700 text-lg lg:text-xs font-medium'>
            Categories
          </p>
        </div>

        <ul
          className='
          flex flex-col lg:flex-row flex-wrap 
          items-start lg:items-center  justify-start lg:justify-center 
          w-full 
          py-3'
        >
          {options?.map(option => (
            <li
              className='
              text-xs font-kumbh-sans font-medium uppercase 
              px-4 
              hover:cursor-pointer hover:underline'
              key={option.id}
              onClick={() => closeOptions()}
            >
              <Link href={`${baseUrl}${option.slug}`}>
                <a className='font-medium text-gray-600 text-lg lg:text-sm'>
                  {option.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

NavItem.WithOptions = NavItemWithOptions
export default NavItem
