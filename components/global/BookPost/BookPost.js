import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';

const BookPost = ({ image, category, name, author, price, rate }) => {
  return (
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
        <View style={styles.bookRateContainer}>
          <Image source={require('../../../assets/icons/starContained.png')} />
          <Image source={require('../../../assets/icons/starContained.png')} />
          <Image source={require('../../../assets/icons/starContained.png')} />
          <Image source={require('../../../assets/icons/starContained.png')} />
          <Image source={require('../../../assets/icons/starContained.png')} />
        </View>
        <Text style={styles.bookPrice}>DT {price}</Text>
      </View>
    </View>
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
