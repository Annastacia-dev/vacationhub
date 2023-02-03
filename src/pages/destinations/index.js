import styles from '@/styles/Home.module.sass'
import Link  from 'next/link'
import Image from 'next/image'


const DestinationsPage = ({data}) => {



    return (
        <main className={styles.main}>
        <h1 className={styles.title}> Destinations </h1>
        <div className={styles.grid}>
          {
            data.map((destination) => (
                <Link className={styles.card} href={`/destinations/${destination.name}`} key={destination.id} passHref>
                    <Image src={destination.image} alt={destination.name} width={200} height={200} />
                    <h3>{destination.name} &rarr;</h3>
                    <p>Find in-depth information about {destination.name}.</p>
                </Link>
            ))
          }
          </div>   
      </main>
    )
}

export default DestinationsPage

export async function getStaticProps() {

    const {destinations} =await  import('../../../data/destinations.json')

    return {
        props: {
            data: destinations    
        }
    }
}

