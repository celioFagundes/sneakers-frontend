import { gql } from 'graphql-request'
import Layout from '../components/Layout'
import { fetcher } from '../lib/graphql'
import CardProduct from '../components/CardProduct'
import { useRouter } from 'next/router'
import Select from '../components/Select'
import { useEffect, useState } from 'react'
import { FaSort } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import useWindowDimensions from '../lib/useWindowsDimensions'
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
  const [filterShown, setFilterShown] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const {width} = useWindowDimensions()
  const router = useRouter()

  const handleSelect = (fn, name, evt) => {
    fn(evt.target.value)
  }

  useEffect(() => {
    setSelectedBrand(query.brand || '')
    setSelectedCategory(query.category || '')
    setSelectedGender(query.gender || '')
  }, [router.query])

  const createURL = () => {
    const brand = selectedBrand || ''
    const gender = selectedGender || ''
    const category = selectedCategory || ''

    console.log('brand' + brand, 'cat' + category, 'gen' + gender)
    let newUrl = '/shoes?'
    if (brand) {
      newUrl += 'brand=' + brand + '&'
    }
    if (gender) {
      newUrl += 'gender=' + gender + '&'
    }
    if (category) {
      newUrl += 'category=' + category + '&'
    }

    return newUrl
  }
  useEffect(() =>{
    if(!filterShown){
      document.body.style.overflow ='initial'
    }if(filterShown){
      document.body.style.overflow= 'hidden'
    }
    
  },[filterShown])
  
  useEffect(() =>{
    if(width >= 786){
      setFilterShown(false)
    }
  },[width])
  const refresh = cursor => {
   setFilterShown(false)
    const url = createURL()
    if (cursor) url += cursor
    console.log('cursror ->>>', cursor)
    router.push(url)
  }
  const nextPage = () => {
    const afterCursor = '&ac=' + products.cursor.afterCursor
    refresh(afterCursor)
  }
  const previousPage = () => {
    const beforeCursor = '&bc=' + products.cursor.beforeCursor
    refresh(beforeCursor)
  }
  return (
    <Layout categories={categories} brands={brands}>
      <div
        className='
        container mx-auto  
        px-5 md:px-0  md:pt-28 
          '
      >
        <button
          onClick={() => setFilterShown(true)}
          className='
        md:hidden
        py-4
        flex items-center justify-start'
        >
          <FaSort className='text-black' size={28} />
          <p
            className='
          bg-darkBlack 
          text-white  font-kumbh-sans
          px-4 py-1 
          rounded-sm 
          hover:bg-lightBlack
          my-2 md:my-0
          '
          >
            Filters
          </p>
        </button>

        <div
          className={`
          fixed md:static top-24 ${filterShown ? 'left-0' : '-left-full'}
          z-40
          py-10 md:py-0 px-4 md:px-0
          bg-white
          w-full
          border-b border-black md:border-0 
          transition-all ease-in-out
          flex flex-wrap flex-col md:flex-row items-center justify-start  
          
          `}
        >
          <AiOutlineClose
            size={24}
            className='lg:hidden hover:cursor-pointer'
            onClick={() => setFilterShown(false)}
          />
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
          <button
            onClick={() => refresh()}
            className='
          bg-darkBlack 
          text-white  font-kumbh-sans
          px-4 py-1 
          rounded-sm 
          hover:bg-lightBlack
          my-2 md:my-0
          '
          >
            Apply Filters
          </button>
        </div>
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
