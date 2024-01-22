import React, { memo } from 'react'
import './proj.css'
import { useState, useEffect } from 'react'
import api from "./seats";
import Tools from './tools';
import SeatStructure from './SeatStructure';
import DisplayerBoxes from './DisplayerBoxes';
import FinalInvoice from './FinalInvoice';
function invoicer( i ) {
    switch ( i ) {
        case true:
            return 'none';
        case false:
            return 'block';
        default:
            return '';
    }
}

const xdUpdater = async ( arrz, RELOAD, cb0, cb, cb1, cb2, userName, email, selectedxd, phoneNumber1 ) => {
    cb0( "Please Wait, Checking the seats" );
    await ( api.post( `/resvd/`, {
        chairxds: arrz
    } ) ).then( ( res ) => {
        if ( res.data.status === 'booked' ) {
            console.log( res.data )
            alert( 'SOME OR ALL SEATS YOU HAVE SELECTED HAD JUST BEEN TAKEN BY ANOTHER USER, THE PAGE WILL RELOAD NOW ' );
            RELOAD();
        }
        else if ( res.data.status === 'fail' ) {
            alert( res.data.result )
        }
        else { cb( arrz, cb1, cb2, userName, email, selectedxd, phoneNumber1 ); };
    } )
        .catch( ( err ) => { alert( err.message ) } )
}

const seatsUpdater = async ( arrz, cb1, cb2, userName, email, selectedxd, phoneNumber1 ) => {
    await ( api.post( `/resvd/${ arrz }`, {
        chairxds: arrz
    } ) )
        .then( async ( res ) => {
            if ( res.data.status === 'ok' ) {
                await ( api.put( `/seats/${ arrz }`, {
                    chairxds: arrz,
                    color: "yellow"
                } ) )
                    .then( async ( res ) => {
                        if ( res.data.status === 'ok' ) {
                            await cb1( userName, email, selectedxd, phoneNumber1 );
                            await cb2();
                        }
                        else { alert( res.data.result ) }
                    }
                    )
                    .catch( ( err ) => {
                        alert( err.message )
                    } )
            }
            else {
                alert( res.data.result )
            }
        } )
        .catch( err => { alert( err.message ) } )
};

const tableUpdater = async ( userName, email, selectedxd, phoneNumber1 ) => {
    await ( api.post( `/reservations/`, {
        "userName": userName,
        "email": email,
        "chairxds": selectedxd,
        "phoneNum1": phoneNumber1,
    } ) )
        .then( () => { return } )
        .catch( err => window.ononline( () => {
            tableUpdater()
        } ) )
};

const Seats = memo( SeatStructure )


