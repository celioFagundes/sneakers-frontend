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
const Shoes = ({ products, categories, brands, query }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [url, setUrl] = useState('')
  const router = useRouter()

  const handleSelect = (fn, name, evt) => {
    fn(evt.target.value)
    localStorage.setItem(name, evt.target.value)
    refresh()
  }

  useEffect(() => {
    localStorage.setItem('brand',query.brand || '')
    localStorage.setItem('category',query.category || '') 
    localStorage.setItem('gender',query.gender || '')
    setSelectedBrand(query.brand)
    setSelectedCategory(query.category)
    setSelectedGender(query.gender)
  }, [])

  const refresh = (cursor) => {
    const brand =localStorage.getItem('brand')
    const category = localStorage.getItem('category')
    const gender = localStorage.getItem('gender')
    let newUrl = '/shoes?'
    if (brand) {
      newUrl += 'brand=' + brand + '&'
    }
    if (category) {
      newUrl += 'category=' + category + '&'
    }
    if (gender) {
      newUrl += 'gender=' + gender + '&'
    }
    if(cursor){
      newUrl += cursor
    }
    router.push(newUrl)
  }
  const nextPage = () => {
    refresh('&ac=' + products.cursor.afterCursor)
  }
  const previousPage = () => {
    refresh('&bc=' + products.cursor.beforeCursor)
  }
  return (
    <Layout categories={categories} brands={brands}>
      <div className='container mx-auto  px-5 md:px-0 flex flex-wrap md:flex-nowrap items-center justify-start md:pt-28'>
        <Select
          label='Categories'
          options={categories}
          value={selectedCategory}
          onChange={evt => handleSelect(setSelectedCategory, 'category', evt)}
        />
        <Select
          label='Brands'
          options={brands}
          value={selectedBrand}
          onChange={evt => handleSelect(setSelectedBrand, 'brand', evt)}
        />
        <Select
          label='Genders'
          options={genderOptions}
          value={selectedGender}
          onChange={evt => handleSelect(setSelectedGender, 'gender', evt)}
        />
      </div>
      <section className='text-gray-600 body-font'>
        <div className=' px-5 pb-5 mx-auto'>
          <div className=' container mx-auto grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
            {products.data?.length === 0 && (
              <p className='w-full uppercase text-3xl py-20'>
                No products were found matching your selection
              </p>
            )}
            {products.data?.map(product => (
              <CardProduct item={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
      <div className='flex items-center justify-center w-full pb-10'>
        <button
          disabled={!products.cursor.beforeCursor}
          className={`
          ${!products.cursor.beforeCursor && 'text-gray-300'}
          ${products.cursor.beforeCursor && 'hover:bg-gray-200'}
          bg-lightGray 
          py-2 px-4 
          uppercase font-medium 
           transition-all`}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          disabled={!products.cursor.afterCursor}
          className={`
          ${!products.cursor.afterCursor && 'text-gray-300'}
          ${products.cursor.afterCursor && ' hover:bg-gray-200'}
          bg-lightGray 
          py-2 px-4 
          uppercase font-medium 
           transition-all`}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
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
    afterCursor: context.query.ac,
    beforeCursor: context.query.bc,
  })
  const { brands } = await fetcher(GET_ALL_BRANDS)
  return {
    props: {
      products,
      categories,
      brands,
      query: context.query,
    },
  }
}
export default Shoes
