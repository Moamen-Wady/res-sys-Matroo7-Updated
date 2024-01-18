import React from 'react'
import './proj.css'
import { useState, useEffect } from 'react'
import JsPDF from 'jspdf'
import api from "./seats";

const getterz = async () => {
    const respon = await api.get( "/seats" );
    return respon.data;
};

const RELOAD = () => {
    return new Promise( () => {
        setTimeout( () => {
            window.location.reload();
        }, 500 );
    } )
};

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

export default function ProjX() {
    //api get seats
    var [ zzzarr, setzzzArr ] = useState( [] );
    var [ arr, setArr ] = useState( [] );
    var [ notification, setNotification ] = useState( <></> );

    useEffect( () => {
        // var i
        // var zzz = []
        // for ( i = 1; i < 31; i++ ) {
        //     var curr = {
        //         'xd': `Z` + i.toString(),
        //         'color': 'green'
        //     }
        //     zzz = [ ...zzz, curr ]

        //     console.log( zzz )
        // }
        getterz().then( ( x ) => {
            setArr( x[ 0 ].seats )
            console.log( x[ 0 ].seats )
        } );
    }, [ notification ] );

    const throwInvoice = () => {
        setInvoice( false );
    }

    //api update/request seats
    const xdUpdater = async () => {
        setPlease( "Please Wait, Checking the seats" );
        var res = ( await api.post( `/resvd/`, {
            chairxds: selectedxd
        } ) ).data;
        if ( res.check == false ) {
            alert( 'SOME OR ALL SEATS YOU HAVE SELECTED HAD JUST BEEN TAKEN BY ANOTHER USER, THE PAGE WILL RELOAD NOW ' );
            RELOAD();
        };
        if ( res.check == true ) { seatsUpdater(); };
    }

    const seatsUpdater = async () => {
        await api.put( `/seats/${ selectedxd }`, {
            chairxds: selectedxd,
            color: "yellow"
        } );
        await api.post( `/resvd/${ selectedxd }`, {
            chairxds: selectedxd
        } );
        tableUpdater();
        throwInvoice();
    };

    const final = () => {
        RELOAD();
    };

    const tableUpdater = async () => {
        await api.post( `/reservations/`, {
            "userName": userName,
            "email": email,
            "chairxds": selectedxd,
            "phoneNum1": phoneNumber1,
        }
        );
    };

    //functions of frontend
    var [ userName, setUserName ] = useState()
    var [ email, setEmail ] = useState()
    var [ numSeats, setNumSeats ] = useState( 1 )
    var [ phoneNumber1, setPhoneNumber1 ] = useState()
    var [ confirm, setConfirm ] = useState( true )
    var [ invoice, setInvoice ] = useState( true )
    var [ selected, setSelected ] = useState( [] );
    var [ selectedxd, setSelectedxd ] = useState( [] );
    var [ please, setPlease ] = useState( "" );
    function cellColor( color ) {
        switch ( color ) {
            case 'green':
                return 'green';
            case 'yellow':
                return 'yellow';
            case 'red':
                return 'red';
            default:
                return '';
        }
    };
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
    //first button
    function form() {
        if ( numSeats > 0 ) {
            setNotification( <p>Please Select The Seats Now And Submit <br /><br /> Use The Tools To Zoom & Scroll In All Directions To See All Chairs</p> )
            setConfirm( false )
        }
        else {
            alert( "Please choose A valid number of seats" )
        }
    }

    function taker() {
        if ( userName == null || numSeats == null || phoneNumber1 == null || email == null ) {
            alert( "PLEASE FILL ALL FIELDS IN THE FORM ABOVE " );
        }
        else {
            form();
        }
    };

    // copy Seats ids into table
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

    const requestTicket = () => {
        if ( selectedxd.length == numSeats ) {
            xdUpdater();
        }
        else {
            alert( `please choose ${ numSeats } chair` );
            setConfirm( false );
        }
    };

    const downloadInvoiceTable = () => {
        const report = new JsPDF( 'portrait', 'pt', 'a3' );
        report.html( document.querySelector( '.Displaytable' ) ).then( () => {
            report.save( 'invoice.pdf' );
        } );
    }


    var zoom = 0.85;
    function zIn() {
        if ( zoom >= 1.55 ) { zoom = 1.55 };
        if ( 0.5 < zoom < 1.5 ) {
            zoom += 0.1;
            document.querySelector( '.seatsBlock' ).style.transform = `scale(  ${ zoom } )`;
        }
    };
    function rst() {
        zoom = 0.85;
        document.querySelector( '.seatsBlock' ).style.transform = `scale(  ${ zoom } )`;
    };
    function zOut() {
        if ( zoom <= 0.55 ) { zoom = 0.55 }
        if ( 0.5 < zoom < 1.5 ) {
            zoom -= 0.1;
            document.querySelector( '.seatsBlock' ).style.transform = `scale(  ${ zoom } )`;
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
                <center className='toools'>
                    <table style={ { width: "100%", textAlign: "center" } }><tbody>
                    </tbody></table>
                    <table style={ { textAlign: "center" } }><tbody><tr>
                        <td colSpan={ 5 }><div className='mapped1' style={ { pointerEvents: "none", backgroundColor: "green" } }><img src='/fill.png' alt="" /></div><br />Available</td>
                        <td style={ { visibility: "hidden" } }>....</td>
                        <td colSpan={ 5 }><div className='mapped1' style={ { pointerEvents: "none", backgroundColor: "yellow" } }><img src='/fill.png' alt="" /></div><br />On Hold</td>
                        <td style={ { visibility: "hidden" } }>....</td>
                        <td colSpan={ 5 }><div className='mapped1' style={ { pointerEvents: "none", backgroundColor: "red" } }><img src='/fill.png' alt="" /></div><br />Booked</td>
                    </tr ></tbody ></table >
                    <div className='tools'>
                        <a onClick={ () => zIn() }><i className="fas fa-search-plus"></i></a>
                        <a onClick={ () => zOut() }><i className="fas fa-search-minus"></i></a>
                        <a onClick={ () => rst() }><i className="fas fa-recycle"></i></a>
                    </div>
                </center>
                <div className='seatStructure'>
                    <table className='seatsBlock target'>
                        <tbody>
                            <tr>
                                <td colSpan="101"><div className='screen'>STAGE</div></td>
                            </tr>
                            <tr>
                                <td colSpan="101"><div className='screen2'>Area A </div></td>
                            </tr>

                            <tr className='seatVGap' ></tr>
                            <tr>
                                <td>A</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 0, 15 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td>
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 15, 30 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 30, 45 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>B</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 45, 60 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 60, 75 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 75, 90 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>C</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 90, 105 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 105, 120 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 120, 135 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>D</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 135, 150 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 150, 165 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 165, 180 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>E</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 180, 195 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 195, 210 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 210, 225 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>F</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 225, 240 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 240, 255 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 255, 270 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr className='seatVGap' ><td colSpan={ 56 } ><p style={ { float: "center", fontFamily: 'Times New Roman', color: 'black' } }></p></td></tr>
                            <tr>
                                <td colSpan="101"><div className='screen2'>Area B </div></td>
                            </tr>

                            <tr>
                                <td>G</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 270, 285 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 285, 300 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 300, 315 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>H</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 315, 330 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 330, 345 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 345, 360 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>I</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 360, 375 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 375, 390 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 390, 405 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>J</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 405, 420 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 420, 435 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 435, 450 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>K</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 450, 465 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 465, 480 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 480, 495 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>L</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 495, 510 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 510, 525 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 525, 540 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>M</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 540, 555 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 555, 570 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 570, 585 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>N</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 585, 600 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 600, 615 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 615, 630 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>O</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 630, 645 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 645, 660 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 660, 675 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>P</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 675, 690 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 690, 705 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 705, 720 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr className='seatVGap' ><td colSpan={ 56 } ><p style={ { float: "center", fontFamily: 'Times New Roman', color: 'black' } }></p></td></tr>
                            <tr>
                                <td colSpan="101"><div className='screen2'>Area C </div></td>
                            </tr>

                            <tr>
                                <td>Q</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 720, 735 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 735, 750 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 750, 765 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>R</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 765, 780 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 780, 795 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 795, 810 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>S</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 810, 825 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 825, 840 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 840, 855 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>T</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 855, 870 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 870, 885 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 885, 900 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>U</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 900, 915 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 915, 930 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 930, 945 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>V</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 945, 960 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 960, 975 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 975, 990 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>W</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 990, 1005 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>

                                {
                                    arr.slice( 1005, 1020 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>X</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 1020, 1035 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 1035, 1050 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>Y</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 1050, 1065 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 1065, 1080 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr>
                                <td>Z</td>
                                <td></td>
                                <td></td>
                                {
                                    arr.slice( 1080, 1095 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                <td className='seatGap' colSpan={ 1 }>...</td>
                                {
                                    arr.slice( 1095, 1110 ).map( ( chair ) => {
                                        return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none' } }><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                    }
                                    )
                                }
                            </tr >
                            <tr className='seatVGap' ><td colSpan={ 56 } ><p style={ { float: "center", fontFamily: 'Times New Roman', color: 'black' } }></p></td></tr>

                        </tbody>
                    </table>
                </div>
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
                        <button onClick={ () => final() }>Done</button>
                    </div >
                </span>
            </div>
        </div>
    )
}
