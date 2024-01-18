const mongoose = require( 'mongoose' )

const resvSchema = new mongoose.Schema( {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    chairxds: { type: Array, required: true },
    phoneNum1: { type: Number, required: true }
} )

const Resv = mongoose.model( 'Resv', resvSchema )

module.exports = Resv;