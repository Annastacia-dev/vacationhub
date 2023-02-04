import styles from '@/styles/Home.module.sass'
import Link  from 'next/link'
import Image from 'next/image'


const DestinationsPage = ({data}) => {
    return (
        <main className={styles.main}>
        <h1 className={styles.title}> Destinations </h1>
        <p className={styles.description}> 
        We offer a diverse range of destinations to choose from, each with its own unique charm and appeal. From tropical beaches and bustling cities to awe-inspiring natural wonders and rich cultural heritage sites, there is something for everyone. Our destinations span the globe, from popular tourist hotspots to off-the-beaten-path locations, allowing you to create a travel experience that is truly one-of-a-kind. Whether you are looking for a romantic escape, a family-friendly adventure, or a solo travel experience, our knowledgeable travel advisors can help you find the perfect destination to meet your needs.
        </p>
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

