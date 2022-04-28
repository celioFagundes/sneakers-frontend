import { useState } from 'react'
import { gql } from 'graphql-request'
import Layout from '../../components/Layout'
import { fetcher } from '../../lib/graphql'
import { useEffect } from 'react/cjs/react.development'
import { useCart } from '../../lib/CartContext'
import Carousel from '../../components/Carousel/Carousel'
import Description from '../../components/ShoeDetailPage/Description'
import SimilarProducts from '../../components/ShoeDetailPage/SimilarProducts'
import AddToCartButton from '../../components/ShoeDetailPage/AddToCartButton'
import SizeSelection from '../../components/ShoeDetailPage/SizeSelection'
import ColorAlternatives from '../../components/ShoeDetailPage/ColorAlternatives'
import ShoeTitle from '../../components/ShoeDetailPage/ShoeTitle'

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
      const filterDifColorShoes = differentColorShoes.filter(
        item => item.color.colorName !== product.color.colorName,
      )
      const filterSimiProduct = simiProducts.filter(
        item => item.name !== product.name,
      )
      setColorAlternatives(filterDifColorShoes)
      setSimilarProducts(filterSimiProduct)
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
        <div className='text-center lg:text-left lg:px-5  mx-auto md:pt-28'>
          <div className='flex flex-wrap '>
            <div className='w-full lg:w-1/2'>
              <Carousel slides={product.images} />
            </div>
            <div className='lg:w-1/2 w-full px-2 lg:pl-10 lg:py-2  mt-6 lg:mt-0 border-b-2 border-gray-200 '>
              <ShoeTitle product={product} />
              <ColorAlternatives
                alternatives={colorAlternatives}
                product={product}
              />
              <SizeSelection
                sizeSelected={sizeSelected}
                variations={product.variations}
                setSizeSelected={setSizeSelected}
              />

              <p className=' font-medium text-3xl text-gray-800 my-2'>
                ${product.price}
              </p>
              <AddToCartButton
                isOnCart={isOnCart}
                addToCart={() => cart.addToCart(product, selectedVariation)}
                removeFromCart={removeFromCart}
                product={product}
              />
            </div>
          </div>
          <Description product={product} />
          {similarProducts.length > 0 && (
            <SimilarProducts similarProducts={similarProducts} />
          )}
        </div>
      )}
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const { product } = await fetcher(GET_PRODUCT_BY_SLUG, {
    slug: context.query.slug,
  })
  console.log(context.query)
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
