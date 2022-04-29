import { gql } from 'graphql-request'
import Layout from '../components/Layout'
import { fetcher } from '../lib/graphql'
import Link from 'next/link'
import { useCart } from '../lib/CartContext'
import { AiFillCreditCard, AiOutlinePlus, AiOutlineMinus , AiOutlineShoppingCart} from 'react-icons/ai'

const GET_ALL_CATEGORIES = gql`
  query {
    categories: getAllCategories {
      id
      name
      slug
    }
  }
`
const GET_ALL_BRANDS = gql`
  query {
    brands: getAllBrands {
      id
      name
      slug
    }
  }
`

const Cart = ({ categories, brands }) => {
  const cart = useCart()
  
  return (
    <Layout categories={categories} brands={brands}>
      <div className='flex justify-center my-6 md:pt-28'>
        {Object.keys(cart.items).length > 0 &&
        <div className='flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5'>
          <div className='flex-1'>
            <table className='w-full text-sm lg:text-base'>
              <thead>
                <tr className='h-12 uppercase'>
                  <th className='hidden md:table-cell'></th>
                  <th className='text-left'>Product</th>
                  <th className='lg:text-right text-left pl-5 lg:pl-0'>
                    <span className='lg:hidden' title='Quantity'>
                      Qtd
                    </span>
                    <span className='hidden lg:inline'>Quantity</span>
                  </th>
                  <th className='hidden text-right md:table-cell'>
                    Unit price
                  </th>
                  <th className='text-right'>Total price</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cart.items).map(item => (
                  <tr key ={item}>
                    <td className='hidden pb-4 md:table-cell'>
                      <a href='#'>
                        {cart.items &&
                        cart.items[item].images &&
                        cart.items[item].images.length > 0 ? (
                          <img
                            src={cart.items[item].images[0]}
                            className='w-20 rounded'
                            alt='Thumbnail'
                          />
                        ) : (
                          <img
                            src='https://dummyimage.com/420x260'
                            className='w-20 rounded'
                            alt='Thumbnail'
                          />
                        )}
                      </a>
                    </td>
                    <td>
                      <Link href={`/produto/${cart.items[item].slug}`} passHref>
                        <a className='text-gray-800 font-medium text-sm hover:underline'>
                          {cart.items[item].name}
                        </a>
                      </Link>
                      <div className='flex items-center justify-start'>
                        <p className='text-gray-500 font-medium text-xs mr-5'>
                          Color: {cart.items[item].color.colorName}
                        </p>
                        
                          <p className='text-gray-500 font-medium text-xs mr-5'>
                            Size: {cart.items[item].variation.size}
                          </p>
                     
                      </div>
                      <div>
                        <button type='submit' className='text-gray-700' onClick={() => cart.removeFromCart(item)}>
                          <small>(Remove)</small>
                        </button>
                      </div>
                    </td>
                    <td className='justify-center md:justify-end md:flex mt-6'>
                      <div className='w-20 h-10'>
                        <div className='relative flex flex-row w-full h-8'>
                          <div className='flex flex-row justify-center  items-center '>
                            <button
                              className=''
                              onClick={() => cart.addOne(item)}
                            >
                              <AiOutlinePlus color='#000' />
                            </button>
                            <p className='mx-2 bg-slate-800 px-4 text-white font-medium rounded'>
                              {cart.items[item].qtd}
                            </p>
                            <button
                              onClick={() => cart.removeOne(item)}
                            >
                              <AiOutlineMinus color='#000' />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='hidden text-right md:table-cell'>
                      <span className='text-sm lg:text-base font-medium'>
                        $
                        {cart.items[item].price}
                      </span>
                    </td>
                    <td className='text-right'>
                      <span className='text-sm lg:text-base font-medium'>
                        $
                        {(
                          cart.items[item].price *
                          cart.items[item].qtd
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='my-4 mt-6 -mx-2 lg:flex'>
              <div className='lg:px-2 lg:w-1/2'></div>
              <div className='lg:px-2 lg:w-1/2'>
                <div className='p-4 bg-gray-100 rounded-full'>
                  <h1 className='ml-2 font-bold uppercase'>Order details</h1>
                </div>
                <div className='p-4'>
                  <div className='flex justify-between pt-4 border-b'>
                    <div className='lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800'>
                      Total
                    </div>
                    <div className='lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900'>
                      $ {cart.cartTotal}
                    </div>
                  </div>
                  <a href='#'>
                    <button className='flex justify-center items-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none'>
                      <AiFillCreditCard size={28} />
                      <span className='ml-2 mt-5px'>Checkout</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>}
        {Object.keys(cart.items).length === 0 &&
        <div className='flex flex-col justify-center items-center'>
          <AiOutlineShoppingCart size={140}/>
          <p className='text-2xl font-medium'>Your cart is empty</p>
        </div>
          
        }
      </div>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const { categories } = await fetcher(GET_ALL_CATEGORIES)
  const { brands } = await fetcher(GET_ALL_BRANDS)
  return {
    props: {
      categories,
      brands,
    },
  }
}
export default Cart
