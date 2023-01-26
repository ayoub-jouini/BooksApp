import { ImageBackground, Pressable, StyleSheet, Text } from 'react-native';
import colors from '../../../styles/colors';

const CategoryPost = ({ name, image }) => {
  return (
    <Pressable>
      <ImageBackground
        borderRadius={12}
        source={image}
        style={styles.SingleCategory}
      >
        <Text style={styles.categoryName}>{name}</Text>
      </ImageBackground>
    </Pressable>
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
