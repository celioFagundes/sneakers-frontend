import Link from 'next/link'
import React from 'react'
import { SiNike } from 'react-icons/si'
import CarouselSingle from '../CarouselSingle/CarouselSingle'

const images = ['/images/KD14-homepage.webp','/images/KD14-homepage-2.webp','/images/KD14-homepage-3.webp','/images/KD14-homepage-4.webp','/images/KD14-homepage-5.webp']

const AdKD14 = () => {
  return (
    <div className='
    md:container mx-auto 
    relative
    w-full h-max  
    my-5 md:my-20'>
      <CarouselSingle slides = {images} productName ='Adidas KD14 Black/Lime'/>
      <div
        className=' 
        h-full w-full 
        absolute top-0 
        flex flex-col 
        items-center justify-start md:items-start md:justify-start
        pt-7 md:pt-16  px-10 md:px-20
        transition-all
        hover:cursor-pointer
        '
      >
        <p className='
        text-darkBlack uppercase font-kumbh-sans 
        text-3xl md:text-6xl 
        mb-4'>
          KD14
        </p>
        <p className='
        max-w-none md:max-w-sm
        text-center md:text-justify 
        text-sm md:text-xl 
        uppercase text-darkBlack
        font-kumbh-sans  
        mb-4 
        '>
          The KD14 is designed to help versatile, relentless players like KD
          feel fresh all game.
        </p>
        <Link href={'/shoe/kd-14-black-lime'} passHref>
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
