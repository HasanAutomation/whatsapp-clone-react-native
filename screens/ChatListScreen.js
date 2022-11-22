import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const ChatListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Chat List Screenlorem20jhjhjhjhjhjhbjhb</Text>
      <Button title='switch' onPress={() => navigation.navigate('Setting')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatListScreen;
