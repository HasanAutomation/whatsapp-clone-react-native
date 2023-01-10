import React, { useCallback, useReducer, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../components/Input';
import PageContainer from '../components/PageContainer';
import PageTitle from '../components/PageTitle';
import colors from '../constants/colors';
import SubmitButton from '../components/SubmitButton';
import {
  logoutFunc,
  updateSignedInUserData,
} from '../utils/actions/authActions';
import { updateLoggedInUserData } from '../store/authSlice';
import ProfileImage from '../components/ProfileImage';

const SettingsScreen = (props) => {
  const { userData } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { firstName, lastName, email, userId } = userData;

  const initialState = {
    inputValues: {
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      about: userData?.about || '',
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      console.log('INPUT', inputId, inputValue);

      const validationResult = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult, inputValue });
    },
    [dispatchFormState]
  );

  const saveHandler = async () => {
    const updatedValues = formState.inputValues;
    try {
      setIsLoading(true);
      await updateSignedInUserData(userId, formState.inputValues);
      dispatch(updateLoggedInUserData({ newData: updatedValues }));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = () => {
    dispatch(logoutFunc());
  };

  return (
    <PageContainer>
      <PageTitle text='Settings' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formContainer}
      >
        <ProfileImage
          size={80}
          userId={userData.userId}
          uri={userData?.profilePicture}
        />

        <Input
          id='firstName'
          onInputChanged={inputChangeHandler}
          label='First Name'
          initialValue={firstName}
          iconPack={FontAwesome}
          icon='user-o'
          error={formState.inputValidities['firstName']}
        />
        <Input
          id='lastName'
          onInputChanged={inputChangeHandler}
          label='Last Name'
          iconPack={FontAwesome}
          initialValue={lastName}
          icon='user-o'
          error={formState.inputValidities['lastName']}
        />
        <Input
          id='email'
          onInputChanged={inputChangeHandler}
          label='Email'
          initialValue={email}
          iconPack={Feather}
          keyboardType='email-address'
          icon='mail'
          autoCapitalize='none'
          error={formState.inputValidities['email']}
        />
        <Input
          id='about'
          onInputChanged={inputChangeHandler}
          label='About'
          iconPack={FontAwesome}
          initialValue={userData.about}
          icon='user-o'
          error={formState.inputValidities['about']}
        />
        {showSuccess && <Text>Saved!</Text>}

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
            title='Save'
            disabled={!formState.formIsValid}
            onPress={saveHandler}
            style={{ marginTop: 20 }}
          />
        )}

        <SubmitButton
          title='Logout'
          onPress={logoutHandler}
          style={{ marginTop: 20 }}
          color={colors.red}
        />
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    alignItems: 'center',
  },
});

export default SettingsScreen;
