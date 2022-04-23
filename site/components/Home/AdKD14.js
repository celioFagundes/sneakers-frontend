import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SiNike } from 'react-icons/si'
import Carousel from '../CarouselSingle/CarouselSingle'

const images = ['/images/KD14-homepage.webp','/images/KD14-homepage-2.webp','/images/KD14-homepage-3.webp','/images/KD14-homepage-4.webp','/images/KD14-homepage-5.webp']
const AdKD14 = () => {
  return (
    <div className='md:container mx-auto relative w-full h-max  my-5 md:my-20'>
      <Carousel slides = {images}/>
      <div
        className=' 
            h-full w-full 
            absolute top-0 
            flex flex-col 
            items-center justify-start md:items-start md:justify-start
            pt-7 md:pt-16  px-10 md:px-20
            transition-all
            bg-black bg-opacity-10 
            hover:cursor-pointer
            '
      >
        <p className='text-darkBlack  text-3xl md:text-6xl uppercase font-kumbh-sans  mb-4'>
          KD14
        </p>
        <p className='text-center md:text-justify text-darkBlack text-sm md:text-xl uppercase font-kumbh-sans  mb-4 max-w-none md:max-w-sm'>
          The KD14 is designed to help versatile, relentless players like KD
          feel fresh all game.
        </p>
        <Link href={'#'}>
          <div
            className='
                w-max 
                flex items-center  justify-center md:justify-start 
                bg-black bg-opacity-70 
                text-white text-lg font-bold 
                md:pl-5 px-10 md:px-0 md:pr-28 
                border border-gray-400 py-2 
              hover:bg-white hover:text-black transition-all hover:cursor-pointer'
          >
            <SiNike className='mr-4' size={28} />
            <a className='font-kumbh-sans'>SHOP</a>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AdKD14
