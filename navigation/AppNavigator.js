import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';
import { useSelector } from 'react-redux';
import StartUpScreen from '../screens/StartupScreen';

const AppNavigator = () => {
  const isAuth = useSelector((state) => state.auth.token != null);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth ? (
        <MainNavigator />
      ) : didTryAutoLogin ? (
        <AuthScreen />
      ) : (
        <StartUpScreen />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
