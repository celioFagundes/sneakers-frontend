import Head from 'next/head'

const Seo = ({title = 'Sneakers',description = 'All the best shoes and sneakers'}) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name ='description' content = {description}/>
    </Head>
  )
}

export default Seo