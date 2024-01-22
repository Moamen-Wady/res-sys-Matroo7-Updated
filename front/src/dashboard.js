import React, { memo } from 'react'
import './proj.css'
import { useState, useEffect } from 'react'
import api from './seats'
import Tools from './tools'
import ReservationTable from './reservationTable'
import SeatStructure from './SeatStructure'

const Reservations = memo( ReservationTable )

export default function Dashboard( { RELOAD, downloadInvoiceTable, getterSeats, getterResvs, arr, tab, SeatStructureEvents, USERPANEL } ) {
    var [ selectedxd, setSelectedxd ] = useState( [] );

    useEffect( () => {
        getterSeats()
        getterResvs()
    }, [] );

    //api diagram buttons functions
    const yellower = async ( arrz ) => {
        await ( api.post( `/resvd/${ arrz }`, {
            chairxds: selectedxd
        } ) )
            .then( async ( res ) => {
                if ( res.data.status === 'ok' ) {
                    await ( api.put( `/seats/${ arrz }`, {
                        chairxds: selectedxd,
                        color: "yellow"
                    } ) )
                        .then( async ( res ) => {
                            if ( res.data.status === 'ok' ) {
                                return 'done'
                            }
                            else {
                                alert( res.data.result );
                                return ''
                            }
                        }
                        )
                        .catch( ( err ) => {
                            alert( err.message )
                            return ''
                        } )
                }
                else {
                    alert( res.data.result )
                    return ''
                }
            } )
            .catch( err => { alert( err.message ); return '' } )
        RELOAD()
    };

    const greener = async ( arrz ) => {
        await ( api.post( `/resvd/${ arrz }`, {
            chairxds: selectedxd
        } ) )
            .then( async ( res ) => {
                if ( res.data.status === 'ok' ) {
                    await ( api.put( `/seats/${ arrz }`, {
                        chairxds: selectedxd,
                        color: "green"
                    } ) )
                        .then( async ( res ) => {
                            if ( res.data.status === 'ok' ) {
                                return 'done'
                            }
                            else {
                                alert( res.data.result )
                                return ''
                            }
                        }
                        )
                        .catch( ( err ) => {
                            alert( err.message )
                            return ''
                        } )
                }
                else {
                    alert( res.data.result )
                    return ''
                }
            } )
            .catch( err => { alert( err.message ); return '' } )
        RELOAD()
    };

    const reder = async ( arrz ) => {
        await ( api.post( `/resvd/${ arrz }`, {
            chairxds: selectedxd
        } ) )
            .then( async ( res ) => {
                if ( res.data.status === 'ok' ) {
                    await ( api.put( `/seats/${ arrz }`, {
                        chairxds: selectedxd,
                        color: "red"
                    } ) )
                        .then( async ( res ) => {
                            if ( res.data.status === 'ok' ) {
                                return 'done'
                            }
                            else {
                                alert( res.data.result )
                                return ''
                            }
                        }
                        )
                        .catch( ( err ) => {
                            alert( err.message )
                            return ''
                        } )
                }
                else {
                    alert( res.data.result )
                    return ''
                }
            } )
            .catch( err => { alert( err.message ); return '' } )
        RELOAD()
    };

    //api table functions confirm/delete seats
    const confirmSeatsTable = async ( arrz ) => {
        reder( arrz )
        getterSeats();
    };
    // !!!!CHECK THE X PARAMETER AND XD DELETER FUNCTION
    const deleteSeatsTable = async ( arrz ) => {
        await ( api.put( `/resvd/${ arrz }`, {
            chairxds: arrz
        } ) )
            .then( async ( res ) => {
                if ( res.data.status === 'ok' ) {
                    greener( arrz )
                        .then( r => { if ( r === 'done' ) { return 'done' } else { return '' } } )
                        .catch( err => { alert( err.message ); return '' } )
                }
                else { alert( res.data.result ); return '' }
            }
            )
            .catch( ( err ) => {
                alert( err.message );
                return ''
            } )
        getterSeats();
    };
    const deleteUserTable = async ( x, y ) => {
        await ( api.delete( `/reservations/${ y }` ) )
            .then( async ( res ) => {
                if ( res.data.status === 'ok' ) {
                    await deleteSeatsTable( x )
                        .then( async ( r ) => {
                            if ( r === 'done' ) {
                                return 'done'
                            }
                            else { alert( 'user not deleted ' ); return '' }
                        } )
                        .catch( err => { alert( err.message ); return '' } )
                }
                else {
                    alert( res.data.result )
                    return ''
                }
            }
            )
            .catch( err => { alert( err.message ); return '' } )
        getterResvs(); getterSeats();
    };

    // copy values into table
    function onCheck( e, xd, item ) {
        if ( e.target.checked ) {
            e.target.checked = true;
            setSelectedxd( [ ...selectedxd, xd ] );
        } else {
            e.target.checked = false;
        }
    };

    return (
        <div className='bgr'>
            <Tools />
            <SeatStructure SeatStructureEvents={ SeatStructureEvents } arr={ arr } onCheck={ onCheck } USERPANEL={ USERPANEL } />
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
