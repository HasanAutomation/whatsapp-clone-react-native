import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../constants/colors';
import { launchImagePicker } from '../utils/imagePickerHelper';

const ProfileImage = (props) => {
  const pickImage = () => {
    launchImagePicker();
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image
        style={{
          ...styles.image,
          ...{ width: props.size, height: props.size },
        }}
        source={require('../assets/images/userImage.jpeg')}
      />
      <View style={styles.editIconContainer}>
        <FontAwesome name='pencil' size={15} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: '50%',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.lighteGrey,
    borderRadius: 20,
    padding: 8,
  },
});

export default ProfileImage;
