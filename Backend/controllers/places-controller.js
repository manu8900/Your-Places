const HttpError = require('../models/http-error');
const uuid = require('uuid/v4');//v4 creates a unique id with timestamp in it.

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world',
        location: {
            lat: 40.784474,
            lng: -73.9871516
        },
        address: '20 W 34th St,new york,NY 10001',
        creator: 'u1'
    }
]
const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;//get the pid in Url.eg=> api/places/p1->pid
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })
    if (!place) {
        throw new HttpError('Could not find a place for provided user id.', 404);
    }
    res.json({ place }); //=> equivalent to {place:place} ES6
};

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });
    if (!place) {
        return next(
            new HttpError('Could not find a place for provided user id.', 404)
        ); // we have to return this coz throw breaks the code execution while next doesn't.

    }
    res.json({ place });
};
const createPlace = (req,res,next)=>{
const {title,description,coordinates,address,creator} = req.body;
const createdPlace = {
    id: uuid(),
    title,
    description,
    location:coordinates,
    address,
    creator
}

DUMMY_PLACES.push(createdPlace);
res.status(201).json({place:createdPlace}); // status code 201 is returned when we created something new
};


exports.getPlaceById =getPlaceById;//when we have to refrence getPaceById value from the controller
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;