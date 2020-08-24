import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input.component';
import Button from '../../shared/components/FormElements/Button.Component';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.component';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.component';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/Validators.js'
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.styles.css';



const NewPlace = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm({
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
const history = useHistory();


    const placeSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                'http://localhost:5000/api/places',
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: auth.userId
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            history.push('/');
        } catch (err) { }

    }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
            { 
                isLoading && <LoadingSpinner asOverlay/>
            }
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

        </React.Fragment>
    )
}

export default NewPlace;