import styles from '@/styles/Home.module.sass'
import Link  from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Row, Col, Form } from 'react-bootstrap';



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
                    <Popup trigger={<button className='button' >Book Now</button>} position="right center" modal nested>
                       { close => ( <div className="modal">
                            <button className="close-button" onClick={close}>
                            &times;
                            </button>
                            <div className="header">
                            {' '} 
                             Book {tour.title} tour
                            </div>
                            <div className="content">
                            {' '}
                            <Form className="form">
                        <Row className="justify-content-center">
                            <Col lg="6">
                                <Form.Group className="mb-3" controlId="formBasicFirstName">
                                    <Form.Control name="firstName" type="text" placeholder='Enter Full Name*' required autoFocus autoComplete='on'
                                     />
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control name="lastName" type="text" placeholder="Enter email*" required autoComplete='on'
                                     />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col lg="6">
                                <Form.Group className="mb-3" controlId="formBasicNumberOfPeople">
                                    <Form.Control name="firstName" type="number" placeholder='Enter Phone Number*' required autoFocus autoComplete='on'
                                        />
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Group className="mb-3" controlId="formBasicDate">
                                    <Form.Control name="lastName" type="date" placeholder="Enter email*" required autoComplete='on'
                                        />
                                <Form.Label>Choose a date</Form.Label>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <button className="button" type="submit"> Submit </button>
                        </Row>
                        </Form>      
                            </div>
                        </div>
                        )}
                    </Popup>      
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







