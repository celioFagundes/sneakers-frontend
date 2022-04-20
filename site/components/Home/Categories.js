import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useWindowDimensions from '../../lib/useWindowsDimensions'

const categories = [
  {
    title: 'Sneakers',
    desktopImg: '/images/desktop/image-deep-earth.jpg',
    mobileImg: '/images/mobile/image-deep-earth.jpg',
  },
  {
    title: 'Basketball',
    desktopImg: '/images/desktop/image-night-arcade.jpg',
    mobileImg: '/images/mobile/image-night-arcade.jpg',
  },
  {
    title: 'Soccer',
    desktopImg: '/images/desktop/image-soccer-team.jpg',
    mobileImg: '/images/mobile/image-soccer-team.jpg',
  },
  {
    title: 'Skateboarding',
    desktopImg: '/images/desktop/image-grid.jpg',
    mobileImg: '/images/mobile/image-grid.jpg',
  },
  {
    title: 'Running',
    desktopImg: '/images/desktop/image-from-above.jpg',
    mobileImg: '/images/mobile/image-from-above.jpg',
  },
  {
    title: 'Training & Gym',
    desktopImg: '/images/desktop/image-pocket-borealis.jpg',
    mobileImg: '/images/mobile/image-pocket-borealis.jpg',
  },
]
const Categories = () => {
  const { width } = useWindowDimensions()

  return (
    <section className='container mx-auto my-10 '>
      <h2 className='uppercase font-kumbh-sans text-3xl text-darkBlack mb-4'>
        All categories
      </h2>
      <div className='categories-scrollbar flex  items-center justify-start overflow-x-scroll' >
        {categories.map((category, index) => (
          <div key={index} className='relative mr-16 mb-5 h-full w-full'>
            <figure className='relative h-450 w-64'>
              <Image
                src={width > 620 ? category.desktopImg : category.mobileImg}
                alt={category.title}
                layout='fill'
              />
            </figure>
            <div className='absolute h-full w-full top-0 left-0 bg-darkBlack bg-opacity-10 '>

            </div>
            <div className=' absolute bottom-10 left-7'>
              <Link href={'#'}>
                <div
                  className='
                w-max 
                flex items-center justify-start 
                bg-black bg-opacity-70 
                text-white text-sm uppercase font-kumbh-sans
                px-5  py-1 
                border border-gray-400 
              hover:bg-white hover:text-black transition-all hover:cursor-pointer'
                >
                  <a className='font-kumbh-sans'>{category.title}</a>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories
