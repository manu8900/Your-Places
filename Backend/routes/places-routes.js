const express = require('express');

const router = express.Router();


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

router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid;//get the pid in Url.eg=> api/places/p1->pid
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })
    if (!place) {
        const error = new Error('could not find place for provided Id!');
        console.log(error);
        error.code=404;
        throw error;
       
    }
    res.json({ place }); //=> equivalent to {place:place} ES6
});

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });
    if (!place) {
        const error = new Error('could not find place for provided userId!');
        error.code=404;
       return next(error); // we have to return this coz throw breaks the code execution while next doesn't.
        
    }
    res.json({ place });
})

module.exports = router;