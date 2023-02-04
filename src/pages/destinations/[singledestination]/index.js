import styles from '@/styles/Home.module.sass'
import Link  from 'next/link'
import Image from 'next/image'

const SingleDestination = ({destination}) => {
    return (
        <main key={destination.id} className={styles.main}>
            <h1 className={styles.title}> {destination.name} </h1>
            <p className={styles.description}> {destination.description} </p>
            <h2>Available Tours </h2>
            <div className={styles.grid}>
                {
                    destination.tours.map((tour) => (
                        <Link className={styles.card} href={`/destinations/${destination.name}/${tour.title}`} key={tour.id}>
                            <Image src={tour.images[0]} alt={tour.title} width={200} height={200} />
                            <h3>{tour.title} &rarr;</h3>
                            <p>Find in-depth information about {tour.title}.</p>
                        </Link>
                    ))
                }
            </div>
        </main>
    )
}

export default SingleDestination

export async function getStaticPaths() {
    const {destinations} =await  import('../../../../data/destinations.json')

    const paths = destinations.map((destination) => ({
        params: {singledestination: destination.name}
    }))

    return {
        paths,
        fallback: false
    }


}

export async function getStaticProps({params}) {
    const {destinations} =await  import('../../../../data/destinations.json')

    const destination = destinations.find((destination) => destination.name === params.singledestination)

    return {
        props: {
            destination
        }
    }
}


 
