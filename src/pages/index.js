import Head from 'next/head'
import { Inter } from '@next/font/google'
import HomePage from '@/components/home/Home'


const inter = Inter({ subsets: ['latin'] })

// Top Page

export default function Home({title, description, data}) {
  return (
    <>
      <Head>
        <title>Vacation hub</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>  
      <HomePage title={title} description={description} data={data} />   
    </>
  )
}

export async function getServerSideProps() {

  const {destinations} =await  import('../../data/destinations.json')

  return {
      props: {
          title: 'Vacation Hub',
          description: 'Find the best vacation spots',
          data: destinations
      }
  }
}
