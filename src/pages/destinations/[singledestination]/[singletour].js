import styles from '@/styles/Home.module.sass'
import Link  from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Row, Col, Form } from 'react-bootstrap';
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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

    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState('')
    const [emailError, setEmailError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [dateError, setDateError] = useState('')

    // validate email
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
    }

    // validate phone
    const validatePhone = (phone) => {
        // must be 10 digits
        const re = /^\d{10}$/
        return re.test(phone)
    }

    // validate date
    const validateDate = (date) => {
        // must be in the future
        const today = new Date()
        const selectedDate = new Date(date)
        return selectedDate > today
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if(!validateEmail(e.target.value)) {
            setEmailError('Email is invalid')
        } else {
            setEmailError('')
        }
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
        if(!validatePhone(e.target.value)) {
            setPhoneError('Phone number is invalid')
        } else {
            setPhoneError('')
        }
    }

    const handleDateChange = (e) => {
        setDate(e.target.value)
        if(!validateDate(e.target.value)) {
            setDateError('Date must be in the future')
        } else {
            setDateError('')
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const tourTitle  = router?.query?.singletour
        const booking = {
            id: Math.floor(Math.random() * 10000) + 1,
            name,
            email,
            phone,
            date,
            tourTitle
        }
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(booking)
            })
            if(!res.ok) {
                throw new Error('Something went wrong')
            }
            const data = await res.json()
            toast.success('Booking successful',{
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: 'slide'

            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }

        setName('')
        setEmail('')
        setPhone('')
        setDate('')
        window.location.reload()

    }

    return (
        <div className={styles.container}>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
             />
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
                        <Form className="form" onSubmit={handleSubmit}>
                        <Row className="justify-content-center">
                            <Col lg="6">
                                <Form.Group className="mb-3" controlId="formBasicFirstName">
                                    <Form.Control name="firstName" type="text" placeholder='Enter Full Name*' required autoFocus autoComplete='on'
                                    value={name} onChange={handleNameChange}
                                     />
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control name="lastName" type="text" placeholder="Enter email*" required autoComplete='on'
                                    value={email} onChange={handleEmailChange}
                                     />
                                </Form.Group>
                                {emailError && <p className="error">{emailError}</p>}
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col lg="6">
                                <Form.Group className="mb-3" controlId="formBasicNumberOfPeople">
                                    <Form.Control name="firstName" type="number" placeholder='Enter Phone Number*' required autoFocus autoComplete='on'
                                    value={phone} onChange={handlePhoneChange}
                                        />
                                </Form.Group>
                                {phoneError && <p className="error">{phoneError}</p>}
                            </Col>
                            <Col lg="6">
                                <Form.Group className="mb-3" controlId="formBasicDate">
                                    <Form.Control name="lastName" type="date" placeholder="Enter email*" required autoComplete='on'
                                    value={date} onChange={handleDateChange}
                                        />
                                <Form.Label>Choose a date</Form.Label>
                            </Form.Group>
                            {dateError && <p className="error">{dateError}</p>}
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
    const {destinations} =await  import('../../../../tmp/destinations.json')

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
    const {destinations} =await  import('../../../../tmp/destinations.json')

    const destination = destinations.find((destination) => destination.name === params.singledestination)
    const tour = destination.tours.find((tour) => tour.title === params.singletour)

    return {
        props: {
            tour
        }
    }
}







