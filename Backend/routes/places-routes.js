const express = require('express');
const HttpError = require('../models/http-error');
const placesControllers = require('../controllers/places-controller');



const router = express.Router();

router.get('/:pid',placesControllers.getPlaceById );

router.get('/user/:uid',placesControllers.getPlacesByUserId);

router.post('/',placesControllers.createPlace)

router.patch('/:pid',placesControllers.updatePlace); //to Update & if it was get instead of patch it would have created a conflict.

router.delete('/:pid',placesControllers.deletePlace);



module.exports = router;