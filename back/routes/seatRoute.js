const express = require( 'express' );
const router = express.Router();
const Seat = require( '../models/seatSchema' );
const mongoose = require( 'mongoose' );
router.route( '/seats' )

router.get( '/seats', async ( req, res ) => {
    await ( Seat.find() )
        .then( ( allSeats ) => res.send( {
            status: 'ok',
            result: allSeats
        } ) )
        .catch( ( err ) => {
            res.send( {
                status: 'fail',
                result: err.message
            } )
        } )
} );

// router.get( '/seats/:id', async ( req, res ) => {
//     await ( Seat.findOne( { xd: req.params.id } ) )
//         .then( ( thisSeat ) => res.send( {
//             status: 'ok',
//             result: thisSeat
//         } ) )
//         .catch( ( err ) => {
//             res.send( {
//                 status: 'fail',
//                 result: err.message
//             } )
//         } )
// } );

router.put( '/seats/:id', async ( req, res ) => {
    var color = req.body.color;
    var xds = req.body.chairxds
    var i = 0;
    var bulkArr = []
    while ( i < xds.length ) {
        var x = xds[ i ]
        bulkArr.push( {
            updateOne: {
                "filter": { xd: x },
                "update": { '$set': { color: color } }
            }
        } )
        console.log( bulkArr )
        i++
    }
    let updateResult = await ( Seat.bulkWrite( bulkArr, { ordered: true } ) )
        .then( () => res.send( {
            status: 'ok'
        } ) )
        .catch( ( err ) => {
            res.send( {
                status: 'fail',
                result: err.message
            } )
        } )
} );

module.exports = router;