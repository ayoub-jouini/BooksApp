import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';

const BookPost = ({
  id,
  image,
  category,
  name,
  author,
  price,
  rate,
  handleOpenBook,
}) => {
  const emptyStarsNumber = 5 - rate;

  let stars = [];
  let emptyStars = [];
  for (let i = 0; i < rate; i++) {
    stars.push(
      <Image
        key={'c' + i}
        source={require('../../../assets/icons/starContained.png')}
      />
    );
  }
  for (let i = 0; i < emptyStarsNumber; i++) {
    emptyStars.push(
      <Image
        key={i}
        source={require('../../../assets/icons/starContained.png')}
      />
    );
  }
  return (
    <Pressable onPress={() => handleOpenBook(id)}>
      <View style={styles.bookPost}>
        <View style={styles.bookHeader}>
          <View style={styles.bookimage}>
            <Image source={image} />
          </View>
        </View>
        <View style={styles.bookBody}>
          <Text style={styles.bookCategory}>{category}</Text>
          <Text style={styles.bookName}>{name}</Text>
          <Text style={styles.bookAuthor}>{author}</Text>
          <View style={styles.bookRateContainer}>{[stars, emptyStars]}</View>
          <Text style={styles.bookPrice}>DT {price}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bookPost: {
    height: 288,
    width: 180,
    borderRadius: 8,
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: colors.tertiaryLight,
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bookHeader: {
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.primary,
  },
  bookimage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bookBody: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: colors.secondaryLight,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bookCategory: {
    fontFamily: 'Asap_400Regular',
    color: colors.tertiary,
    fontSize: typography.extraSmall,
  },
  bookName: {
    marginTop: 3,
    fontFamily: 'Asap_400Regular',
    color: colors.tertiary,
    fontWeight: 'bold',
    fontSize: typography.medium,
  },
  bookAuthor: {
    marginTop: 3,
    fontFamily: 'Asap_400Regular',
    color: colors.tertiary,
    fontSize: typography.extraSmall,
  },
  bookPrice: {
    marginTop: 3,
    fontFamily: 'Asap_400Regular',
    color: colors.tertiary,
    fontWeight: 'bold',
    fontSize: typography.medium,
  },
  bookRateContainer: {
    marginTop: 3,
    flexDirection: 'row',
  },
});

export default BookPost;
