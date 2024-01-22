import React from 'react'

export default function ReservationTable({tab, confirmSeatsTable, deleteUserTable}) {
    return (
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
    )
}
