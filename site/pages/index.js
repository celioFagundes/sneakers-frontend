import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { fetcher } from '../lib/graphql'
import { gql } from 'graphql-request'

import Intro from '../components/Home/Intro'
import AdKD14 from '../components/Home/AdKD14'
import Categories from '../components/Home/Categories'
import NikeEssentials from '../components/Home/NikeEssentials'
import AdidasWomen from '../components/Home/AdidasWomen'

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
const GET_ALL_PRODUCTS_BY_BRAND_AND_GENDER = gql`
  query getProductsByBrandAndGender(
    $brandSlug: String!
    $gender: String!
    $limit: Int!
  ) {
    adidasWomen: getProductsByBrandAndGender(
      brandSlug: $brandSlug
      gender: $gender
      limit: $limit
    ) {
      id
      name
      slug
      price
      
      brand {
        name
      }
      category {
        name
      }
      images
    }
  }
`
const GET_ALL_PRODUCTS_BY_BRAND_LIMITED = gql`
  query getProductsByBrandLimited($brandSlug: String!) {
    nikeEssentials: getProductsByBrandLimited(brandSlug: $brandSlug) {
      id
      name
      slug
      price
      brand {
        name
      }
      category {
        name
      }
      images
    }
  }
`
const Index = ({ brands, categories, nikeEssentials, adidasWomen }) => {
  return (
    <>
      <Layout categories={categories} brands={brands}>
        <Seo />
        <Intro />
        <AdKD14 />
        <AdidasWomen adidasWomenShoes={adidasWomen} />
        <Categories />
        <NikeEssentials nikeEssentialsShoes={nikeEssentials} />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { brands } = await fetcher(GET_ALL_BRANDS)
  const { categories } = await fetcher(GET_ALL_CATEGORIES)
  const { products } = await fetcher(GET_ALL_PRODUCTS)
  const { nikeEssentials } = await fetcher(GET_ALL_PRODUCTS_BY_BRAND_LIMITED, {
    brandSlug: 'nike',
  })
  const { adidasWomen } = await fetcher(GET_ALL_PRODUCTS_BY_BRAND_AND_GENDER, {
    brandSlug: 'adidas',
    gender: 'Women',
    limit: 3,
  })
  return {
    props: {
      brands,
      categories,
      products,
      nikeEssentials,
      adidasWomen,
    },
  }
}

export default Index
