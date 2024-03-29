import 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store/store';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AppNavigator from './navigation/AppNavigator';

LogBox.ignoreAllLogs(true);
// AsyncStorage.clear();

SplashScreen.preventAutoHideAsync();

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
      <Provider store={store}>
         <SafeAreaProvider style={styles.container} onLayout={onLayout}>
            <AppNavigator />
         </SafeAreaProvider>
      </Provider>
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
