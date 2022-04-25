import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CardProduct from '../CardProduct'

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
const NikeEssentials = ({nikeEssentialsShoes}) => {
 
  return (
    <section className='container mx-auto my-10 '>
      <h2 className='uppercase font-kumbh-sans text-3xl text-darkBlack mb-4'>
        Nike Essentials
      </h2>
      <div className=' flex flex-wrap lg:flex-nowrap items-center justify-start' >
        {nikeEssentialsShoes.map((item, index) => (
          <CardProduct item = {item} />
        ))}
      </div>
    </section>
  )
}

export default NikeEssentials
