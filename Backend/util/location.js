const axios = require('axios');

const HttpError = require('../models/http-error');
/* Map Box API Key */
const API_KEY = 'pk.eyJ1IjoibWFudTg5MDAiLCJhIjoiY2thZmZmOXZjMDJ3ZzJxbnY5OTQ5Y3BmNSJ9.crGo_MrcddFuDpe1n2_Qmg';

async function getCoordsForAddress(address) {
    const searchText =encodeURIComponent(address);
    const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json/?access_token=${API_KEY}`
    );

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS' || data.length === 0) {
        const error = new HttpError(
            'Could not find location for specified address ', 422
        );
        throw error;
    }
    const [lng,lat] = data.features[0].center;
    
    return {lng,lat};
}

module.exports = getCoordsForAddress;