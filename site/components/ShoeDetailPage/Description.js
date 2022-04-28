import React from 'react'

const Description = ({product}) => {
  return (
    <section className='container mx-auto my-4 py-16 flex items-start flex-wrap md:flex-nowrap justify-start px-10 md:px-0 text-center lg:text-justify'>
      <div>
        <h2 className='text-4xl italic uppercase'>{product.name}</h2>
        <div>
          <p className='text-md font-medium max-w-2xl text-gray-600  py-2 '>
            {product.description}
          </p>
        </div>
      </div>
      <div className='lg:ml-10 w-full lg:w-fit'>
        <p className='uppercase italic mt-10 md:mt-0 text-4xl'>Details</p>
        <p className='my-2 text-gray-600'>Material: {product.material}</p>
        <p className='my-2 text-gray-600'>Gender: {product.gender}</p>
        <p className='my-2 text-gray-600'>Color: {product.color.colorName}</p>
      </div>
    </section>
  )
}

export default Description
