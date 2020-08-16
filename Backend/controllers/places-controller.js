const HttpError = require('../models/http-error');
const uuid = require('uuid/v4');//v4 creates a unique id with timestamp in it.

let DUMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });
    if (!places || places.length === 0) {
        return next(
            new HttpError('Could not find places for provided user id.', 404)
        ); // we have to return this coz throw breaks the code execution while next doesn't.

    }
    res.json({ place });
};
const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace);
    /* status code 201 is returned when we created something new. */
    res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
    const { title, description } = req.body;
    const placeId = req.params.pid;
    /* By Using spread opertator we have created a copy of Dummy places
     & by this we will make changes on to the copy not the original array.*/
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;
    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({ place: updatedPlace });
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({ message: 'Deleted place' })
}


/* We use this below syntax when we have to use reference of 
         these functions in other components/files .*/
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;