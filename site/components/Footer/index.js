import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai'
import { FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-lightBlack py-10'>
      <div
        className='
      md:container mx-auto 
      flex flex-col md:flex-row  items-center justify-center md:justify-between'
      >
        <div>
          <figure className='mb-10 w-full flex justify-center md:justify-start'>
            <img src={'/logo-white.svg'} alt='sneakers' />
          </figure>
          <nav>
            <ul className='flex flex-col md:flex-row items-center justify-between'>
              <li className='text-white uppercase font-kumbh-sans text-xs md:mr-4 mb-2 flex items-center'>
                <FaMapMarkerAlt className='mr-2' />
                <a href='#'>USA</a>
              </li>
              <li className='text-white uppercase font-kumbh-sans text-xs md:mr-4 mb-2'>
                <a href='#'>Privacy polices</a>
              </li>
              <li className='text-white uppercase font-kumbh-sans text-xs md:mr-4 mb-2'>
                <a href='#'>Terms and conditions</a>
              </li>
              <li className='text-white uppercase font-kumbh-sans text-xs md:mr-4 mb-2'>
                <a href='#'>Products</a>
              </li>
              <li className='text-white uppercase font-kumbh-sans text-xs md:mr-4 mb-2'>
                <a href='#'>Support</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className=''>
          <div className='flex items-center justify-center md:justify-start pb-10'>
            <a href='#' className='mr-3'>
              <AiFillFacebook color='#fff' size={22} />
            </a>
            <a href='#' className='mr-3'>
              <AiOutlineTwitter color='#fff' size={22} />
            </a>
            <a href='#'>
              <AiOutlineInstagram color='#fff' size={22} />
            </a>
          </div>
          <p className='text-lightGray text-xs uppercase font-kumbh-sans'>
            {' '}
            © 2022 Sneakers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
