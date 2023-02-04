import styles from '@/styles/Home.module.sass'
import Link  from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'



const SingleDestinationTour = ({tour}) => {


    const [currentImage, setCurrentImage] = useState(0)

    const handlePrevious = () => {
        setCurrentImage((currentImage - 1 + tour.images.length) % tour.images.length);
      };

    const handleNext = () => {
        setCurrentImage((currentImage + 1) % tour.images.length);
        };
      
    



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
                <div className='image-slider'>
                    <div className="image-container">
                        <img className="slider-image"  src={tour.images[currentImage]} alt={tour.title}/>
                    </div>

                    <div className="button-container">
                        <button className='previous-button' onClick={handlePrevious}>&larr;</button>
                        <button className='next-button' onClick={handleNext}>&rarr;</button>
                    </div>    
                </div>

                    <p className={styles.description}> {tour.description}
                    <span> {makeStars(tour.rating)} </span>
                    <button className={styles.button}> Book Now </button>
                    </p>  
                <div className="grid">
                <p> ${tour.price} per person
                </p>
                <p>Duration: {tour.duration} </p>
                <p>Included: {
                tour.included.split(',').map((item, index) => (<li key={index}>{item}</li>))}
                </p>
                <p>Excluded: {
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







