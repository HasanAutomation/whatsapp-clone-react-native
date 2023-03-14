import React from 'react';
import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';
import StartUpScreen from '../screens/StartupScreen';

import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

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
