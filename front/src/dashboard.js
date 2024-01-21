import React from 'react'
import './proj.css'
import { useState, useEffect } from 'react'
import api from './seats'
import JsPDF from 'jspdf'


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


export default function Dashboard() {
    var [ arr, setArr ] = useState( [] )
    var [ tab, setTab ] = useState( [] )
    var [ selectedxd, setSelectedxd ] = useState( [] );

    //api get seats

    async function getterSeats() {
        await ( api.get( "/seats" ) )
            .then(
                ( res ) => {
                    if ( res.data.status == 'ok' ) {
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
                    if ( res.data.status == 'ok' ) {
                        setTab( res.data.result )
                    }
                    else { alert( res.data.result ) }
                }
            )
            .catch( ( err ) => {
                alert( err.message )
            } )
    }

    useEffect( () => {
        getterSeats()
        getterResvs()
    }, [  ] );


    //api diagram buttons functions
    const yellower = async ( arr ) => {
        await api.put( `/seats/${ arr }`, {
            chairxds: arr,
            color: "yellow"
        } );
        await api.post( `/resvd/${ arr }`, {
            chairxds: arr
        } );
        getterSeats(); RELOAD();
    };

    const greener = async ( arr ) => {
        await api.put( `/seats/${ arr }`, {
            chairxds: arr,
            color: "green"
        } );
        await api.put( `/resvd/${ arr }`, {
            chairxds: arr
        } );
        getterSeats(); RELOAD();
    };

    const reder = async ( arr ) => {
        await api.put( `/seats/${ arr }`, {
            chairxds: arr,
            color: "red"
        } );
        await api.post( `/resvd/${ arr }`, {
            chairxds: arr
        } );
        getterSeats(); RELOAD();
    };


    //api table functions confirm/delete seats
    const confirmSeatsTable = async ( arr ) => {
        await api.put( `/seats/${ arr }`, {
            chairxds: arr,
            color: "red"
        } );
        await api.post( `/resvd/${ arr }`, {
            chairxds: arr
        } );
        getterSeats();
    };
    const deleteSeatsTable = async ( arr ) => {
        await api.put( `/seats/${ arr }`, {
            chairxds: arr,
            color: "green"
        } );
        await api.post( `/resvd/${ arr }`, {
            chairxds: arr
        } );
        await api.put( `/resvd/${ arr }`, {
            chairxds: arr
        } );
        getterSeats();
    };
    const deleteUserTable = async ( x, y ) => {
        console.log( y );
        await api.delete( `/reservations/${ y }` );
        deleteSeatsTable( x );
        getterResvs();
    };

    /*///////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////*/

    //FRONTEND FUNCTIONS

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
    // copy values into table
    async function onCheck( e, xd, item ) {
        if ( e.target.checked ) {
            e.target.checked = true;
            setSelectedxd( [ ...selectedxd, xd ] );
        } else {
            e.target.checked = false;
            setSelectedxd( selectedxd.filter( ( currItem ) => currItem !== xd ) );
        }
    };

    const downloadInvoiceTable = () => {
        const report = new JsPDF( 'portrait', 'pt', 'a1' );
        report.html( document.querySelector( '.Displaytable' ) ).then( () => {
            report.save( 'invoice.pdf' );
        } );
    }
    var zoom = 1;
    function zIn() {
        if ( zoom >= 1.5 ) { zoom = 1.5 };
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
        if ( zoom <= 0.5 ) { zoom = 0.5 }
        if ( 0.5 < zoom < 1.5 ) {
            zoom -= 0.1;
            document.querySelector( '.seatsBlock' ).style.transform = `scale(  ${ zoom } )`;
        }
    };
    return (
        <div className='bgr'>
            <center className='toools'>
                <table style={ { width: "100%", textAlign: "center" } }><tbody>
                </tbody></table>
                <table style={ { textAlign: "center" } }><tbody><tr>
                    <td colSpan={ 5 }><div className='mapped1' style={ { pointerEvents: "none", backgroundColor: "green" } }><img src='/fill.png' alt="" /></div><br />Available</td>
                    <td style={ { visibility: "hidden" } }>....</td>
                    <td colSpan={ 5 }><div className='mapped1' style={ { pointerEvents: "none", backgroundColor: "yellow" } }><img src='/fill.png' alt="" /></div><br />On Hold</td>
                    <td style={ { visibility: "hidden" } }>....</td>
                    <td colSpan={ 5 }><div className='mapped1' style={ { pointerEvents: "none", backgroundColor: "red" } }><img src='/fill.png' alt="" /></div><br />Booked</td>
                </tr></tbody></table>
                <a onClick={ () => zIn() }><i className="fas fa-search-plus"></i></a>
                <a onClick={ () => zOut() }><i className="fas fa-search-minus"></i></a>
                <a onClick={ () => rst() }><i className="fas fa-recycle"></i></a>
            </center>
            <div className='seatStructure'>
                <table className='seatsBlock target'>
                    <tbody>
                        <tr>
                            <td colSpan="101"><div className='screen'>STAGE</div></td>
                        </tr>
                        <tr className='seatVGap' ></tr>
                        <tr>
                            <td>A</td>
                            <td></td>
                            <td></td>
                            {
                                arr.slice( 0, 15 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td>
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 15, 30 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 30, 45 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 60, 75 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 75, 90 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 105, 120 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 120, 135 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 150, 165 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 165, 180 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 195, 210 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 210, 225 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 240, 255 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 255, 270 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                        </tr >
                        <tr className='seatVGap' ><td colSpan={ 56 } ><p style={ { float: "center", fontFamily: 'Times New Roman', color: 'black' } }></p></td></tr>

                        <tr>
                            <td>G</td>
                            <td></td>
                            <td></td>
                            {
                                arr.slice( 270, 285 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 285, 300 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 300, 315 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 330, 345 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 345, 360 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 375, 390 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 390, 405 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 420, 435 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 435, 450 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 465, 480 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 480, 495 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 510, 525 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 525, 540 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 555, 570 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 570, 585 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 600, 615 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 615, 630 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 645, 660 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 660, 675 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 690, 705 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 705, 720 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                        </tr >
                        <tr className='seatVGap' ><td colSpan={ 56 } ><p style={ { float: "center", fontFamily: 'Times New Roman', color: 'black' } }></p></td></tr>

                        <tr>
                            <td>Q</td>
                            <td></td>
                            <td></td>
                            {
                                arr.slice( 720, 735 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 735, 750 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 750, 765 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 780, 795 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 795, 810 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 825, 840 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 840, 855 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 870, 885 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 885, 900 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 915, 930 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 930, 945 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 960, 975 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            <td className='seatGap' colSpan={ 1 }>...</td>
                            {
                                arr.slice( 975, 990 ).map( ( chair ) => {
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === ' green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label></td >
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
                                    return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' ><div className='mapped' style={ { pointerEvents: `${ chair.color }` === 'green' ? 'all' : 'none', backgroundColor: cellColor( chair.color ) } }><p>{ chair.xd }</p></div></label ></td >
                                }
                                )
                            }
                        </tr >
                        <tr className='seatVGap' ><td colSpan={ 56 } ><p style={ { float: "center", fontFamily: 'Times New Roman', color: 'black' } }></p></td></tr>

                    </tbody>
                </table>
            </div>

            <center>
                <button onClick={ () => yellower( selectedxd ) }>Hold (make  yellow)</button>
                <button onClick={ () => greener( selectedxd ) }>Cancel (make green)</button>
                <button onClick={ () => reder( selectedxd ) }>Confirm (make red)</button>
                <br />
                <button onClick={ () => downloadInvoiceTable() }>Download PDF</button>
            </center>
            <div className='displayerBoxes'>
                <table className='Displaytable ivt'>
                    <tbody>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>E-mail</th>
                            <th>Serial Numbers of Seats</th>
                            <th>Options</th>
                        </tr>
                        {
                            tab.map( ( user, index ) => {
                                return <tr user={ user } key={ user.phoneNum1 } >
                                    <td>{ index + 1 }</td>
                                    <td>{ user.userName }</td>
                                    <td>{ user.phoneNum1 }</td>
                                    <td>{ user.email }</td>
                                    <td>{ user.chairxds.toString() }</td>
                                    <td><button onClick={ () => confirmSeatsTable( user.chairxds ) }><p>Confirm chairs</p></button>
                                        <button onClick={ () => deleteUserTable( user.chairxds, index ) }><p>delete user</p></button></td>
                                </tr>
                            }
                            )
                        }
                    </tbody>
                </table></div>
        </div> )
}
