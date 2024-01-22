import React from 'react'

export default function FinalInvoice( { userName, selectedxd, phoneNumber1, email, downloadInvoiceTable, RELOAD, invoice, invoicer } ) {
    return (
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
        </span> )
}
