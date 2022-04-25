import CardProduct from '../CardProduct'
import React from 'react'


const AdidasWomen = ({adidasWomenShoes}) => {
 
  return (
    <section className='container mx-auto my-10 '>
      <h2 className='text-center md:text-left uppercase font-kumbh-sans text-3xl text-darkBlack mb-4'>
        Adidas for Women
      </h2>
      <div className=' flex flex-wrap lg:flex-nowrap items-center justify-start' >
        {adidasWomenShoes.map((item, index) => (
          <CardProduct item = {item} index = {index} />
        ))}
      </div>
    </section>
  )
}

export default AdidasWomen
