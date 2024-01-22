import React from 'react'

export default function Tools() {

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
    )
}
