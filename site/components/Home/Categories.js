import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const categories = [
  {
    title: 'Sneakers',
    img: '/images/sneaker-cat.jpg',
    slug: 'sneakers',
  },
  {
    title: 'Basketball',
    img: '/images/intro-nike-2.jpg',
    slug: 'basketball',
  },
  {
    title: 'Soccer',
    img: '/images/soccer-cat-4.jpg',
    slug: 'soccer',
  },
  {
    title: 'Skateboarding',
    img: '/images/skate-cat.webp',
    slug: 'skateboarding',
  },
  {
    title: 'Running',
    img: '/images/running-cat.jpg',
    slug: 'running',
  },
  {
    title: 'Training & Gym',
    img: '/images/training-cat.jpg',
    slug: 'trainingandgym',
  },
]
const Categories = () => {
  return (
    <section className='container mx-auto my-10 px-5'>
      <h2
        className='
      text-center md:text-left 
      uppercase font-kumbh-sans text-3xl text-darkBlack 
      mb-4'
      >
        All categories
      </h2>
      <div
        className='
      categories-scrollbar 
      flex flex-wrap md:flex-nowrap items-center justify-start 
      md:overflow-x-scroll'
      >
        {categories.map((category, index) => (
          <div key={index} className='relative md:mr-16 mb-5 h-full w-full'>
            <figure className='relative h-40 md:h-450  w-full md:w-64'>
              <Image
                src={category.img}
                alt={category.title}
                layout='fill'
                objectFit='cover'
              />
            </figure>
            <div
              className='
              absolute top-0 left-0
              h-full w-full  
            bg-darkBlack bg-opacity-10 '
            ></div>
            <div className=' absolute bottom-10 left-7'>
              <Link href={`/shoes?category=${category.slug}`}>
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
