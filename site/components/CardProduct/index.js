import Image from 'next/image'
import Link from 'next/link'
const CardProduct = ({ item, index}) => {
  return (
    <div key={index} className='relative  mb-5 h-full w-full mr-0 lg:w-1/3 lg:mr-2 '>
      <figure className='relative h-450 w-full'>
        <Image
          src={item.images[0]}
          alt={item.name}
          layout='fill'
          objectFit='cover'
        />
      </figure>
      <div className='absolute h-full w-full top-0 left-0 bg-darkBlack bg-opacity-5 '></div>
      <div className=' absolute -bottom-5 left-0 w-full'>
        <Link href={'#'}>
          <div
            className='
                w-full
                flex items-center justify-start 
                bg-black bg-opacity-70 
                text-white text-sm uppercase font-kumbh-sans
                px-5  py-1 
                border border-gray-400 
              hover:bg-white hover:text-black transition-all hover:cursor-pointer'
          >
            <a className='font-kumbh-sans mr-2'>{item.name}</a>
            <p className='text-xl'>${item.price}</p>
          </div>
        </Link>
        <p className='text-sm font-medium font-kumbh-sans uppercase'>
          {item.brand.name + ' / ' + item.category.name }
        </p>
      </div>
    </div>
  )
}

export default CardProduct
