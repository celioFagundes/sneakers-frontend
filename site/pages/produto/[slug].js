import { useState } from 'react'
import { gql } from 'graphql-request'
import Layout from '../../components/Layout'
import { fetcher } from '../../lib/graphql'
import { useEffect } from 'react/cjs/react.development'
import { useCart } from '../../lib/CartContext'
import Carousel from '../../components/Carousel/Carousel'

const shoesSizes = [
  '4',
  '4.5',
  '5',
  '5.5',
  '6',
  '6.5',
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10',
  '10.5',
  '11',
  '11.5',
  '12',
  '13',
  '14',
  '15',
]


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
const GET_PRODUCT_BY_SLUG = gql`
  query getProductBySLug($slug: String!) {
    product: getProductBySlug(slug: $slug) {
      id
      name
      slug
      description
      images
      price
      material
      gender
      color {
        colorName
        colorCode
      }
      brand {
        name
      }
      variations {
        size
        sku
        stock
        weight
      }
    }
  }
`
const Products = ({ product, categories, brands }) => {
  const cart = useCart()
  const [sizeSelected, setSizeSelected] = useState('')
  const [availableSizes, setAvailableSizes] = useState([])
  const [isOnCart, setIsOnCart] = useState(false)
  const [selectedVariation, setSelectedVariation] = useState(
    product.variations[0],
  )

  const updateIsOnCartOnFocus = () => {
    const loadedCart = JSON.parse(localStorage.getItem('cart'))
    if (loadedCart) {
      if (Object.keys(loadedCart).indexOf(selectedVariation.sku) >= 0) {
        setIsOnCart(true)
      } else {
        setIsOnCart(false)
      }
    }
  }
  const sizeIsAvailable = size => {
    return availableSizes.indexOf(size) >= 0
  }

  const setFirstAvailabledVariation = () => {
    const firstAvailableVariation = product.variations.filter(
      item => item.size === availableSizes[0],
    )
    setSelectedVariation(firstAvailableVariation[0])
  }
  const updateSelectedVariation = () => {
    const newSelected = product.variations.filter(
      item => item.size === sizeSelected,
    )
    setSelectedVariation(newSelected[0])
  }
  const initialSelectedVariation = () => {
    setSelectedVariation(product.variations[0])
  }
  useEffect(() => {
    window.addEventListener('focus', updateIsOnCartOnFocus, { passive: true })
    updateIsOnCartOnFocus()
    return () => {
      window.removeEventListener('focus', updateIsOnCartOnFocus)
    }
  })
  useEffect(() => {
    setFirstAvailabledVariation()
  }, [availableSizes])

  useEffect(() => {
    if (sizeSelected !== '') {
      updateSelectedVariation()
    }
    updateIsOnCartOnFocus()
  }, [, sizeSelected])

  useEffect(() => {
    updateIsOnCartOnFocus()
  }, [selectedVariation, cart.items])

  useEffect(() => {
    if (product.variations[0]) {
      initialSelectedVariation()
    }
  }, [product])
  const removeFromCart = () => {
    cart.removeFromCart(selectedVariation.sku)
  }
  return (
    <Layout categories={categories} brands={brands}>
      {selectedVariation && (
        <div className='container text-center sm:text-left lg:px-5 pt-28 mx-auto'>
          <div className='flex flex-wrap '>
            <div className='w-full lg:w-1/2'>
              <Carousel slides={product.images} />
            </div>
            <div className='lg:w-1/2 w-full lg:pl-10 lg:py-2  mt-6 lg:mt-0 border-b-2 border-gray-200'>
              <h2 className='text-md uppercase font-kumbh-sans  text-gray-500 tracking-widest'>
                {product.gender + ' ' + product.brand.name}
              </h2>
              <h1 className='text-gray-900 text-4xl uppercase font-kumbh-sans font-bold mb-1'>
                {product.name + ' ' + product.color.colorName}
              </h1>
              <p className=' font-medium  text-4xl text-primary'>
                R$ {product.price}
              </p>
              <div className=' mt-2 items-center '>
                <div className='flex flex-col my-2'>
                  <span className='  uppercase font-medium text-md text-gray-900'>
                    Available sizes
                  </span>

                  <div className='relative'>
                    {shoesSizes.map(size => (
                      <button
                        key={size}
                        onClick={() =>
                          sizeIsAvailable(size) && setSizeSelected(size)
                        }
                        className={`mr-2 my-1 ${
                          sizeIsAvailable(size)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-blue-400 before:'
                        } ${
                          selectedVariation &&
                          selectedVariation.size === size &&
                          'border-2 border-red-300 rounded'
                        } py-2 px-2 rounded  font-bold text-xs`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row my-2 '>
                {isOnCart ? (
                  <button
                    onClick={removeFromCart}
                    className='w-full sm:w-60 text-center my-3 sm:my-0 ml-auto text-white bg-indigo-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'
                  >
                    Remover do carrinho
                  </button>
                ) : (
                  <button
                    onClick={() => cart.addToCart(product, selectedVariation)}
                    className='w-full sm:w-60 text-center my-3 sm:my-0 ml-auto text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'
                  >
                    {product && 'Adicionar ao carrinho'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const { product } = await fetcher(GET_PRODUCT_BY_SLUG, {
    slug: context.query.slug,
  })
  const { categories } = await fetcher(GET_ALL_CATEGORIES)
  const { brands } = await fetcher(GET_ALL_BRANDS)

  return {
    props: {
      product,
      categories,
      brands,
    },
  }
}
export default Products
