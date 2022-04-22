import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const categories = [
  {
    title: 'Nike SB Zoom Blazer Mid Red',
    img: '/images/nike-sbz-red-1.webp',
    price: 85,
    category: 'Skateboarding',
  },
  {
    title: 'Nike SB Chron 2 Canvas Pink Glaze',
    img: '/images/nike-sb-chron-2-canvas-pg-1.webp',
    price: 60,
    category: 'Skateboarding'
  
  },
  {
    title: 'KD 14 Sapphire Deep',
    img: '/images/kd14-sd-1.webp',
    price:150,
    category: 'Basketball'
  },
]
const NikeEssentials = () => {
 
  return (
    <section className='container mx-auto my-10 '>
      <h2 className='uppercase font-kumbh-sans text-3xl text-darkBlack mb-4'>
        Nike Essentials
      </h2>
      <div className='categories-scrollbar flex flex-wrap lg:flex-nowrap items-center justify-start' >
        {categories.map((item, index) => (
          <div key={index} className='relative  mb-5 h-full w-full mr-3 '>
            <figure className='relative h-450 w-full'>
              <Image
                src={ item.img}
                alt={item.title}
                layout='fill'
                objectFit='cover'
              />
            </figure>
            <div className='absolute h-full w-full top-0 left-0 bg-darkBlack bg-opacity-10 '>

            </div>
            <div className=' absolute -bottom-5 left-0 w-full'>
              <Link href={'#'}>
                <div
                  className='
                w-full
                flex items-center justify-start 
                bg-black bg-opacity-70 
                text-white text-sm uppercase font-kumbh-sans
                px-5  py-1 
                border border-gray-400 
              hover:bg-white hover:text-black transition-all hover:cursor-pointer'
                >
                  <a className='font-kumbh-sans mr-2'>{item.title}</a>
                  <p className='text-xl'>${item.price}</p>
                </div>
              </Link>
              <p className='text-sm font-medium font-kumbh-sans uppercase'>{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NikeEssentials
