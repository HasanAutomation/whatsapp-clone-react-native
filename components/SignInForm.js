import React from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';
import Input from './Input';
import SubmitButton from './SubmitButton';

const SignInForm = (props) => {
  return (
    <>
      <Input label='Email' iconPack={Feather} icon='mail' />
      <Input label='Password' iconPack={Feather} icon='lock' />
      <SubmitButton
        title='Sign In'
        onPress={() => {}}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignInForm;
