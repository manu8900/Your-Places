import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input.component';
import Button from '../../shared/components/FormElements/Button.Component';
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH } from '../../shared/util/Validators.js';
import './PlaceForm.styles.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the famous sky scrapers in the world',
        imageUrl: 'https://untappedcities.com/wp-content/uploads/2015/07/Flatiron-Building-Secrets-Roof-Basement-Elevator-Sonny-Atis-GFP-NYC_5.jpg',
        address: ' 20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.748817,
            lng: -73.985428
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
            lat: 40.748817,
            lng: -73.985428
        },
        creator: 'u2'
    }
]
const UpdatePlace = () => {
    const placeId = useParams.placeId;
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
        console.log(identifiedPlace);
    if (!identifiedPlace) {
        return <div className="center">
            <h2>Could not find place</h2>
        </div>
    }
    return (
        <form>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={() => { }}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input
                id="title"
                element="textarea"
                type="text"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min 5 characters)."
                onInput={() => { }}
                value={identifiedPlace.title}
                valid={true}
            />
            <Button type="submit" disabled={true}>UPDATE PLACE</Button>
        </form>
    )
}

export default UpdatePlace;