import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceLIst from '../components/PlaceList.component';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the famous sky scrapers in the world',
        imageUrl: 'https://untappedcities.com/wp-content/uploads/2015/07/Flatiron-Building-Secrets-Roof-Basement-Elevator-Sonny-Atis-GFP-NYC_5.jpg',
        address: ' 20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            long: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the famous sky scrapers in the world',
        imageUrl: 'https://untappedcities.com/wp-content/uploads/2015/07/Flatiron-Building-Secrets-Roof-Basement-Elevator-Sonny-Atis-GFP-NYC_5.jpg',
        address: ' 20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            long: -73.9878584
        },
        creator: 'u2'
    }
]
const UserPlaces = () => {
    const userId = useParams().userId;
    const loading = DUMMY_PLACES.filter(place => place.creator === userId)

    return <PlaceLIst items={loading} />
}

export default UserPlaces;