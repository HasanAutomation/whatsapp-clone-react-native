import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome } from '@expo/vector-icons';

import colors from '../constants/colors';
import CustomHeaderButton from '../components/CustomHeaderButton';
import PageContainer from '../components/PageContainer';
import commonStyles from '../constants/commonStyles';
import { searchUsers } from '../utils/actions/userActions';
import DataItem from '../components/DataItem';

const { blue, lighteGrey, extraLightGray } = colors;

const NewChatScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState();
  const [noResultFound, setNoResultFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Close' onPress={handleClose} />
          </HeaderButtons>
        );
      },
      headerTitle: 'New Chat',
    });
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!searchTerm || searchTerm === '') {
        setUsers();
        setNoResultFound(false);
        return;
      }
      setIsLoading(true);

      const usersResult = await searchUsers(searchTerm);
      setUsers(usersResult);

      if (Object.keys(usersResult).length === 0) setNoResultFound(true);
      else setNoResultFound(false);

      // console.log(usersResult);

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  return (
    <PageContainer>
      <View style={styles.searchContainer}>
        <FontAwesome name='search' size={23} color={lighteGrey} />
        <TextInput
          style={styles.searchBox}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      {isLoading && (
        <View style={commonStyles.center}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      )}

      {!isLoading && !noResultFound && users && (
        <FlatList
          data={Object.keys(users)}
          renderItem={(itemData) => {
            const userId = itemData.item;
            const { firstName, lastName, about, profilePicture } =
              users[userId];
            return (
              <DataItem
                title={`${firstName} ${lastName}`}
                subTitle={about}
                image={profilePicture}
              />
            );
          }}
        />
      )}

      {!isLoading && noResultFound && (
        <View style={commonStyles.center}>
          <FontAwesome name='question' size={55} color={lighteGrey} />
          <Text style={styles.noResultText}>No users found</Text>
        </View>
      )}

      {!isLoading && !users && (
        <View style={commonStyles.center}>
          <FontAwesome name='users' size={55} color={lighteGrey} />
          <Text style={styles.noResultText}>
            Enter a name to search for user
          </Text>
        </View>
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: extraLightGray,
    marginVertical: 8,
    height: 40,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
  },
  searchBox: {
    marginLeft: 8,
    fontSize: 15,
    width: '100%',
  },
  noResultText: {
    marginTop: 10,
    fontFamily: 'regular',
    color: colors.textColor,
    letterSpacing: 0.3,
  },
});

export default NewChatScreen;
