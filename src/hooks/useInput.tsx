import {useState, ChangeEvent, FocusEvent} from 'react';

/* interface inputProps {
    validateValue: <Input>(value: string) => boolean
} */

const useInput = (validateValue: (value: string) => boolean)  => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const valueHasError = !valueIsValid && isTouched;

    const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEnteredValue(e.target.value);
    };

    const valueBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue("");
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError: valueHasError,
        valueChangeHandler,
        valueBlurHandler,
        reset
    };
};

export default useInput;