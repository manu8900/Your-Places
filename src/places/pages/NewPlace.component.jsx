import React from 'react';
import Input from '../../shared/components/FormElements/Input.component';
import './NewPlace.styles.css';

const NewPlace = () =>{
    return <form  className="place-form">
        <Input 
        element="input" 
        type="text" 
        label="Title" 
        validators={[]} 
        errorText="Please Enter a valid Title"/>
    </form>
}

export default NewPlace;