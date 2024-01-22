import React from 'react'
import './proj.css'
import { useState, useEffect } from 'react'
import api from "./seats";
import Tools from './tools';
import SeatStructure from './SeatStructure';
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
        else { cb( arrz, cb1, cb2 ); };
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

export default function ProjX( { RELOAD, downloadInvoiceTable, getterSeats, arr, USERPANEL, SeatStructureEvents } ) {
    var [ userName, setUserName ] = useState()
    var [ email, setEmail ] = useState()
    var [ numSeats, setNumSeats ] = useState( 1 )
    var [ phoneNumber1, setPhoneNumber1 ] = useState()
    var [ confirm, setConfirm ] = useState( true )
    var [ invoice, setInvoice ] = useState( true )
    var [ selected, setSelected ] = useState( [] );
    var [ selectedxd, setSelectedxd ] = useState( [] );
    var [ please, setPlease ] = useState( "" );
    var [ notification, setNotification ] = useState( <></> );

    // useEffect( () => {
    //     getterSeats()
    // }, [ notification ] );

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

    //form button
    function taker() {
        if ( userName === null || numSeats === null || phoneNumber1 === null || email === null ) {
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

    // copy Seats ids into table when choosing seats
    function onCheck( e, xd, item ) {
        if ( userName === null || numSeats === null || phoneNumber1 === null || email === null || notification === null ) {
            alert( "PLEASE FILL ALL FIELDS IN THE FORM ABOVE " );
            e.target.checked = false;
            return
        }
        if ( e.target.checked && selectedxd.length === numSeats ) {
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

    //throw invoice
    const throwInvoice = () => {
        setInvoice( false );
    }

    //finished selecting and send 
    const requestTicket = () => {
        if ( selectedxd.length === numSeats ) {
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
                <SeatStructure SeatStructureEvents={ SeatStructureEvents } arr={ arr } onCheck={ onCheck } USERPANEL={ USERPANEL } />
                <div className='displayerBoxes'>
                    <button className='confirm slctbtn' disabled={ confirm } onClick={ () => requestTicket() }>Confirm Selection</button>
                    <p className='please'>{ please }</p>
                    <table className='Displaytable'>
                        <tbody>
                            <tr><td className='hdr'><p>Name</p></td></tr >
                            <tr><td className='dt'><p>{ userName }</p></td></tr>
                            <tr><td className='hdr'><p>Serial Numbers of Seats</p></td></tr >
                            <tr><td className='dt'><p>{ selectedxd.toString() }</p></td></tr>
                            <tr><td className='hdr'><p>Phone Number</p></td></tr >
                            <tr><td className='dt'><p>{ phoneNumber1 }</p></td></tr>
                            <tr><td className='hdr'><p>E-mail</p></td></tr >
                            <tr><td className='dt'><p>{ email }</p></td></tr>
                            <tr><td className='hdr'>Total Price</td></tr>
                            <tr><td className='dt'>{
                                selectedxd.filter( x => x.charAt( 0 ) == "A" ).length * 650 +
                                selectedxd.filter( x => x.charAt( 0 ) == "B" ).length * 650 +
                                selectedxd.filter( x => x.charAt( 0 ) == "C" ).length * 650 +
                                selectedxd.filter( x => x.charAt( 0 ) == "D" ).length * 650 +
                                selectedxd.filter( x => x.charAt( 0 ) == "E" ).length * 650 +
                                selectedxd.filter( x => x.charAt( 0 ) == "F" ).length * 650 +
                                selectedxd.filter( x => x.charAt( 0 ) == "G" ).length * 500 +
                                selectedxd.filter( x => x.charAt( 0 ) == "H" ).length * 500 +
                                selectedxd.filter( x => x.charAt( 0 ) == "I" ).length * 500 +
                                selectedxd.filter( x => x.charAt( 0 ) == "J" ).length * 500 +
                                selectedxd.filter( x => x.charAt( 0 ) == "K" ).length * 500 +
                                selectedxd.filter( x => x.charAt( 0 ) == "L" ).length * 500 +
                                selectedxd.filter( x => x.charAt( 0 ) == "M" ).length * 500 +
                                selectedxd.filter( x => x.charAt( 0 ) == "N" ).length * 500 +
                                selectedxd.filter( x => x.charAt( 0 ) == "O" ).length * 500 +
                                selectedxd.filter( x => x.charAt( 0 ) == "P" ).length * 500 +
                                selectedxd.filter( x => x.charAt( 0 ) == "Q" ).length * 350 +
                                selectedxd.filter( x => x.charAt( 0 ) == "R" ).length * 350 +
                                selectedxd.filter( x => x.charAt( 0 ) == "S" ).length * 350 +
                                selectedxd.filter( x => x.charAt( 0 ) == "T" ).length * 350 +
                                selectedxd.filter( x => x.charAt( 0 ) == "U" ).length * 350 +
                                selectedxd.filter( x => x.charAt( 0 ) == "V" ).length * 350 +
                                selectedxd.filter( x => x.charAt( 0 ) == "W" ).length * 350 +
                                selectedxd.filter( x => x.charAt( 0 ) == "X" ).length * 350 +
                                selectedxd.filter( x => x.charAt( 0 ) == "Y" ).length * 350 +
                                selectedxd.filter( x => x.charAt( 0 ) == "Z" ).length * 350
                            }
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <span>
                    <div className='invoice' style={ { display: invoicer( invoice ), zIndex: 2000000 } }>
                        <p style={ { color: 'black' } }><br />
                            تم تسجيل الحجز بنجاح ✅<br /><br />
                            <b>pdfبرجاء تنزيل نسخة ال <br /> Doneقبل الضغط على زر </b><br />
                            تم تسجيل حجزك و سيتم ارسال رسالة تأكيد الى عنوان البريد الالكتروني خاصتكم
                        </p>
                        <hr />
                        <table className='Displaytable ivt'>
                            <tbody>
                                <tr><td className='hdr'>Name</td></tr>
                                <tr><td className='dt'>{ userName }</td></tr>
                                <tr><td className='hdr'>Serial Numbers of Seats</td></tr>
                                <tr><td className='dt'>{ selectedxd.toString() }</td></tr>
                                <tr><td className='hdr'>Phone Number</td></tr>
                                <tr><td className='dt'>{ phoneNumber1 }</td></tr >
                                <tr><td className='hdr'>E-mail</td></tr>
                                <tr><td className='dt'>{ email }</td></tr >
                                <tr><td className='hdr'>Total Price</td></tr>
                                <tr><td className='dt'>{

                                    selectedxd.filter( x => x.charAt( 0 ) == "A" ).length * 650 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "B" ).length * 650 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "C" ).length * 650 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "D" ).length * 650 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "E" ).length * 650 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "F" ).length * 650 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "G" ).length * 500 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "H" ).length * 500 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "I" ).length * 500 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "J" ).length * 500 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "K" ).length * 500 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "L" ).length * 500 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "M" ).length * 500 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "N" ).length * 500 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "O" ).length * 500 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "P" ).length * 500 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "Q" ).length * 350 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "R" ).length * 350 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "S" ).length * 350 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "T" ).length * 350 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "U" ).length * 350 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "V" ).length * 350 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "W" ).length * 350 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "X" ).length * 350 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "Y" ).length * 350 +
                                    selectedxd.filter( x => x.charAt( 0 ) == "Z" ).length * 350
                                }
                                </td>
                                </tr>

                            </tbody >
                        </table >
                        <button onClick={ () => downloadInvoiceTable() }>Download PDF</button>
                        <hr />
                        <p style={ { color: 'black' } }>
                            <br />
                            please download the PDF version before clicking Done <br />
                            You will recieve a confirmation message on the email provided in the form
                        </p>
                        <button onClick={ () => RELOAD() }>Done</button>
                    </div >
                </span>
            </div>
        </div>
    )
}
