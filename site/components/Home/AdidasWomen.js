import CardProduct from '../CardProduct'
import React from 'react'


const AdidasWomen = ({adidasWomenShoes}) => {
 
  return (
    <section className='container mx-auto my-10 px-5'>
      <h2 className='
      text-center md:text-left 
      uppercase font-kumbh-sans text-3xl text-darkBlack 
      mb-4'>
        Adidas for Women
      </h2>
      <div className='container mx-auto grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3' >
        {adidasWomenShoes.map((item) => (
          <CardProduct item = {item}  key = {item.slug} />
        ))}
      </div>
    </section>
  )
}

export default AdidasWomen
