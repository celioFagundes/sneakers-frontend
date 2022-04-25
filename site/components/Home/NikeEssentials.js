
import React from 'react'
import CardProduct from '../CardProduct'


const NikeEssentials = ({nikeEssentialsShoes}) => {
 
  return (
    <section className='container mx-auto my-10 '>
      <h2 className='uppercase font-kumbh-sans text-3xl text-darkBlack mb-4'>
        Nike Essentials
      </h2>
      <div className=' flex flex-wrap lg:flex-nowrap items-center justify-start' >
        {nikeEssentialsShoes.map((item) => (
          <CardProduct item = {item} key = {item.slug} />
        ))}
      </div>
    </section>
  )
}

export default NikeEssentials
