import {
   ActivityIndicator,
   Image,
   Platform,
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../constants/colors';
import userImage from '../assets/images/userImage.jpeg';
import {
   launchImagePicker,
   uploadImageAsync,
} from '../utils/imagePickerHelper';
import { useState } from 'react';
import { updateSignedInUserData } from '../utils/actions/authActions';
import { useDispatch } from 'react-redux';
import { updateLoggedInUserData } from '../store/authSlice';

const ProfileImage = (props) => {
   const [isUploading, setIsUploading] = useState(false);
   const dispatch = useDispatch();
   const source = props?.uri ? { uri: props.uri } : userImage;
   const userId = props.userId;

   const [image, setImage] = useState(source);

   const showEdit = props.showEdit ?? true;

   const pickImage = async () => {
      try {
         const tempUri = await launchImagePicker();
         if (!tempUri) return;
         setIsUploading(true);
         const uploadedUri = await uploadImageAsync(tempUri);

         if (!uploadedUri) throw new Error('Could not upload');
         const newData = { profilePicture: uploadedUri };
         await updateSignedInUserData(userId, newData);
         dispatch(updateLoggedInUserData({ newData }));
         setImage({ uri: uploadedUri });
      } catch (err) {
         alert(err.message);
      } finally {
         setIsUploading(false);
      }
   };

   const Container = showEdit ? TouchableOpacity : View;

   return (
      <Container onPress={pickImage}>
         {isUploading ? (
            <View
               height={props.size}
               width={props.size}
               style={styles.loadingContainer}
            >
               <ActivityIndicator size='small' color={colors.primary} />
            </View>
         ) : (
            <Image
               style={{
                  ...styles.image,
                  ...{ width: props.size, height: props.size },
               }}
               source={image}
            />
         )}
         {showEdit && !isUploading && (
            <View style={styles.editIconContainer}>
               <FontAwesome name='pencil' size={15} />
            </View>
         )}
      </Container>
   );
};

const styles = StyleSheet.create({
   image: {
      borderWidth: 1,
      borderColor: colors.grey,
      borderRadius: Platform.OS === 'ios' ? '50%' : 40,
   },
   editIconContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.lighteGrey,
      borderRadius: 20,
      padding: 8,
   },
   loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export default ProfileImage;
