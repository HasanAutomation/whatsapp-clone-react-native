import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const ChatListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: 'black',
        }}
      >
        Chat List Fuck
      </Text>
      <Button
        title='switch'
        onPress={() => navigation.navigate('ChatScreen')}
      />
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
