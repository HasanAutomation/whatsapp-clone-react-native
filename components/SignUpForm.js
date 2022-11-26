import React from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';
import Input from './Input';
import SubmitButton from './SubmitButton';

const SignUpForm = (props) => {
  return (
    <>
      <Input label='First Name' iconPack={FontAwesome} icon='user-o' />
      <Input label='Last Name' iconPack={FontAwesome} icon='user-o' />
      <Input label='Email' iconPack={Feather} icon='mail' />
      <Input label='Password' iconPack={Feather} icon='lock' />
      <SubmitButton
        title='Sign Up'
        onPress={() => {}}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignUpForm;
