import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../constants/colors';
import ProfileImage from './ProfileImage';

const DataItem = (props) => {
   const { title, subTitle, image } = props;
   return (
      <TouchableWithoutFeedback>
         <View style={styles.container}>
            <ProfileImage uri={image} size={40} showEdit={false} />
            <View style={styles.textContainer}>
               <Text numberOfLines={1} style={styles.title}>
                  {title}
               </Text>
               <Text numberOfLines={1} style={styles.subtitle}>
                  {subTitle}
               </Text>
            </View>
         </View>
      </TouchableWithoutFeedback>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 7,
      borderBottomWidth: 1,
      borderBottomColor: colors.extraLightGray,
      minHeight: 50,
   },
   textContainer: {
      marginLeft: 10,
   },
   title: {
      fontFamily: 'medium',
      fontSize: 16,
      letterSpacing: 0.3,
   },
   subtitle: {
      fontFamily: 'regular',
      letterSpacing: 0.3,
      color: colors.grey,
   },
});

export default DataItem;
