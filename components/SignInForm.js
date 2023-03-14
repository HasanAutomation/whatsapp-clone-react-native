import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Input from './Input';
import SubmitButton from './SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signIn } from '../utils/actions/authActions';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, Alert } from 'react-native';
import colors from '../constants/colors';

const initialState = {
   inputValues: {
      email: '',
      password: '',
   },
   inputValidities: {
      email: false,
      password: false,
   },
   formIsValid: false,
};

const SignInForm = (props) => {
   const [formState, dispatchFormState] = useReducer(reducer, initialState);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');
   const dispatch = useDispatch();

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
         await dispatch(signIn(formState.inputValues));
         setError('');
      } catch (error) {
         setIsLoading(false);
         setError(error.message);
      }
   }, [dispatch, formState.inputValues]);

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
               title='Sign In'
               disabled={!formState.formIsValid}
               onPress={authHandler}
               style={{ marginTop: 20 }}
            />
         )}
      </>
   );
};

export default SignInForm;
