import React from 'react';
import Input from '../../shared/components/FormElements/Input.component';
import Button from '../../shared/components/FormElements/Button.Component'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/Validators.js'
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.styles.css';



const NewPlace = () => {
   const[formState,inputHandler]= useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    })

    

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);

    }
    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please Enter a valid Title"
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                type="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please Enter a valid Description (at least 5 characters)"
                onInput={inputHandler}
            />
            <Input
                id="address"
                element="input"
                type="text"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please Enter a valid Address"
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
        </form>
    )
}

export default NewPlace;