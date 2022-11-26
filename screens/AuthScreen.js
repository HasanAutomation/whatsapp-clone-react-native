import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageContainer from '../components/PageContainer';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import colors from '../constants/colors';

import logo from '../assets/images/logo.png';

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <PageContainer>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'height' : undefined}
            keyboardVerticalOffset={100}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={logo} />
            </View>

            {isSignUp ? <SignUpForm /> : <SignInForm />}
            <TouchableOpacity
              style={styles.switchContainer}
              onPress={() => setIsSignUp((prev) => !prev)}
            >
              <Text style={styles.switchText}>{`Switch to ${
                isSignUp ? 'Sign In' : 'Sign Up'
              }`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  switchText: {
    color: colors.blue,
    fontFamily: 'medium',
    letterSpacing: 0.3,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '50%',
    resizeMode: 'contain',
  },
});

export default AuthScreen;
