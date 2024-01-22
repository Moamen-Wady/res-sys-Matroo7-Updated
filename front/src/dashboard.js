import React, { memo } from 'react'
import './proj.css'
import { useState, useEffect } from 'react'
import api from './seats'
import Tools from './tools'
import ReservationTable from './reservationTable'
import SeatStructure from './SeatStructure'

const Reservations = memo( ReservationTable )
const Seats = memo( SeatStructure )

export default function Dashboard( { RELOAD, downloadInvoiceTable, getterSeats, getterResvs, arr, tab, SeatStructureEvents, USERPANEL } ) {
    var [ selectedxd, setSelectedxd ] = useState( [] );
    var [ currentSuccess, setCurrentSuccess ] = useState( '' );

    //api diagram buttons functions
    const yellower = async ( arrz ) => {
        setCurrentSuccess( 'none' )
        await ( api.post( `/resvd/${ arrz }`, {
            chairxds: arrz
        } ) )
            .then( async ( res ) => {
                if ( res.data.status == 'ok' ) {
                    await ( api.put( `/seats/${ arrz }`, {
                        chairxds: arrz,
                        color: "yellow"
                    } ) )
                        .then( async ( res ) => {
                            if ( res.data.status == 'ok' ) {
                                await getterSeats()
                                setCurrentSuccess( 'ok' )
                            }
                            else {
                                alert( res.data.result );
                                setCurrentSuccess( 'none' )
                            }
                        }
                        )
                        .catch( ( err ) => {
                            alert( err.message )
                            setCurrentSuccess( 'none' )
                        } )
                }
                else {
                    alert( res.data.result )
                    setCurrentSuccess( 'none' )
                }
            } )
            .catch( err => {
                alert( err.message ); setCurrentSuccess( 'none' )
            } )
    };

    const greener = async ( arrz ) => {
        setCurrentSuccess( 'none' )
        await ( api.put( `/resvd/${ arrz }`, {
            chairxds: arrz
        } ) )
            .then( async ( res ) => {
                if ( res.data.status == 'ok' ) {
                    await ( api.put( `/seats/${ arrz }`, {
                        chairxds: arrz,
                        color: "green"
                    } ) )
                        .then( async ( res ) => {
                            if ( res.data.status == 'ok' ) {
                                await getterSeats()
                                setCurrentSuccess( 'ok' )
                            }
                            else {
                                alert( res.data.result )
                                setCurrentSuccess( 'none' )
                            }
                        }
                        )
                        .catch( ( err ) => {
                            alert( err.message )
                            setCurrentSuccess( 'none' )
                        } )
                }
                else {
                    alert( res.data.result )
                    setCurrentSuccess( 'none' )
                }
            } )
            .catch( err => {
                alert( err.message );
                setCurrentSuccess( 'none' )
            } )
    };

    const reder = async ( arrz ) => {
        setCurrentSuccess( 'none' )
        await ( api.post( `/resvd/${ arrz }`, {
            chairxds: arrz
        } ) )
            .then( async ( res ) => {
                if ( res.data.status == 'ok' ) {
                    await ( api.put( `/seats/${ arrz }`, {
                        chairxds: arrz,
                        color: "red"
                    } ) )
                        .then( async ( res ) => {
                            if ( res.data.status == 'ok' ) {
                                await getterSeats()
                                setCurrentSuccess( 'ok' )
                            }
                            else {
                                alert( res.data.result )
                                setCurrentSuccess( 'none' )
                            }
                        }
                        )
                        .catch( ( err ) => {
                            alert( err.message )
                            setCurrentSuccess( 'none' )
                        } )
                }
                else {
                    alert( res.data.result )
                    setCurrentSuccess( 'none' )
                }
            } )
            .catch( err => {
                alert( err.message );
                setCurrentSuccess( 'none' )
            } )
    };

    //api table functions confirm/delete seats
    const confirmSeatsTable = async ( arrz ) => {
        await reder( arrz )
    };
    // !!!!CHECK THE X PARAMETER AND XD DELETER FUNCTION
    const deleteSeatsTable = async ( arrz ) => {
        setCurrentSuccess( 'none' )
        await ( api.put( `/resvd/${ arrz }`, {
            chairxds: arrz
        } ) )
            .then( async ( res ) => {
                if ( res.data.status == 'ok' ) {
                    greener( arrz )
                        .then( r => {
                            setCurrentSuccess( 'ok' )
                        } )
                        .catch( err => {
                            alert( err.message ); setCurrentSuccess( 'none' )
                        } )
                }
                else {
                    alert( res.data.result ); setCurrentSuccess( 'none' )
                }
            } )
            .catch( ( err ) => {
                alert( err.message );
                setCurrentSuccess( 'none' )
            } )
    };
    const deleteUserTable = async ( x, y ) => {
        setCurrentSuccess( 'none' )
        await ( api.delete( `/reservations/${ y }` ) )
            .then( async ( res ) => {
                if ( res.data.status == 'ok' ) {
                    console.log( 0 )
                    await deleteSeatsTable( x )
                        .then( ( r ) => {
                            setCurrentSuccess( 'ok' )
                            console.log( 1 )
                        } )
                        .catch( err => {
                            alert( err.message ); setCurrentSuccess( 'none' )
                            console.log( 2 )
                        } )
                }
                else {
                    console.log( 3 )
                    alert( res.data.result )
                    setCurrentSuccess( 'none' )
                }
            }
            )
            .catch( err => {
                console.log( 4 )
                alert( err.message );
                setCurrentSuccess( 'none' )
            } )
        await getterResvs();
        await getterSeats();
        // if ( currentSuccess !== 'ok' ) {
        //     alert( 'Something Went Wrong!' )
        // }
    };

    // copy values into table
    function onCheck( e, xd, item ) {
        if ( e.target.checked ) {
            e.target.checked = true;
            setSelectedxd( [ ...selectedxd, xd ] );
        }
        else {
            e.target.checked = false;
            setSelectedxd( selectedxd.filter( ( currItem ) => currItem !== xd ) );
        }
    };

    return (
        <div className='bgr'>
            <Tools />
            <Seats
                SeatStructureEvents={ SeatStructureEvents }
                arr={ arr }
                onCheck={ onCheck }
                USERPANEL={ USERPANEL }
            />
            <center>
                <button onClick={ () => yellower( selectedxd ) }>Hold (make  yellow)</button>
                <button onClick={ () => greener( selectedxd ) }>Cancel (make green)</button>
                <button onClick={ () => reder( selectedxd ) }>Confirm (make red)</button>
                <br />
                <button onClick={ () => downloadInvoiceTable() }>Download PDF</button>
            </center>
            <Reservations tab={ tab } confirmSeatsTable={ confirmSeatsTable } deleteUserTable={ deleteUserTable } />
        </div> )
}
