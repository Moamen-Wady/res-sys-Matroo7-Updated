import React, { useState } from 'react'
import ProjX from './proj'
import Dashboard from './dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import JsPDF from 'jspdf'
import api from "./seats";
import xz from './mtr'

export default function App() {
    var [ arr, setArr ] = useState( [] );
    var [ tab, setTab ] = useState( [] )

    const RELOAD = () => {
        return new Promise( () => {
            setTimeout( () => {
                window.location.reload();
            }, 500 );
        } )
    };

    const downloadInvoiceTable = () => {
        const report = new JsPDF( 'portrait', 'pt', 'a1' );
        report.html( document.querySelector( '.Displaytable' ) ).then( () => {
            report.save( 'invoice.pdf' );
        } );
    }

    async function getterSeats() {
        await ( api.get( "/seats" ) )
            .then(
                ( res ) => {
                    if ( res.data.status === 'ok' ) {
                        setArr( res.data.result )
                    }
                    else { alert( res.data.result ) }
                }
            )
            .catch( ( err ) => {
                alert( err.message )
            } )
    }

    async function getterResvs() {
        await ( api.get( "/reservations" ) )
            .then(
                ( res ) => {
                    if ( res.data.status === 'ok' ) {
                        setTab( res.data.result )
                    }
                    else { alert( res.data.result ) }
                }
            )
            .catch( ( err ) => {
                alert( err.message )
            } )
    }

    function SeatStructureEvents( USERPANEL, color ) {
        if ( !USERPANEL ) {
            return 'all'
        }
        else {
            if ( color == 'green' ) {
                return 'all'
            }
            else {
                return 'none'
            }
        }
    }

    return (
        <Router>
            <Routes >
                <Route path='/'
                    element={
                        <ProjX
                            RELOAD={ RELOAD }
                            downloadInvoiceTable={ downloadInvoiceTable }
                            arr={ arr }
                            getterSeats={ getterSeats }
                            USERPANEL={ true }
                            SeatStructureEvents={ SeatStructureEvents }
                        /> } />
                <Route path='/dbrd'
                    element={
                        <Dashboard
                            RELOAD={ RELOAD }
                            downloadInvoiceTable={ downloadInvoiceTable }
                            arr={ arr }
                            tab={ tab }
                            getterSeats={ getterSeats }
                            getterResvs={ getterResvs }
                            USERPANEL={ false }
                            SeatStructureEvents={ SeatStructureEvents }
                        /> } />
            </Routes>
        </Router>
    )
}
