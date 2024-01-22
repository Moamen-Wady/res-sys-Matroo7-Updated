import React from 'react'

export default function DisplayerBoxes( { confirm, requestTicket, please, userName, selectedxd, phoneNumber1, email } ) {
    return (
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
        </div> )
}
