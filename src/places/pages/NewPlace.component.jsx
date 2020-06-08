import React, {
    useCallback,
    useReducer
} from 'react';
import Input from '../../shared/components/FormElements/Input.component';
import Button from '../../shared/components/FormElements/Button.Component'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/Validators.js'
import './PlaceForm.styles.css';


const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            }

        default:
            return state;
    }
}
const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
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
        },
        isValid: false
    })

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        })
    }, []);//dependency array is empty whenever component rerenders the new function object will not be rerendered & old data would be saved

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