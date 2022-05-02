import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import { useMutation, useQuery, fetcher } from '../../lib/graphql'
import { useFormik, FieldArray, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'
import * as Yup from 'yup'
import Modal from '../../components/Modal'

const genderOptions = [
  { id: 'MEN', label: 'Men' },
  { id: 'WOMEN', label: 'Women' },
  { id: 'UNISEX', label: 'Unisex' },
]
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
const CREATE_PRODUCT = `
  mutation createProduct(
    $category: String!, 
    $brand: String!,
    $name: String!, 
    $description: String!,
    $price: Float!,
    $gender: ProductGender!,
    $material: String!,
    $slug: String!, 
    $color: ColorInput!,
    $variations: [VariationInput!]!) {
    panelCreateProduct (input: {
      category: $category,
      brand: $brand,
      name: $name, 
      description : $description,
      price:$price,
      gender: $gender,
      material: $material,
      slug: $slug,
      color:$color,
      variations: $variations
     }) {
      id
    }
  }
`
const GET_ALL_CATEGORIES = `
  query{
  getAllCategories{
    id
    name
  }
}`
const GET_ALL_BRANDS = `
  query{
  getAllBrands{
    id
    name
  }
}`
const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, '3 characters minimum required')
    .required('Please, enter a name'),
  description: Yup.string()
    .min(20, '20 characters minimum required')
    .required('Please, enter a description'),
  category: Yup.string()
    .min(1, 'Please select a category')
    .required('Please select a category'),
  brand: Yup.string()
    .min(1, 'Please select a brand')
    .required('Please select a brand'),
  price: Yup.number()
    .moreThan(0, 'Must be greater than zero')
    .required('Please, enter a price'),
  gender: Yup.string().required('Please, select a gender'),
  material: Yup.string()
    .min(3, '3 characters minimum required')
    .required('Please, enter a material'),
  color: Yup.object().shape({
    colorName: Yup.string()
      .min(3, '3 characters minimum required')
      .required('Please, enter the color name'),
    colorCode: Yup.string()
      .min(3, '3 characters minimum required')
      .required('Please,enter color code'),
  }),
  slug: Yup.string()
    .min(3, '3 characters minimum required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,'Contains invalid characters')
    .required('Please, enter a slug')
    .test('is-unique', 'Slug already in use', async value => {
      const ret = await fetcher(
        JSON.stringify({
          query: `
        query{
          getProductBySlug(slug:"${value}"){
            id
          }
        }`,
        }),
      )
      if (ret.errors) {
        return true
      }
      return false
    }),
  variations: Yup.array().of(
    Yup.object().shape({
      size: Yup.string().required('Please, select a size'),
      sku: Yup.string()
        .min(3, '3 characters minimum required')
        .required('Enter a valid SKU'),
      weight: Yup.number()
        .moreThan(0, 'Must be greater than zero')
        .required('Enter a weight'),
      stock: Yup.number()
        .moreThan(0, 'Must be greater than zero')
        .required('Enter the stock quantity'),
    }),
  ),
})
const CreateProduct = () => {
  const { data: categories } = useQuery(GET_ALL_CATEGORIES)
  const { data: brands } = useQuery(GET_ALL_BRANDS)
  const [modalVisible, setModalVisible] = useState(false)
  const [data, createProduct] = useMutation(CREATE_PRODUCT)
  const router = useRouter()
  const form = useFormik({
    validateOnChange: false,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      category: '',
      brand: '',
      name: '',
      description: '',
      price: 0,
      gender: '',
      material: '',
      slug: '',
      color: {
        colorName: '',
        colorCode: '#000',
      },
      variations: [
        {
          size: '',
          sku: '',
          weight: 0,
          stock: 0,
        },
      ],
    },
    validationSchema: ProductSchema,
    onSubmit: async values => {
      const newValues = {
        ...values,
        price: Number(values.price),
        variations: values.variations.map(variation => ({
          ...variation,
          weight: Number(variation.weight),
          stock: Number(variation.stock),
        })),
      }
      const data = await createProduct(newValues)
      if (data && !data.errors) {
        router.push('/products')
      }
    },
  })
  let categoriesOptions = []
  if (categories && categories.getAllCategories) {
    categoriesOptions = categories.getAllCategories.map(item => {
      return {
        id: item.id,
        label: item.name,
      }
    })
  }
  let brandsOptions = []
  if (brands && brands.getAllBrands) {
    brandsOptions = brands.getAllBrands.map(item => {
      return {
        id: item.id,
        label: item.name,
      }
    })
  }
  const checkForErrors = async () => {
    if (JSON.stringify(form.errors) === '{}') {
      setModalVisible(true)
    }
  }
  return (
    <Layout>
      <Title>New shoe</Title>
      <div className='mt-5'>
        <Button.LinkBack href='/products'>Back</Button.LinkBack>
      </div>
      <div className='flex flex-col'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-b  bg-darkBlack p-12'>
            <form onSubmit={form.handleSubmit}>
              <Input
                label='Name'
                placeholder='Enter shoe name'
                onChange={form.handleChange}
                value={form.values.name}
                name='name'
                errorMessage={form.errors.name}
                onBlur={form.handleBlur}
              />
              <Input
                label='URL Slug'
                placeholder='Enter shoe slug'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.slug}
                name='slug'
                errorMessage={form.errors.slug}
                helpText={"Slug is used to create easy-to-read URL's. Include shoe color"}
              />
              <Input
                label='Material '
                placeholder='Enter material'
                onChange={form.handleChange}
                value={form.values.material}
                name='material'
                errorMessage={form.errors.material}
                onBlur={form.handleBlur}
              />
              <div className='my-2 relative'>
                <Input.TextArea
                  label='Description'
                  placeholder='Enter description'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.description}
                  name='description'
                  errorMessage={form.errors.description}
                  textLength={form.values.description.length}
                  helpText='Min: 20 Max: 500'
                />
              </div>
              <Input
                label='Price'
                placeholder='Enter price'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.price}
                name='price'
                errorMessage={
                  form.errors && form.errors.price && form.errors.price
                }
              />
              <div className=' flex  flex-row items-start justify-start mr-2 mb-4 relative '>
                <Input.Color
                  label='Color name and code'
                  placeholder='Color name'
                  bgColor={form.values.color.colorCode}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  colorNameValue={form.values.color.colorName}
                  colorCodeValue={form.values.color.colorCode}
                  colorName='color.colorName'
                  codeName='color.colorCode'
                  helpText='Use the color picker to select color code'
                  errorMessage={
                    form.errors &&
                    form.errors?.color?.colorName &&
                    form.errors.color.colorName
                  }
                />
              </div>
              <div className='flex flex-row flex-wrap items center justify-start my-2'>
                <Select
                  label={'Gender'}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name='gender'
                  value={form.values.gender}
                  options={genderOptions}
                  errorMessage={
                    form.errors && form.errors.gender && form.errors.gender
                  }
                />
                <Select
                  label={'Select shoe category'}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name='category'
                  value={form.values.category}
                  options={categoriesOptions}
                  errorMessage={form.errors.category}
                />
                <Select
                  label={'Select shoe brand'}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name='brand'
                  value={form.values.brand}
                  options={brandsOptions}
                  errorMessage={form.errors.brand}
                />
              </div>
              <FormikProvider value={form}>
                <FieldArray
                  name='variations'
                  render={arrayHelpers => {
                    return (
                      <div className=''>
                        <p className='text-white font-medium text-lg'>Shoe Variations</p>
                        <div className='my-1'>
                          <Button
                            type='button'
                            onClick={() =>
                              arrayHelpers.push({
                                size: '',
                                sku: '',
                                weight: 0,
                                stock: 0,
                              })
                            }
                          >
                            Add new variation form
                          </Button>
                        </div>
                        {form.values.variations.map((variation, index) => (
                          <div
                            className='flex flex-row flex-wrap my-2 p-5  bg-lightBlack rounded relative'
                            key={index}
                          >
                            <div className='flex flex-row flex-wrap items-start justify-between h'>
                              <Input.Variation
                                label='SKU'
                                placeholder='Enter variation SKU'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.variations[index].sku}
                                name={`variations.${index}.sku`}
                                errorMessage={
                                  form.errors?.variations &&
                                  form.errors.variations[index]?.sku &&
                                  form.errors.variations[index].sku
                                }
                              />

                              <Input.Variation
                                label='Weight'
                                placeholder='Enter variation weight'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.variations[index].weight}
                                name={`variations.${index}.weight`}
                                errorMessage={
                                  form.errors?.variations &&
                                  form.errors.variations[index]?.weight &&
                                  form.errors.variations[index].weight
                                }
                              />

                              <Input.Variation
                                label='Stock'
                                placeholder='Enter variation stock'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.variations[index].stock}
                                name={`variations.${index}.stock`}
                                errorMessage={
                                  form.errors?.variations &&
                                  form.errors.variations[index]?.stock &&
                                  form.errors.variations[index].stock
                                }
                              />
                            </div>
                            <>
                              <Select.SingleValues
                                label={'Size'}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                name={`variations.${index}.size`}
                                value={form.values.variations[index].size}
                                options={shoesSizes}
                                errorMessage={
                                  form.errors?.variations &&
                                  form.errors.variations[index]?.size &&
                                  form.errors.variations[index].size
                                }
                              />
                            </>
                            {index > 0 && (
                              <button
                                type='button'
                                className='px-2 py-1 bg-darkBlack text-red-500 font-medium text-xs rounded-full hover:bg-red-400 absolute right-2 top-3'
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                X
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  }}
                />
              </FormikProvider>
              <Button type='button' onClick={checkForErrors}>
                Finish
              </Button>
              <Modal
                type={'create'}
                visible={modalVisible}
                closeFunction={() => setModalVisible(false)}
              />
            </form>

            {data && !!data.errors && (
              <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2'>
                Error while trying to save
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default CreateProduct
