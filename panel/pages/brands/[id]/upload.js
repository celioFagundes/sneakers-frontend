import React, { useEffect } from 'react'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'
import { useQuery, useUpload } from '../../../lib/graphql'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

const UPLOAD_BRAND_LOGO = `
    mutation uploadBrandLogo($id: String!, $file: Upload!) {
        panelUploadBrandLogo(
        id: $id,
        file: $file
        ) 
    }
`
const UploadLogo = () => {
  const router = useRouter()
  const { data } = useQuery(`
  query{
    getBrandById(id: "${router.query.id}"){
        name
        slug
      }
}`)
  const [uploadData, uploadBrandLogo] = useUpload(UPLOAD_BRAND_LOGO)
  const form = useFormik({
    initialValues: {
      id: router.query.id,
      file: '',
    },

    onSubmit: async values => {
      const brand = {
        ...values,
        id: router.query.id,
      }
      const data = await uploadBrandLogo(brand)

      if (data && !data.errors) {
        router.push('/brands')
      }
    },
  })
  return (
    <Layout>
      <Title>
        Brand logo upload:{' '}
        {data && data.getBrandById && data.getBrandById.name}
      </Title>
      <div className='mt-5'>
        <Button.LinkBack href='/brands'>Back</Button.LinkBack>
      </div>
      <div className='flex flex-col'>
        <div className='align-middle  inline-block min-w-full shadow overflow-hidden rounded-sm  bg-darkBlack p-12'>
          <form onSubmit={form.handleSubmit}>
            <div className='flex flex-col'>
              <input
                type='file'
                name='file'
                className='text-white'
                onChange={evt =>
                  form.setFieldValue('file', evt.target.files[0])
                }
              />

              <Button type='submit'>Save logo</Button>
            </div>
          </form>
          {uploadData && !!uploadData.errors && (
            <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2'>
              Error while trying to save
            </p>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default UploadLogo
