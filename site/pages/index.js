import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { fetcher } from '../lib/graphql'
import { gql } from 'graphql-request'
import Brands from '../components/Home/Brands'
import Products from '../components/Home/Products'
import Link from 'next/link'
import Image from 'next/image'
import { SiAdidas, SiNike } from 'react-icons/si'
import Intro from '../components/Home/Intro'
import AdKD14 from '../components/Home/AdKD14'
import Categories from '../components/Home/Categories'
import NikeEssentials from '../components/Home/NikeEssentials'
import AdidasWomen from '../components/Home/AdidasWomen'
import Banner from '../components/Home/Banner'
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
        <Intro />
        <AdKD14/>
        <AdidasWomen/>
        <Categories/>
        <Banner/>
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
