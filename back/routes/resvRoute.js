const express = require( 'express' );
const router = express.Router();
const Resv = require( '../models/resvSchema' );
const mongoose = require( 'mongoose' );
router.route( '/reservations' )

router.get( '/reservations', async ( req, res ) => {
    await ( Resv.find() )
        .then( ( result ) => res.send( {
            status: 'ok',
            result: result
        } ) )
        .catch( ( err ) => res.send( {
            status: 'fail',
            result: err
        } ) )
} );

router.post( '/reservations/', async ( req, res ) => {
    var userName = req.body.userName
    var phoneNum1 = req.body.phoneNum1
    var email = req.body.email
    var chairxds = req.body.chairxds
    var thisResv = new Resv( {
        userName: userName,
        phoneNum1: phoneNum1,
        email: email,
        chairxds: chairxds
    } )
    await thisResv.save()
        .then( () => {
            res.send( {
                status: 'ok',
            } )
        } )
        .catch( ( err ) => {
            res.send( {
                status: 'fail',
                result: err
            } )
        } )
} )

router.delete( '/reservations/:id', async ( req, res ) => {
    await ( Resv.find() )
        .catch( ( err ) => {
            res.send( {
                status: 'fail',
                result: err
            } )
        } )
        .then( async ( all ) => {
            const ths = all[ req.params.id ];
            await ( Resv.deleteOne( ths ) )
                .then( res.send( { status: 'ok' } ) )
                .catch( (err) => {
                    res.send( {
                        status: 'fail',
                        result: err
                    } )
                } )
        } )
} );

module.exports = router;