export default function ProjX( { RELOAD, downloadInvoiceTable, arr, USERPANEL, SeatStructureEvents } ) {
    var [ userName, setUserName ] = useState()
    var [ email, setEmail ] = useState()
    var [ numSeats, setNumSeats ] = useState( 0 )
    var [ phoneNumber1, setPhoneNumber1 ] = useState()
    var [ confirm, setConfirm ] = useState( true )
    var [ invoice, setInvoice ] = useState( true )
    var [ selected, setSelected ] = useState( [] );
    var [ selectedxd, setSelectedxd ] = useState( [] );
    var [ please, setPlease ] = useState( "" );
    var [ notification, setNotification ] = useState( <></> );

    //form handlers
    const handleChangeName = ( event ) => {
        var namevalue = event.target.value;
        setUserName( namevalue );
    };
    const handleChangeEmail = ( event ) => {
        var numvalue = event.target.value;
        setEmail( numvalue );
    };
    const handleChangeNumSeats = ( event ) => {
        var numvalue = event.target.value;
        setNumSeats( numvalue );
    };
    const handleChangePhone1 = ( event ) => {
        var phonevalue = event.target.value;
        setPhoneNumber1( phonevalue );
    };
    function taker() {
        if ( userName == null || numSeats == null || phoneNumber1 == null || email == null ) {
            alert( "PLEASE FILL ALL FIELDS IN THE FORM ABOVE " );
        }
        else {
            form();
        }
    };
    function form() {
        if ( numSeats > 0 ) {
            setNotification( <p>Please Select The Seats Now And Submit <br /><br /> Use The Tools To Zoom & Scroll In All Directions To See All Chairs</p> )
            setConfirm( false )
        }
        else {
            alert( "Please choose A valid number of seats" )
        }
    }
    function onCheck( e, xd, item ) {
        if ( userName == null || numSeats == null || phoneNumber1 == null || email == null || notification == null ) {
            alert( "PLEASE FILL ALL FIELDS IN THE FORM ABOVE " );
            e.target.checked = false;
            return
        }
        if ( e.target.checked && selectedxd.length == numSeats ) {
            alert( `You Have Already Chosen ${ numSeats } Seats ` )
            e.target.checked = false;
            return
        }
        if ( e.target.checked && selectedxd.length < numSeats ) {
            e.target.checked = true;
            setSelectedxd( [ ...selectedxd, xd ] );
            setSelected( [ ...selected, item ] );
        }
        else {
            e.target.checked = false;
            setSelected( selected.filter( ( currItem ) => currItem !== item ) );
            setSelectedxd( selectedxd.filter( ( currItem ) => currItem !== xd ) );
        }
    };
    const throwInvoice = () => {
        setInvoice( false );
    }
    const requestTicket = () => {
        if ( selectedxd.length == numSeats ) {
            xdUpdater( selectedxd, RELOAD, setPlease, seatsUpdater, tableUpdater, throwInvoice, userName, email, selectedxd, phoneNumber1 );
        }
        else {
            alert( `please choose ${ numSeats } chair` );
            setConfirm( false );
        }
    };

    return (
        <div className='bgr'>
            <div className='bgc'>
                <div className='inputForm'>
                    <div className='inputForm1'>
                        <ul>
                            <li>
                                <p> برجاء التأكد من صحة رقم الهاتف والايميل لارسال رسالة التأكيد</p>
                            </li>
                            <li>
                                <p>اذا لم تتواجد بيانات صحيحة يتم الغاء الحجز تلقائيا</p>
                            </li>
                            <li>
                                <p>يتم الحجز مرة واحدة فقط ولا يمكن تغييره </p>
                            </li>
                            <li>
                                <p>الاسعار : <br />
                                    A Area: 650.EGP <br />
                                    B Area: 500.EGP <br />
                                    C Area: 350.EGP <br />
                                </p>
                            </li>
                            <br />
                            <li>
                                <p>Please Make Sure The Phone Number And E-mail Are Correct To receive the confirmation message</p>
                            </li>
                            <li>
                                <p>take into consideration that registeration is only done ONCE and cannot be changed </p>
                            </li>
                            <li>
                                <p>if the data provided isn&apos;t valid the registeration is cancelled automatically</p>
                            </li>
                            <li>
                                <p>Prices: <br />
                                    A Area: 650.EGP <br />
                                    B Area: 500.EGP <br />
                                    C Area: 350.EGP <br />
                                </p>
                            </li>

                        </ul>
                    </div>
                    <div className='inputForm2'><br />
                        <div><label>Name:</label><input type="text" onChange={ handleChangeName } disabled={ !confirm } /></div><br />
                        <div><label>Number of Seats:</label><input type="number" className='Numseats' onChange={ handleChangeNumSeats } disabled={ !confirm } /></div><br />
                        <div><label>Correct Phone Number:</label><input type="number" onChange={ handleChangePhone1 } className='Numseats' disabled={ !confirm } /></div ><br />
                        <div><label>E-mail:</label><input type="text" onChange={ handleChangeEmail } className='Numseats' disabled={ !confirm } /></div ><br />
                    </div>
                </div>
                <button onClick={ () => taker() } style={ { margin: "auto" } } className='slctbtn'>
                    Start Selecting
                </button>
                { notification }
                <Tools />
                <Seats
                    SeatStructureEvents={ SeatStructureEvents }
                    arr={ arr }
                    onCheck={ onCheck }
                    USERPANEL={ USERPANEL }
                />
                <DisplayerBoxes
                    confirm={ confirm }
                    please={ please }
                    requestTicket={ requestTicket }
                    userName={ userName }
                    email={ email }
                    phoneNumber1={ phoneNumber1 }
                    selectedxd={ selectedxd }
                />
                <FinalInvoice
                    userName={ userName }
                    email={ email }
                    phoneNumber1={ phoneNumber1 }
                    selectedxd={ selectedxd }
                    downloadInvoiceTable={ downloadInvoiceTable }
                    RELOAD={ RELOAD }
                    invoicer={ invoicer }
                    invoice={ invoice }
                />
            </div>
        </div>
    )
}
