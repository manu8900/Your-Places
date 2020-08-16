const express = require('express');
const HttpError = require('../models/http-error');
const placesControllers = require('../controllers/places-controller');
/* Express validator is used for validating the request body & is 
imported using object destructuring coz we want to use only check
method of express validaor here. */
const { check } = require('express-validator');


const router = express.Router();

router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);
/* We can use multiple middleware & group it in an array like done 
below & using check method of express validator we are validating 
createPlace's body we are sending as request.*/
router.post(
    '/',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty()
    ],
    placesControllers.createPlace)

router.patch(
    '/:pid',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 })
    ],
    placesControllers.updatePlace); //to Update & if it was get instead of patch it would have created a conflict.

router.delete('/:pid', placesControllers.deletePlace);



module.exports = router;