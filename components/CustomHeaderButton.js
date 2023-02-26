import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';
import colors from '../constants/colors';

function CustomHeaderButton(props) {
  return (
    <HeaderButton
      {...props}
      iconSize={23}
      IconComponent={Ionicons}
      color={props.color ?? colors.blue}
    />
  );
}

export default CustomHeaderButton;
