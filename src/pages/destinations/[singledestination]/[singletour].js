import styles from '@/styles/Home.module.sass'
import Link  from 'next/link'
import Image from 'next/image'



const SingleDestinationTour = ({tour}) => {

    const makeStars = (rating) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push("★")
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                stars.push("½")
            } else {
                stars.push("☆")
            }
        }
        return stars
    }




    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}> {tour.title} </h1>
                <div className={styles.grid}>
                    <Image src={tour.image} alt={tour.title} width={200} height={200} />
                    <p className={styles.description}> {tour.description}
                    <span> {makeStars(tour.rating)} </span>
                    <button className={styles.button}> Book Now </button>
                    </p>  
                </div>
                < div className={styles.grid}>
                <p className={styles.description}> ${tour.price} per person
                </p>
                <p className={styles.description}>Duration: {tour.duration} </p>
                <p className={styles.description}>Included: {
                tour.included.split(',').map((item, index) => (<li key={index}>{item}</li>))}
                </p>
                <p className={styles.description}>Excluded: {
                tour.excluded.split(',').map((item, index) => (<li key={index}>{item}</li>))}
                </p>
                </div>

            </main>
        </div>
    )
}

export default SingleDestinationTour

export async function getStaticPaths() {
    const {destinations} =await  import('../../../../data/destinations.json')

    const tourPaths = destinations.map((destination) => (
        destination.tours.map((tour) => ({
            params: {singledestination: destination.name, singletour: tour.title}
        }))
    ))

    const paths = tourPaths.flat()

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const {destinations} =await  import('../../../../data/destinations.json')

    const destination = destinations.find((destination) => destination.name === params.singledestination)
    const tour = destination.tours.find((tour) => tour.title === params.singletour)

    return {
        props: {
            tour
        }
    }
}







