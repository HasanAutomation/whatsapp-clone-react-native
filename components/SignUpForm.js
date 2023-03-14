import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';
import Input from './Input';
import SubmitButton from './SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signUp } from '../utils/actions/authActions';
import { ActivityIndicator, Alert } from 'react-native';
import colors from '../constants/colors';
import { useDispatch } from 'react-redux';

const isTestMode = false;

const input = isTestMode
   ? {
        firstName: 'Hasan',
        lastName: 'Ali',
        email: `test${Date.now()}@gmail.com`,
        password: '123456',
     }
   : { firstName: '', lastName: '', email: '', password: '' };

const initialState = {
   inputValues: input,
   inputValidities: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
   },
   formIsValid: isTestMode,
};

const SignUpForm = (props) => {
   const dispatch = useDispatch();
   const [formState, dispatchFormState] = useReducer(reducer, initialState);
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const inputChangeHandler = useCallback(
      (inputId, inputValue) => {
         const validationResult = validateInput(inputId, inputValue);
         dispatchFormState({ inputId, validationResult, inputValue });
      },
      [dispatchFormState]
   );

   useEffect(() => {
      if (error) {
         Alert.alert('An error ocurred', error);
         setError('');
      }
   }, [error]);

   const authHandler = useCallback(async () => {
      try {
         setIsLoading(true);
         await dispatch(signUp(formState.inputValues));
         setError('');
      } catch (error) {
         setIsLoading(false);
         setError(error.message);
      }
   }, [dispatch, formState.inputValues]);

   return (
      <>
         <Input
            id='firstName'
            onInputChanged={inputChangeHandler}
            label='First Name'
            initialValue={formState.inputValues.firstName}
            iconPack={FontAwesome}
            icon='user-o'
            error={formState.inputValidities['firstName']}
         />
         <Input
            id='lastName'
            onInputChanged={inputChangeHandler}
            label='Last Name'
            iconPack={FontAwesome}
            initialValue={formState.inputValues.lastName}
            icon='user-o'
            error={formState.inputValidities['lastName']}
         />
         <Input
            id='email'
            onInputChanged={inputChangeHandler}
            label='Email'
            initialValue={formState.inputValues.email}
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
            initialValue={formState.inputValues.password}
            label='Password'
            iconPack={Feather}
            icon='lock'
            error={formState.inputValidities['password']}
         />
         {isLoading ? (
            <ActivityIndicator
               size='small'
               color={colors.primary}
               style={{
                  marginTop: 10,
               }}
            />
         ) : (
            <SubmitButton
               title='Sign Up'
               disabled={!formState.formIsValid}
               onPress={authHandler}
               style={{ marginTop: 20 }}
            />
         )}
      </>
   );
};

export default SignUpForm;
