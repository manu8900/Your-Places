const express = require('express');
//To parse body of incoming request
const bodyParser = require('body-parser') 
const placesRoutes = require('./routes/places-routes')

const app = express();

//app.use is used to register middleware & we use this to register routes of place-routes.js as middleware.
app.use('/api/places',placesRoutes); ///api/places/- enables us to access routes of places-routes.

app.use((error,req,res,next)=>{
    if(res.headerSent){//headerSent property checks if any response is already sent.
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || 'An unknown error occured!'})

}); //this middleware function express will apply on all request that has an error parameter


app.listen(5000);//port