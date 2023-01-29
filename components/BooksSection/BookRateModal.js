import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';
import Button from '../global/Button/Button';
import typography from '../../styles/typography';
import { booksList } from '../../utils/data';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BookRateModal = ({
  openBookRateModal,
  handleOpenBookRateModel,
  id,
  userId,
  token,
}) => {
  const [rateNumber, setRateNumber] = useState();

  useEffect(() => {
    const getData = async () => {
      let response;
      try {
        response = await axios.get(
          `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/Users/${userId}/books/${id}.json?auth=${token}`
        );
        !!response.data
          ? setRateNumber(response.data.userRate)
          : setRateNumber(0);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [openBookRateModal, rateNumber]);

  const handleRateBook = async (nb) => {
    let response;
    setRateNumber(nb);
    try {
      response = await axios.patch(
        `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/Users/${userId}/books/${id}.json?auth=${token}`,
        {
          userRate: nb,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  let stars = [];
  let emptyStars = [];

  for (let i = 1; i <= rateNumber; i++) {
    stars.push(
      <Pressable
        key={'c' + i}
        style={styles.starContainer}
        onPress={() => handleRateBook(i)}
      >
        <Image
          resizeMode="contain"
          style={styles.star}
          source={require('../../assets/icons/starContained.png')}
        />
      </Pressable>
    );
  }
  for (let i = rateNumber + 1; i <= 5; i++) {
    emptyStars.push(
      <Pressable
        key={i}
        style={styles.starContainer}
        onPress={() => handleRateBook(i)}
      >
        <Image
          resizeMode="contain"
          style={styles.star}
          source={require('../../assets/icons/star.png')}
        />
      </Pressable>
    );
  }

  return (
    <Modal visible={openBookRateModal} transparent={true} style={styles.modal}>
      <View style={styles.modalContainer}>
        <View style={styles.mainContainer}>
          <Text style={styles.firstLine}>Your opinion matter to us!</Text>
          <Text style={styles.secondLine}>do you like this book?</Text>
          <View style={styles.bookRateContainer}>{[stars, emptyStars]}</View>
          <Button
            type="contained"
            text="Submit"
            handlePress={handleOpenBookRateModel}
          />
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
