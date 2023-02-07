import path from 'path' // enables us to use path.join
import fs from 'fs' // enables us to use fs.readFile to write to a file


export default function handler(req, res){
    const { method } = req

    function buildPath(){// 
        return path.join(process.cwd(), 'data', 'destinations.json') // process.cwd() is the current working directory, which is the root of the project, then we join the data folder and the destinations.json file
    }

    function getAllDestinations(filePath){
        const destinations = fs.readFileSync(filePath) // read the file
        return JSON.parse(destinations) // parse the file into a JSON object
    }

    const filePath = buildPath()
    const allDestinations = getAllDestinations(filePath)


    if(!allDestinations){
        return res.status(400).json({message : "Destinations not found"})
    }

    // all destinations have tours, so we need to loop through all destinations and then loop through all tours in each destination
    // all tours have a bookings array, so we need to loop through all tours and then loop through all bookings in each tour
    // return all bookings
    const allBookings = allDestinations.destinations.map((destination) => (
        destination.tours.map((tour) => (
            tour.bookings.map((booking) => (
                booking
            ))
        ))
    ))

    const bookings = allBookings.flat().flat()

    const {destinations} = allDestinations

    console.log(destinations)



    if(method === "POST"){
        const { id, name, email, phone, date,tourTitle} = req.body
        const booking = {id, name, email, phone, date, tourTitle}

        const newDestinations = destinations.map((destination) => {
            destination.tours.map((tour) => {
                if(tour.title === tourTitle){
                    tour.bookings.push(booking)
                }
            })
            return destination
        })

        const newAllDestinations = {
            destinations: newDestinations
        }

        fs.writeFileSync(filePath, JSON.stringify(newAllDestinations))

        res
        .status(200)
        .json({
            message: "Booking created", 
            data: {id, name, email, phone, date, tourTitle}
        })
        

    } else if (method === "GET"){
        res.status(200).json({success: true, data: bookings})
    } else {
        res.status(400).json({success: false, message: "Something went wrong"})
    }       
}

