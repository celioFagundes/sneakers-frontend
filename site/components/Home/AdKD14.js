import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SiNike } from 'react-icons/si'

const AdKD14 = () => {
  return (
    <div className='container mx-auto relative w-full h-fit  my-20 py-10'>
      <Image
        alt='Go to nike page'
        src={'/images/KD14-homepage.webp'}
        layout='responsive'
        width={100}
        height={50}
        objectFit='cover'
        priority
      />
      <div
        className=' 
            h-full w-full 
            absolute top-0 flex flex-col items-start justify-start
            pt-24 px-20
            transition-all
            bg-black bg-opacity-10 
            hover:cursor-pointer
            '
      >
        <p className='text-darkBlack text-6xl uppercase font-kumbh-sans  mb-4'>
          KD14
        </p>
        <p className='text-darkBlack text-1xl uppercase font-kumbh-sans  mb-4 max-w-sm'>
          The KD14 is designed to help versatile, relentless players like KD
          feel fresh all game.
        </p>
        <Link href={'#'}>
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
            <a className='font-kumbh-sans'>SHOP</a>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AdKD14
