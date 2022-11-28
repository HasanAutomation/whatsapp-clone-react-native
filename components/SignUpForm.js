import React, { useCallback, useReducer } from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';
import Input from './Input';
import SubmitButton from './SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';

const initialState = {
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpForm = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

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
        id='firstName'
        onInputChanged={inputChangeHandler}
        label='First Name'
        iconPack={FontAwesome}
        icon='user-o'
        error={formState.inputValidities['firstName']}
      />
      <Input
        id='lastName'
        onInputChanged={inputChangeHandler}
        label='Last Name'
        iconPack={FontAwesome}
        icon='user-o'
        error={formState.inputValidities['lastName']}
      />
      <Input
        id='email'
        onInputChanged={inputChangeHandler}
        label='Email'
        iconPack={Feather}
        keyboardType='email-address'
        icon='mail'
        autoCapitalize='none'
        error={formState.inputValidities['email']}
      />
      <Input
        secureTextEntry
        id='password'
        onInputChanged={inputChangeHandler}
        label='Password'
        iconPack={Feather}
        icon='lock'
        error={formState.inputValidities['password']}
      />
      <SubmitButton
        title='Sign Up'
        disabled={!formState.formIsValid}
        onPress={() => {}}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignUpForm;
