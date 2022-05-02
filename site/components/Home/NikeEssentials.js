import React from 'react'
import CardProduct from '../CardProduct'

const NikeEssentials = ({nikeEssentialsShoes}) => {
  return (
    <section className='container mx-auto my-10 px-5'>
      <h2 className='uppercase font-kumbh-sans text-3xl text-darkBlack mb-4 text-center md:text-left'>
        Nike Essentials
      </h2>
      <div className='container mx-auto grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3' >
        {nikeEssentialsShoes.map((item) => (
          <CardProduct item = {item} key = {item.slug} />
        ))}
      </div>
    </section>
  )
}

export default NikeEssentials
