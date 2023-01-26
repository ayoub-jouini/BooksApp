import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';

const BookPostHorizontal = ({
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
          <View style={styles.bookBodyDetails}>
            <Text style={styles.bookCategory}>{category}</Text>
            <Text style={styles.bookName}>{name}</Text>
            <Text style={styles.bookAuthor}>{author}</Text>
            <View style={styles.bookRateContainer}>{[stars, emptyStars]}</View>
            <Text style={styles.bookPrice}>DT {price}</Text>
          </View>
          <View style={styles.bookMarkIcon}>
            <Image source={require('../../../assets/icons/Vector(14).png')} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bookPost: {
    height: 160,
    width: '100%',
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: 'row',
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
    borderBottomLeftRadius: 8,
    backgroundColor: colors.primary,
  },
  bookimage: {
    flex: 1,
    justifyContent: 'center',
  },
  bookBody: {
    flex: 1.2,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.secondaryLight,
    borderTopRightRadius: 8,
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
  bookMarkIcon: {
    height: '100%',
    width: 20,
  },
});

export default BookPostHorizontal;
