import { ImageBackground, Pressable, StyleSheet, Text } from 'react-native';
import colors from '../../../styles/colors';

const CategoryPost = ({ name, image }) => {
  return (
    <ImageBackground
      borderRadius={12}
      source={{ uri: image }}
      style={styles.SingleCategory}
    >
      <Text style={styles.categoryName}>{name}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  SingleCategory: {
    width: 142,
    height: 122,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontFamily: 'Asap_400Regular',
    fontWeight: 'bold',
    color: colors.secondaryLight,
  },
});

export default CategoryPost;
