import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import colors from '../constants/colors';

const Input = ({
  label,
  id,
  iconPack: Icon,
  icon,
  iconSize = 24,
  error,
  onInputChanged,
  iconColor = 'black',
  initialValue,
  ...props
}) => {
  const [val, setVal] = useState(initialValue);
  const onChangeText = (text) => {
    setVal(text);
    onInputChanged(id, text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && (
          <Icon
            name={icon}
            size={iconSize}
            color={iconColor}
            style={styles.icon}
          />
        )}
        <TextInput
          {...props}
          value={val}
          onChangeText={onChangeText}
          style={styles.input}
        />
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error[0]}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  errorContainer: {
    marginVertical: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontFamily: 'regular',
    letterSpacing: 0.3,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: colors.nearlyWhite,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginVertical: 8,
    fontFamily: 'bold',
    letterSpacing: 0.3,
    color: colors.textColor,
  },
  icon: {
    marginRight: 8,
    color: colors.grey,
  },
  input: {
    flex: 1,
    color: colors.textColor,
    fontFamily: 'regular',
    letterSpacing: 0.3,
    paddingTop: 0,
  },
});
