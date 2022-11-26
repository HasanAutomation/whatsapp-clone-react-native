import React from 'react';
import { StyleSheet, View } from 'react-native';

const PageContainer = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </View>
  );
};

export default PageContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
});
