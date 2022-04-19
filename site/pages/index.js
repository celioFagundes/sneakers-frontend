import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { fetcher } from '../lib/graphql'
import { gql } from 'graphql-request'
import Brands from '../components/Home/Brands'
import Products from '../components/Home/Products'
import Link from 'next/link'
import Image from 'next/image'
import { SiAdidas, SiNike } from 'react-icons/si'
const GET_ALL_PRODUCTS = gql`
  query {
    products: getAllProducts {
      id
      name
      slug
      price
      color {
        colorName
      }
      brand {
        slug
        name
      }
      images
    }
  }
`
const GET_ALL_BRANDS = gql`
  query {
    brands: getAllBrands {
      id
      name
      slug
      logo
    }
  }
`
const GET_ALL_CATEGORIES = gql`
  query {
    categories: getAllCategories {
      id
      name
      slug
    }
  }
`
const Index = ({ brands, categories, products }) => {
  return (
    <>
      <Layout categories={categories} brands={brands}>
        <Seo />
        <div className='relative'>
          <Image
            alt='link para categoria smartphone'
            src={'/images/intro.jpg'}
            layout='responsive'
            width={100}
            height={45}
            priority
          />
          <div className='absolute top-0 flex flex-col items-start justify-center bg-black bg-opacity-70 h-full w-full px-20'>
            <Link href={'#'}>
              <div className='flex items-center justify-start  bg-black bg-opacity-70 w-fit text-white text-lg font-bold pl-5 pr-28 border border-gray-400 py-2 my-4 hover:bg-white hover:text-black transition-all hover:cursor-pointer'>
                <SiAdidas className='mr-4' size={28}/>
                <a className='font-kumbh-sans'>SHOP ADIDAS</a>
              </div>
            </Link>
            <Link href={'#'}>
              <div className='flex items-center justify-start bg-black bg-opacity-70 w-max text-white text-lg font-bold pl-5 pr-28 border border-gray-400 py-2 hover:bg-white hover:text-black transition-all hover:cursor-pointer'>
                <SiNike className='mr-4' size={28}/>
                <a className='font-kumbh-sans'>SHOP NIKE</a>
              </div>
            </Link>
          </div>
        </div>
        <Products products={products} />
        <Brands brands={brands} />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { brands } = await fetcher(GET_ALL_BRANDS)
  const { categories } = await fetcher(GET_ALL_CATEGORIES)
  const { products } = await fetcher(GET_ALL_PRODUCTS)

  return {
    props: {
      brands,
      categories,
      products,
    },
  }
}

export default Index
