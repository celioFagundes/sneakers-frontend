import { useState } from 'react'
import { gql } from 'graphql-request'
import Layout from '../../components/Layout'
import { fetcher } from '../../lib/graphql'
import CardProduct from '../../components/CardProduct'
import { useEffect } from 'react/cjs/react.development'
import { useCart } from '../../lib/CartContext'
import Carousel from '../../components/Carousel/Carousel'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineHeart } from 'react-icons/ai'

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
const GET_PRODUCTS_BY_NAME = gql`
  query getProductsByName($name: String!) {
    differentColorShoes: getProductsByName(name: $name) {
      slug
      images
      color {
        colorName
      }
    }
  }
`
const GET_PRODUCTS_BY_CATEGORY_LIMITED = gql`
  query getProductsByCategoryLimited($categorySlug: String!) {
    simiProducts: getProductsByCategoryLimited(categorySlug: $categorySlug) {
      name
      price
      brand {
        name
      }
      category {
        name
      }
      slug
      images
      color {
        colorName
      }
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
      category {
        name
        slug
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
  const [isOnCart, setIsOnCart] = useState(false)
  const [colorAlternatives, setColorAlternatives] = useState([])
  const [similarProducts, setSimilarProducts] = useState([])
  const [selectedVariation, setSelectedVariation] = useState(
    product.variations[0],
  )

  useEffect(() => {
    const getColorAlternatives = async () => {
      const { differentColorShoes } = await fetcher(GET_PRODUCTS_BY_NAME, {
        name: product.name,
      })
      const { simiProducts } = await fetcher(GET_PRODUCTS_BY_CATEGORY_LIMITED, {
        categorySlug: product.category.slug,
      })
      setColorAlternatives(differentColorShoes)
      setSimilarProducts(simiProducts)
    }
    getColorAlternatives()
  }, [product])

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
    const availableSizes = product.variations.map(item => item.size)
    return availableSizes.indexOf(size) >= 0
  }

  const setFirstAvailabledVariation = () => {
    const firstAvailableVariation = product.variations.filter(
      item => item.size === product.variations[0],
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
  }, [])

  useEffect(() => {
    if (sizeSelected !== '') {
      updateSelectedVariation()
    }
    //updateIsOnCartOnFocus()
  }, [sizeSelected])

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
            <div className='lg:w-1/2 w-full px-2 lg:pl-10 lg:py-2  mt-6 lg:mt-0 border-b-2 border-gray-200 text-center lg:text-start'>
              <h2 className='text-md uppercase font-kumbh-sans  text-gray-500 tracking-widest'>
                {product.gender +
                  ' / ' +
                  product.category.name +
                  ' / ' +
                  product.brand.name}
              </h2>
              <h1 className='text-gray-900 text-4xl uppercase font-kumbh-sans font-normal italic mb-1'>
                {product.name + ' ' + product.color.colorName}
              </h1>
              <div className=' static flex flex-row items-center justify-center lg:justify-start'>
                {colorAlternatives.map(alternative => (
                  <div key={alternative.slug} className='static   w-20 mr-5 px-2 lg:px-0'>
                    <p className='text-xs italic '>
                      {alternative.color.colorName}
                    </p>
                    <Link href={`/produto/${alternative.slug}`}>
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
                ))}
              </div>
              <div className=' mt-2 items-center '>
                <div className='flex flex-col my-2'>
                  <span className='  uppercase font-medium text-md text-gray-900'>
                    Select size
                  </span>
                  <div className='relative'>
                    {shoesSizes.map(size => (
                      <button
                        key={size}
                        onClick={() =>
                          sizeIsAvailable(size) && setSizeSelected(size)
                        }
                        className={`
                        ${
                          selectedVariation &&
                          selectedVariation.size === size &&
                          ' bg-darkBlack border-orange-600 rounded'
                        }
                        ${
                          sizeIsAvailable(size)
                            ? 'bg-lightBlack text-white hover:bg-darkBlack'
                            : ' text-black'
                        }  border   border-gray-100 p-1   w-20  font-normal text-md `}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <p className=' font-medium text-3xl text-gray-800 my-2'>
                ${product.price}
              </p>
              <div>
                <div className='flex flex-col sm:flex-row my-2 justify-center lg:justify-start '>
                  {isOnCart ? (
                    <button
                      onClick={removeFromCart}
                      className='w-full sm:w-60 text-center my-3 sm:my-0 ml-auto text-white bg-gray-600 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded'
                    >
                      Remove from cart
                    </button>
                  ) : (
                    <button
                      onClick={() => cart.addToCart(product, selectedVariation)}
                      className='
                    w-full sm:w-60 
                     my-3 sm:my-0
                    text-white  text-center uppercase font-medium
                    bg-gray-900  border-0 py-2 px-6 
                    focus:outline-none 
                    hover:bg-gray-600 
                    rounded-sm
                    shadow'
                    >
                      {product && 'Add to cart'}
                    </button>
                  )}
                  <button
                    className='
                  p-2 ml-1
                  border-2 border-darkBlack 
                  flex items-center justify-center 
                  text-black 
                  bg-white 
                  hover:bg-darkBlack hover:text-white hover:cursor-pointer
                  transition-all
                  '
                  >
                    <AiOutlineHeart size={28} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <section className='my-4 py-16 flex items-start flex-wrap md:flex-nowrap justify-start px-10 md:px-0 text-center lg:text-justify'>
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
              <p className='my-2 text-gray-600'>
                Color: {product.color.colorName}
              </p>
            </div>
          </section>
          <section className='container mx-auto mb-10 '>
            <h2 className='text-center md:text-left uppercase font-kumbh-sans text-3xl text-darkBlack mb-4'>
              You may also like
            </h2>
            <div className=' flex flex-wrap lg:flex-nowrap items-center justify-start'>
              {similarProducts.map((item, index) => (
                <CardProduct item={item} index={index} />
              ))}
            </div>
          </section>
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
