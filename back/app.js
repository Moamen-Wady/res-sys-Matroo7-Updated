const express = require( 'express' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );
const helmet = require( 'helmet' );
const compression = require( 'compression' );
const app = express();
const corsOptions = {
    origin: [ 'http://localhost:3000' ],
    credentials: true,
    optionSuccessStatus: 200
}
app.use( cors( corsOptions ) );
app.use( express.json() );
app.use( helmet() );
app.use( compression() );
app.use( express.urlencoded( { extended: true } ) );
app.use( '/', require( './routes/seatRoute' ) );
app.use( '/', require( './routes/resvRoute' ) );
app.use( '/', require( './routes/xdRoute' ) );

mongoose.connect( "mongodb+srv://moamenwady:121212m@cluster0.iumas.mongodb.net/Mtroo7?retryWrites=true&w=majority" )
    .catch( ( err ) => {
        console.log( err )
    } ).then(
        console.log( 'connected' ),
    )
app.listen( 3005, console.log( "ok" ) )