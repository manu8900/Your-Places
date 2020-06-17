import {
    useCallback,
    useReducer
} from 'react';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if(!state.inputs[inputId]){
                    continue;
                }
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
            case 'SET_DATA':
                return{
                    inputs:action.inputs,
                    isValid:action.formIsValid
                }

        default:
            return state;
    }
}

export const useForm = (inititialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: inititialInputs,
        isValid: initialFormValidity
    });
    
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        })
    }, []);//dependency array is empty whenever component rerenders the new function object will not be rerendered & old data would be saved
    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity

        });
    },[]);

    return [formState, inputHandler, setFormData];
};