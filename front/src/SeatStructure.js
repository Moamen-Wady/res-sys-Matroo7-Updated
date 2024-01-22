import React from 'react'

export default function SeatStructure( { arr, onCheck, SeatStructureEvents, USERPANEL } ) {
    return (

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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td>
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 15, 30 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 30, 45 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 60, 75 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 75, 90 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 105, 120 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 120, 135 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 150, 165 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 165, 180 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 195, 210 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 210, 225 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 240, 255 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 255, 270 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 285, 300 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 300, 315 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 330, 345 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 345, 360 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 375, 390 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 390, 405 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 420, 435 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 435, 450 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 465, 480 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 480, 495 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 510, 525 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 525, 540 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 555, 570 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 570, 585 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 600, 615 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 615, 630 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 645, 660 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 660, 675 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 690, 705 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 705, 720 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 735, 750 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 750, 765 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 780, 795 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 795, 810 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 825, 840 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 840, 855 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 870, 885 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 885, 900 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 915, 930 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 930, 945 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 960, 975 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        <td className='seatGap' colSpan={ 1 }>...</td>
                        {
                            arr.slice( 975, 990 ).map( ( chair ) => {
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
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
                                return <td chair={ chair } key={ chair.xd }><input type="checkbox" onChange={ ( e ) => onCheck( e, chair.xd, chair ) } className='seats' value={ chair.xd } id={ chair.xd } /><label htmlFor={ chair.xd } className='lbl' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ) } }><div className='mapped' style={ { pointerEvents: SeatStructureEvents( USERPANEL, chair.color ), backgroundColor: chair.color } }><p>{ chair.xd }</p></div></label></td >
                            }
                            )
                        }
                    </tr >
                    <tr className='seatVGap' ><td colSpan={ 56 } ><p style={ { float: "center", fontFamily: 'Times New Roman', color: 'black' } }></p></td></tr>
                </tbody>
            </table>
        </div>
    )
}
