import React, { useCallback, useReducer } from 'react';
import { Feather } from '@expo/vector-icons';
import Input from './Input';
import SubmitButton from './SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';

const initialState = {
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignInForm = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  console.log(formState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const validationResult = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult });
    },
    [dispatchFormState]
  );

  return (
    <>
      <Input
        id='email'
        onInputChanged={inputChangeHandler}
        label='Email'
        iconPack={Feather}
        autoCapitalize='none'
        icon='mail'
        error={formState.inputValidities['email']}
      />
      <Input
        id='password'
        onInputChanged={inputChangeHandler}
        label='Password'
        iconPack={Feather}
        secureTextEntry
        icon='lock'
        error={formState.inputValidities['password']}
      />
      <SubmitButton
        disabled={!formState.formIsValid}
        title='Sign In'
        onPress={() => {}}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignInForm;
