import { gql } from 'graphql-request'
import Layout from '../components/Layout'
import { fetcher } from '../lib/graphql'
import CardProduct from '../components/CardProduct'
import { useRouter } from 'next/router'
import Select from '../components/Select'
import { useEffect, useState } from 'react'
const genderOptions = [
  { id: 'MEN', slug: 'Men' },
  { id: 'WOMEN', slug: 'Women' },
  { id: 'UNISEX', slug: 'Unisex' },
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
const GET_ALL_PRODUCTS = gql`
  query getAllProducts(
    $input: ProductFilter
    $afterCursor: String
    $beforeCursor: String
  ) {
    products: getAllProducts(
      input: $input
      afterCursor: $afterCursor
      beforeCursor: $beforeCursor
    ) {
      data {
        id
        name
        gender
        price
        slug
        category {
          name
        }
        brand {
          name
        }
        images
      }
      cursor {
        beforeCursor
        afterCursor
      }
    }
  }
`
const Shoes = ({ products, categories, brands }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedGender, setSelectedGender] = useState('')

  const router = useRouter()

  const handleSelect = (fn, evt) => {
    fn(evt.target.value)
  }

  useEffect(() => {
    let url = '/shoes?'
    if (selectedBrand !== '') {
      url += 'brand=' + selectedBrand + '&'
    }
    if (selectedCategory !== '') {
      url += 'category=' + selectedCategory + '&'
    }
    if (selectedGender !== '') {
      url += 'gender=' + selectedGender + '&'
    }
    refresh(url)
  }, [selectedBrand, selectedCategory, selectedGender])
  const refresh = url => {
    router.push(url)
  }
  return (
    <Layout categories={categories} brands={brands}>
      <div className='container mx-auto  flex items-center justify-start'>
        <Select
          label='Categories'
          options={categories}
          value={selectedCategory}
          onChange={evt => handleSelect(setSelectedCategory, evt)}
        />
        <Select
          label='Brands'
          options={brands}
          value={selectedBrand}
          onChange={evt => handleSelect(setSelectedBrand, evt)}
        />
        <Select
          label='Genders'
          options={genderOptions}
          value={selectedGender}
          onChange={evt => handleSelect(setSelectedGender, evt)}
        />
      </div>
      <section className='text-gray-600 body-font'>
        <div className=' px-5 pb-10 mx-auto'>
          <div className=' container mx-auto grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {products.data?.length === 0 && <p>No products Found</p>}
            {products.data?.map(product => (
              <CardProduct item={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
      <button onClick={refresh}>teste</button>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const { categories } = await fetcher(GET_ALL_CATEGORIES)
  const { products } = await fetcher(GET_ALL_PRODUCTS, {
    input: {
      gender: context.query.gender,
      brandSlug: context.query.brand,
      categorySlug: context.query.category,
    },
  })
  const { brands } = await fetcher(GET_ALL_BRANDS)
  return {
    props: {
      products,
      categories,
      brands,
    },
  }
}
export default Shoes
