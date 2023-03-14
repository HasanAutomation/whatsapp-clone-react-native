import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import colors from '../constants/colors';
import commonStyles from '../constants/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { authenticate, setDidTryAutoLogin } from '../store/authSlice';
import { getUserData } from '../utils/actions/userActions';

const StartUpScreen = (props) => {
   const dispatch = useDispatch();

   useEffect(() => {
      const tryLogin = async () => {
         const storedAuthInfo = await AsyncStorage.getItem('userData');

         if (!storedAuthInfo) {
            dispatch(setDidTryAutoLogin());
            return;
         }
         const {
            token,
            userId,
            expiryDate: expiryDateString,
         } = JSON.parse(storedAuthInfo);

         const expiryDate = new Date(expiryDateString);

         if (expiryDate <= new Date() || !token || !userId)
            return dispatch(setDidTryAutoLogin());

         const userData = await getUserData(userId);

         if (!userData) return dispatch(setDidTryAutoLogin());

         dispatch(authenticate({ token, userData }));
      };
      tryLogin();
   }, [dispatch]);

   return (
      <View style={commonStyles.center}>
         <ActivityIndicator size='large' color={colors.primary} />
      </View>
   );
};

export default StartUpScreen;
