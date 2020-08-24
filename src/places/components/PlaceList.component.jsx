import React from 'react';
import PlaceItem from './PlaceItem.component'
import Card from '../../shared/components/UIElements/Card.component';
import Button from '../../shared/components/FormElements/Button.Component'
import './PlaceList.styles.css';
const PLaceList = props => {
    if (props.items.length === 0) {
        return <div className="place-list center">
            <Card>
                <h2>No places found. Maybe create one?</h2>
                <Button to="/places/new">Share Place</Button>
            </Card>
        </div>
    }
    return <ul className="place-list">
        {props.items.map(place =>
            <PlaceItem
                key={place.id}
                id={place.id}
                image={place.image}
                title={place.title}
                description={place.description}
                address={place.address}
                creatorId={place.creator}
                coordinates={place.location}
            />)}
    </ul>
}
export default PLaceList;