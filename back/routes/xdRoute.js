const express = require( 'express' );
const router = express.Router();
const Xd = require( '../models/xdSchema' );
const mongoose = require( 'mongoose' );
const mongodb = require( 'mongodb' );
router.route( '/resvd' );

router.post( '/resvd/', async ( req, res ) => {
    var xds = req.body.chairxds
    var i = 0
    var bulkArr = []
    while ( i < xds.length ) {
        var x = xds[ i ]
        bulkArr.push( x )
        i++
    }
    await ( Xd.find( { Xd: { $in: bulkArr } } ) )
        .then( ( arr ) => {
            if ( arr.length > 0 ) {
                res.send( {
                    status: 'booked'
                } )
            }
            else {
                res.send( {
                    status: 'ok'
                } )
            }
        }
        )
        .catch( ( err ) => {
            res.send( {
                status: 'fail',
                result: err.message
            } )
        } );
} )

router.post( '/resvd/:id', async ( req, res ) => {
    var xds = req.body.chairxds
    var i = 0;
    var bulkArr = []
    while ( i < xds.length ) {
        var x = xds[ i ]
        bulkArr.push( {
            insertOne: {
                document: {
                    Xd: x
                }
            }
        } )
        i++
    }
    await ( Xd.bulkWrite( bulkArr, { ordered: true } ) )
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

router.put( '/resvd/:id', async ( req, res ) => {
    var xds = req.body.chairxds
    var i = 0;
    var bulkArr = []
    while ( i < xds.length ) {
        var x = xds[ i ]
        bulkArr.push( {
            deleteMany: {
                filter: {
                    Xd: x
                }
            }
        } )
        i++
    }
    await ( Xd.bulkWrite( bulkArr, { ordered: true } ) )
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