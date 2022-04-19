import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'
import { useMutation, useQuery , fetcher} from '../../../lib/graphql'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import * as Yup from 'yup'
import Modal from '../../../components/Modal'

let id = ''
const UPDATE_BRAND = `
    mutation updateBrand($id: String!, $name: String!, $slug: String!) {
        panelUpdateBrand (input: {
        id:$id,
        name:$name, 
        slug:$slug
        }) {
        id
        name
        slug
        }
    }
`
const BrandSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Por favor, informe um nome com pelo menos 3 caracteres')
    .required('Por favor, informe um nome'),
  slug: Yup.string()
    .min(3, 'Por favor, informe um slug com pelo menos 3 caracteres')
    .required('Por favor, informe um slug')
    .test('is-unique', 'Este slug ja esta em uso', async value => {
      const ret = await fetcher(
        JSON.stringify({
          query: `
        query{
          getBrandBySlug(slug:"${value}"){
            id
          }
        }`,
        }),
      )
      if (ret.errors) {
        return true
      }
      if(ret.data.getBrandBySlug.id === id){
        return true
      }
      return false
    }),
})
const EditBrand = () => {
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false)
  id = router.query.id
  const { data } = useQuery(`
  query{
    getBrandById(id: "${router.query.id}"){
        name
        slug
      }
}`)
  const [updatedData, updateBrand] = useMutation(UPDATE_BRAND)
  const form = useFormik({
    validateOnChange:false,
    validateOnMount:true,
    validateOnBlur:true,
    initialValues: {
      name: '',
      slug: '',
    },
    validationSchema: BrandSchema,
    onSubmit: async values => {
      const brand = {
        ...values,
        id: router.query.id,
      }
      const data =  await updateBrand(brand)

      if (data &&  !data.errors) {
        router.push('/brands')
      }
    },
  })
  useEffect(() => {
    if (data && data.getBrandById) {
      form.setFieldValue('name', data.getBrandById.name)
      form.setFieldValue('slug', data.getBrandById.slug)
    }
  }, [data])
  const checkForErrors = async() =>{
    if(JSON.stringify(form.errors) === '{}'){
      setModalVisible(true)
    }
  }
  return (
    <Layout>
      <Title>Edit brand</Title>
      <div className='mt-5'>
        <Button.LinkBack href='/brands'>Back</Button.LinkBack>
      </div>
      <div className='flex flex-col '>
        <div className='align-middle inline-block min-w-full shadow overflow-hidden rounded-sm  bg-darkBlack p-12'>
          <form onSubmit={form.handleSubmit}>
          <Input
                label='Brand name'
                placeholder='Enter brand name'
                onChange={form.handleChange}
                value={form.values.name}
                name='name'
                errorMessage={form.errors.name}
                onBlur={form.handleBlur}
              />

              <Input
                label='Brand slug'
                placeholder='Enter brand slug'
                onChange={form.handleChange}
                value={form.values.slug}
                name='slug'
                errorMessage={form.errors.slug}
                onBlur={form.handleBlur}
                helpText={"Slug is used to create easy-to-read URL's"}
              />
           <Button type='button' onClick={checkForErrors}>Save changes</Button> 
              <Modal type = {'edit'}  visible = {modalVisible} closeFunction = {() => setModalVisible(false)}/>
          </form>
          {updatedData && !!updatedData.errors && (
              <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2'>
                Error while trying to save
              </p>
            )}
        </div>
      </div>
    </Layout>
  )
}
export default EditBrand
