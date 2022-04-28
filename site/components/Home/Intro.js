import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SiAdidas, SiNike } from 'react-icons/si'

const Intro = () => {
  return (
    <div className='
      relative 
      flex items-center flex-col md:flex-row  justify-center 
      w-full md:w-screen h-screen'>
      <div className='relative  w-full md:w-1/2 h-full '>
        <Image
          alt='Go to nike page'
          src={'/images/intro-nike-3.jpg'}
          layout='fill'
          objectFit='cover'
          priority
        />
        <div
          className=' 
            h-full w-full 
            absolute top-0 flex flex-col 
            items-center justify-center md:items-start md:justify-end 
            md:pb-40 px-20
            transition-all
            bg-black bg-opacity-70 
            hover:bg-opacity-10 hover:cursor-pointer
            '
        >
          <p className='text-white text-3xl uppercase font-kumbh-sans  mb-4'>
            Nike collection
          </p>
          <Link href={'/shoes?brand=nike'}>
            <div
              className='
                w-max 
                flex items-center justify-start 
                bg-black bg-opacity-70 
                text-white text-lg font-bold 
                pl-5 pr-28 
                border border-gray-400 py-2 
              hover:bg-white hover:text-black transition-all hover:cursor-pointer'
            >
              <SiNike className='mr-4' size={28} />
              <a className='font-kumbh-sans'>SHOP NIKE</a>
            </div>
          </Link>
        </div>
      </div>
      <div className='w-full md:w-1/2 h-full relative'>
        <Image
          alt='Go to adidas page'
          src={'/images/intro-adidas.jpg'}
          objectFit='cover'
          layout='fill'
          priority
        />
        <div
          className='
            h-full w-full 
            absolute top-0 flex flex-col 
            items-center justify-center md:items-start md:justify-end 
            md:pb-40 px-20
            transition-all
            bg-black bg-opacity-70 
            hover:bg-opacity-40 hover:cursor-pointer
            '
        >
          <p className='text-white text-3xl uppercase font-kumbh-sans  mb-4'>
            Adidas Collection{' '}
          </p>
          <Link href={'/shoes?brand=adidas'}>
            <div
              className='
                w-max 
                flex items-center justify-start 
                bg-black bg-opacity-70 
                text-white text-lg font-bold 
                pl-5 pr-28 
                border border-gray-400 py-2 
              hover:bg-white hover:text-black transition-all hover:cursor-pointer'
            >
              <SiAdidas className='mr-4' size={28} />
              <a className='font-kumbh-sans'>SHOP ADIDAS</a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Intro
