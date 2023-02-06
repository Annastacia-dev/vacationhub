export default function handler(req, res){
    const {method} = req
    if(method === "POST"){
        const {id, name, email, phone, date} = req.body
        const booking = {
            id: Math.floor(Math.random() * 10000) + 1,
            name,
            email,
            phone,
            date
        }
        res.status(200).json({success: true, data: booking})
    } else if (method === "GET"){
        res.status(200).json({success: true, data: "bookings"})
    } else {
        res.status(400).json({success: false})
    }       
}