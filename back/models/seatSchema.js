const mongoose = require( 'mongoose' )


const seatSchema = new mongoose.Schema( {
    xd: { type: String, required: true },
    number: { type: Number, required: true },
    color: { type: String, required: true },
    _id: mongoose.Schema.Types.ObjectId
} )

const Seat = mongoose.model( 'Seat', seatSchema )

module.exports = Seat;