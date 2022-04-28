import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ColorAlternatives = ({alternatives, product}) => {
  return (
    <div className=' static flex flex-row items-center justify-center lg:justify-start'>
      {alternatives.map(
        alternative =>
          alternative.color.colorName !== product.color.colorName && (
            <div
              key={alternative.slug}
              className='static   w-20 mr-5 px-2 lg:px-0'
            >
              <p className='text-xs italic '>{alternative.color.colorName}</p>
              <Link href={`/shoe/${alternative.slug}`}>
                <div className='border border-transparent hover:border-darkBlack transition-all cursor-pointer rounded-xs shadow'>
                  <Image
                    src={alternative.images[0]}
                    layout='responsive'
                    alt={alternative.color.colorName}
                    height={10}
                    width={10}
                    objectFit='cover'
                  />
                </div>
              </Link>
            </div>
          ),
      )}
    </div>
  )
}

export default ColorAlternatives
