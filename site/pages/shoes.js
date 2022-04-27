import { gql } from 'graphql-request'
import Layout from '../components/Layout'
import { fetcher } from '../lib/graphql'
import CardProduct from '../components/CardProduct'
import {useRouter} from 'next/router'
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
    $input: ProductFilter,
    $afterCursor: String,
    $beforeCursor: String
  ) {
    products: getAllProducts(
      input: $input,
      afterCursor: $afterCursor,
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
const Shoes = ({ products, categories, brands}) => {
  const router = useRouter()
  const refresh = () =>{
    router.push('/shoes?gender=Men&category=sneakers')
  }
  return (
    <Layout categories={categories} brands={brands}>
      <p className='bg-blue-500 py-2 px-4 font-medium text-white mb-5'>
        Confira nossos produtos da categoria{' '}
      </p>
      <pre>{JSON.stringify(products)}</pre>
      <section className='text-gray-600 body-font'>
        <div className=' px-5 py-24 mx-auto'>
          <div className='flex flex-wrap -m-4'>
            {products.data?.length === 0 && <p>No products Found</p>}
            {products.data?.map(product => (
              <CardProduct item={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
      <button onClick={refresh}>
              teste
      </button>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  
  const { categories } = await fetcher(GET_ALL_CATEGORIES)
  const { products } = await fetcher(GET_ALL_PRODUCTS, {
    input:{
      gender: context.query.gender,
      brandSlug: context.query.brand,
      categorySlug: context.query.category
    }
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
