import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';
import Button from '../global/Button/Button';
import typography from '../../styles/typography';
import { booksList } from '../../utils/data';

const BookRateModal = ({ openBookRateModal, handleOpenBookRateModel, id }) => {
  const bookData = booksList.find((book) => book.id === id);

  const emptyStarsNumber = 5 - bookData.rate;

  let stars = [];
  let emptyStars = [];

  for (let i = 0; i < bookData.rate; i++) {
    stars.push(
      <View key={'c' + i} style={styles.starContainer}>
        <Image
          resizeMode="contain"
          style={styles.star}
          source={require('../../assets/icons/starContained.png')}
        />
      </View>
    );
  }
  for (let i = 0; i < emptyStarsNumber; i++) {
    emptyStars.push(
      <View key={i} style={styles.starContainer}>
        <Image
          resizeMode="contain"
          style={styles.star}
          source={require('../../assets/icons/starContained.png')}
        />
      </View>
    );
  }

  return (
    <Modal visible={openBookRateModal} transparent={true} style={styles.modal}>
      <View style={styles.modalContainer}>
        <View style={styles.mainContainer}>
          <Text style={styles.firstLine}>Your opinion matter to us!</Text>
          <Text style={styles.secondLine}>do you like this book?</Text>
          <View style={styles.bookRateContainer}>{[stars, emptyStars]}</View>
          <Button type="contained" text="Submit" />
          <Pressable onPress={handleOpenBookRateModel}>
            <Text style={styles.laterButton}>Later</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  mainContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 30,
    paddingVertical: 30,
    flex: 0.3,
    backgroundColor: colors.secondaryLight,
    borderRadius: 8,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.tertiary,
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  firstLine: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.small,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  secondLine: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.extraSmall,
    textAlign: 'center',
  },
  laterButton: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.extraSmall,
    textAlign: 'center',
    color: colors.primary,
    marginVertical: 8,
  },
  bookRateContainer: {
    marginVertical: 4,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  starContainer: {
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    height: '100%',
    width: '100%',
  },
});

export default BookRateModal;
