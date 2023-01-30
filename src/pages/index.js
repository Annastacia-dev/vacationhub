import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link  from 'next/link'

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
      <main className={styles.main}>
      <header className={styles.header}>
          <nav>
            <Link href="/">Home</Link>
            <a href="/about">About</a>
            <a href="/destinations">Destinations</a>
          </nav>
        </header>
        <h1 className={styles.title}> Welcome to {title} </h1>
        <p className={styles.description}>
         {description}
        </p>
        <div className={styles.grid}>
          {
            data.map((destination) => (
              <Link className={styles.card} href={`/destinations/${destination.tours}/${destination.id}`} key={destination.id}>
                  <h3>{destination.name} &rarr;</h3>
                  <p>Find in-depth information about {destination.name}.</p>
              </Link>
            ))
          }
      
        </div>   
      </main>
    </>
  )
}

export async function getServerSideProps() {

  const {destinations} =await  import('../../data/destinations.json')

  console.log(destinations)


  return {
      props: {
          title: 'Vacation Hub',
          description: 'Find the best vacation spots',
          data: destinations
      }
  }
}
