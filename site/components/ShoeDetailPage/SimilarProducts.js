import React from 'react'
import CardProduct from '../CardProduct'

const SimilarProducts = ({similarProducts}) => {
  return (
    <section className='container mx-auto mb-10 '>
      <h2 className='text-center md:text-left uppercase font-kumbh-sans text-3xl text-darkBlack mb-4'>
        You may also like
      </h2>
      <div
        className='
      categories-scrollbar 
      container mx-auto grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
      >
        {similarProducts.map(item => (
          <CardProduct item={item} key={item.slug} />
        ))}
      </div>
    </section>
  )
}

export default SimilarProducts
