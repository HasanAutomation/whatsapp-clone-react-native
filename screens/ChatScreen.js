import React, { useState } from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
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
  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
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
          onChangeText={(text) => setMessageText(text)}
        />
        {/* Toggle the camera and send button */}
        {messageText ? (
          <TouchableOpacity style={styles.mediaButton}>
            <Feather name='send' size={24} color={blue} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.mediaButton}>
            <Feather name='camera' size={24} color={blue} />
          </TouchableOpacity>
        )}
      </View>
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
