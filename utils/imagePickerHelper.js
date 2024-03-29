import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from 'firebase/storage';
import { getFirebaseApp } from './firebaseHelper';
export const launchImagePicker = async () => {
   await checkMediaPermissions();
   const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [1, 1],
      allowsEditing: true,
   });

   if (!result.canceled) {
      return result.assets[0]?.uri;
   }
};

export const uploadImageAsync = async (uri) => {
   const app = getFirebaseApp();
   const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
         resolve(xhr.response);
      };
      xhr.onerror = function (err) {
         console.log(err);
         reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send();
   });
   const pathFolder = 'profilePics';
   const storageRef = ref(
      getStorage(app),
      `${pathFolder}/${Math.trunc(Math.random() * 100000)}`
   );

   await uploadBytesResumable(storageRef, blob);
   blob.close();
   return await getDownloadURL(storageRef);
};

export const checkMediaPermissions = async () => {
   if (Platform.OS !== 'web') {
      const permissionResult =
         await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false)
         return Promise.reject('We need permission to access your photos');
   }
   return Promise.resolve();
};
