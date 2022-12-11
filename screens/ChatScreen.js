import React, { useCallback, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import imageBackground from '../assets/images/droplet.jpeg';
import colors from '../constants/colors';

const { blue, lighteGrey } = colors;

const ChatScreen = ({ navigation }) => {
  const [messageText, setMessageText] = useState('');

  const sendMessage = useCallback(() => {
    setMessageText('');
  }, [messageText]);

  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <ImageBackground
          style={styles.imageBackground}
          source={imageBackground}
        ></ImageBackground>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.mediaButton}>
            <Feather name='plus' size={24} color={blue} />
          </TouchableOpacity>
          <TextInput
            style={styles.textBox}
            value={messageText}
            onSubmitEditing={sendMessage}
            onChangeText={(text) => setMessageText(text)}
          />
          {/* Toggle the camera and send button */}
          {messageText ? (
            <TouchableOpacity
              onPress={sendMessage}
              style={{ ...styles.mediaButton, ...styles.sendButton }}
            >
              <Feather name='send' size={20} color={'white'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.mediaButton}>
              <Feather name='camera' size={24} color={blue} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  imageBackground: {
    flex: 1,
  },
  mediaButton: {
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  screen: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: blue,
    borderRadius: 50,
  },
  textBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 15,
    paddingHorizontal: 12,
    borderColor: lighteGrey,
  },
});

export default ChatScreen;
