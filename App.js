import 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChatListScreen from './screens/ChatListScreen';
import ChatSettingsScreen from './screens/ChatSettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: '',
      }}
    >
      <Tab.Screen
        name='ChatList'
        component={ChatListScreen}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='chatbubble-outline' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='ChatSettings'
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings-outline' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require('./assets/fonts//Roboto-Black.ttf'),
          blackItalic: require('./assets/fonts/Roboto-BlackItalic.ttf'),
          bold: require('./assets/fonts/Roboto-Bold.ttf'),
          boldItalic: require('./assets/fonts/Roboto-BoldItalic.ttf'),
          italic: require('./assets/fonts/Roboto-Italic.ttf'),
          light: require('./assets/fonts/Roboto-Light.ttf'),
          lightItalic: require('./assets/fonts/Roboto-LightItalic.ttf'),
          medium: require('./assets/fonts/Roboto-Medium.ttf'),
          mediumItalic: require('./assets/fonts/Roboto-MediumItalic.ttf'),
          regular: require('./assets/fonts/Roboto-Regular.ttf'),
          thin: require('./assets/fonts/Roboto-Thin.ttf'),
          thinItalic: require('./assets/fonts/Roboto-ThinItalic.ttf'),
        });
      } catch (err) {
        console.log(err);
      } finally {
        setAppLoaded(true);
      }
    };
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appLoaded) await SplashScreen.hideAsync();
  }, [appLoaded]);

  if (!appLoaded) return null;

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayout}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name='Setting' component={ChatSettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  txt: {
    color: 'red',
    fontFamily: 'black',
    fontSize: 25,
  },
});
