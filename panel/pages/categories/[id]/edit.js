import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'
import { useMutation, useQuery, fetcher } from '../../../lib/graphql'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import * as Yup from 'yup'
import Modal from '../../../components/Modal'

let id = ''
const UPDATE_CATEGORY = `
    mutation updateCategory($id: String!, $name: String!, $slug: String!) {
        panelUpdateCategory (input: {
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
const CategorySchema = Yup.object().shape({
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
          getCategoryBySlug(slug:"${value}"){
            id
          }
        }`,
        }),
      )
      if (ret.errors) {
        return true
      }
      if (ret.data.getCategoryBySlug.id === id) {
        return true
      }
      return false
    }),
})
const EditCategory = () => {
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false)
  id = router.query.id
  const { data } = useQuery(`
  query{
    getCategoryById(id: "${router.query.id}"){
        name
        slug
      }
}`)
  const [updatedData, updateCategory] = useMutation(UPDATE_CATEGORY)
  const form = useFormik({
    validateOnChange: false,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: '',
      slug: '',
    },
    validationSchema: CategorySchema,
    onSubmit: async values => {
      const category = {
        ...values,
        id: router.query.id,
      }
      const data = await updateCategory(category)

      if (data && !data.errors) {
        router.push('/categories')
      }
    },
  })
  useEffect(() => {
    if (data && data.getCategoryById) {
      form.setFieldValue('name', data.getCategoryById.name)
      form.setFieldValue('slug', data.getCategoryById.slug)
    }
  }, [data])
  const checkForErrors = async () => {
    if (JSON.stringify(form.errors) === '{}') {
      setModalVisible(true)
    }
  }
  return (
    <Layout>
      <Title>Edit Category</Title>
      <div className='mt-5'>
        <Button.LinkBack href='/categories'>Back</Button.LinkBack>
      </div>
      <div className='flex flex-col'>
        <div className='align-middle inline-block min-w-full shadow overflow-hidden rounded-sm bg-darkBlack p-12'>
          <form onSubmit={form.handleSubmit}>
            <div className='mb-3'>
              <Input
                label='Category name'
                placeholder='Enter category name'
                onChange={form.handleChange}
                value={form.values.name}
                name='name'
                errorMessage={form.errors.name}
                onBlur={form.handleBlur}
              />
            </div>

            <Input
              label='Category slug'
              placeholder='Enter category slug'
              onChange={form.handleChange}
              value={form.values.slug}
              name='slug'
              errorMessage={form.errors.slug}
              onBlur={form.handleBlur}
              helpText={"Slug is used to create easy-to-read URL's"}
            />
            <Button type='button' onClick={checkForErrors}>
              Save changes
            </Button>
            <Modal
              type={'edit'}
              visible={modalVisible}
              closeFunction={() => setModalVisible(false)}
            />
          </form>
          {updatedData && !!updatedData.errors && (
            <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2'>
               Error while trying to save data
            </p>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default EditCategory
