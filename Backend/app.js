const express = require('express');
//To parse body of incoming request
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');


const app = express();

/* Middleware using the body parser should be created first then the 
                middleware using routes. */

app.use(bodyParser.json());

/* <---------------------------------------------------------------> */
/* Middleware to resolve CORS(Cross Origin Resource Sharing) Error.  */

app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin',
        '*' // You can use a particular domain instead of *
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PATCH,DELETE'
    );
    next(); //Allows execute rest of the middlewares
});

/* <---------------------------------------------------------------> */


/* /api/places/- enables us to access routes of places-routes. */
app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

/*this middleware shows error when we try to get a wrong route.*/
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
});


/* this middleware function express will apply on all request
                that has an error parameter. */
app.use((error, req, res, next) => {
    /* headerSent property checks if any response is already sent. */
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured!' })

});


/*Mongoose connect is async. & returns a promise if the conn. 
  is established ie. why we used  then & catch method */

mongoose
    .connect(
        'mongodb+srv://manu:PLpsQIncNz4Ba3e7@cluster0.rnk84.mongodb.net/mern?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        app.listen(5000);//port
    })
    .catch(err => {
        console.log(err);
    })
