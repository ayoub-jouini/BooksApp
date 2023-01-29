import { useContext, useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import BookRateModal from './BookRateModal';
import { AuthContext } from '../../context/auth-context';
import { getBookById } from '../../utils/http';
import axios from 'axios';

const BooksDetailsModal = ({ openBook, handleCloseBook }) => {
  const [showModal, setShowModal] = useState(false);
  const [openBookRateModal, setOpenBookRateModal] = useState(false);

  const handleOpenBookRateModel = () => {
    handleAddFavBook();
    setOpenBookRateModal(true);
  };

  const handleCloseBookRateModel = () => {
    setOpenBookRateModal(false);
  };

  useEffect(() => {
    openBook === null ? setShowModal(false) : setShowModal(true);
  }, [openBook]);

  //book data
  const authContext = useContext(AuthContext);
  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getBookById(openBook, authContext.token);
      setBookData(data);

      let response;
      try {
        response = await axios.get(
          `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/Users/${authContext.userId}/books/${data.id}.json?auth=${authContext.token}`
        );
        !response.data ? setFavIcon(false) : setFavIcon(true);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);
  if (bookData === []) {
    return <LoadingOverlay color={colors.primary} />;
  }

  const [favIcon, setFavIcon] = useState(false);

  const handleDeleteFavBook = async () => {
    let response;
    try {
      response = await axios.delete(
        `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/Users/${authContext.userId}/books/${bookData.id}.json?auth=${authContext.token}`
      );

      setFavIcon(false);
    } catch (err) {
      console.log('fama 8alta');
    }
  };

  const handleAddFavBook = async () => {
    let response;
    try {
      response = await axios.put(
        `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/Users/${authContext.userId}/books/${bookData.id}.json?auth=${authContext.token}`,
        {
          author: bookData.author,
          bookName: bookData.bookName,
          category: bookData.category,
          image: bookData.image,
          price: bookData.price,
          rate: bookData.rate,
          userRate: 0,
        }
      );

      setFavIcon(true);
    } catch (err) {
      console.log(err);
    }
  };

  const emptyStarsNumber = 5 - bookData.rate;

  let stars = [];
  let emptyStars = [];

  for (let i = 0; i < bookData.rate; i++) {
    stars.push(
      <Image
        key={'c' + i}
        source={require('../../assets/icons/starContained.png')}
        style={styles.starIcon}
      />
    );
  }
  for (let i = 0; i < emptyStarsNumber; i++) {
    emptyStars.push(
      <Image
        key={i}
        source={require('../../assets/icons/star.png')}
        style={styles.starIcon}
      />
    );
  }

  return (
    <Modal
      visible={showModal}
      animationType="slide"
      transparent={true}
      style={styles.modal}
    >
      <View style={styles.mainContainer}>
        {favIcon ? (
          <Pressable
            onPress={handleDeleteFavBook}
            style={styles.favIconsContainer}
          >
            <Image
              style={styles.favIcon}
              source={require('../../assets/icons/favoriteContained.png')}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={handleAddFavBook}
            style={styles.favIconsContainer}
          >
            <Image
              style={styles.favIcon}
              source={require('../../assets/icons/favorite.png')}
            />
          </Pressable>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.iconBox}>
            <Pressable
              onPress={handleCloseBook}
              style={styles.backIconContainer}
            >
              <Image source={require('../../assets/icons/backArrow.png')} />
            </Pressable>
          </View>
          <View style={styles.bookDetailsContainer}>
            <Image
              resizeMode="contain"
              source={{ uri: bookData.image }}
              style={styles.bookImage}
            />
            <View style={styles.booksDetails}>
              <Text style={styles.bookTitle}>{bookData.bookName}</Text>
              <View style={styles.bookDetailElement}>
                <Text style={styles.bookDetailsAtribute}>Author : </Text>
                <Text style={styles.bookDetailsValue}>{bookData.author}</Text>
              </View>
              <View style={styles.bookDetailElement}>
                <Text style={styles.bookDetailsAtribute}>category : </Text>
                <Text style={styles.bookDetailsValue}>{bookData.category}</Text>
              </View>
              <View style={styles.bookDetailElement}>
                <Text style={styles.bookDetailsAtribute}>Rating : </Text>
                <View style={styles.bookRateContainer}>
                  {[stars, emptyStars]}
                </View>
              </View>
              <View style={styles.bookDetailElement}>
                <Text style={styles.bookDetailsAtribute}>Pricing : </Text>
                <Text style={styles.bookDetailsValue}>DT {bookData.price}</Text>
              </View>
              <Pressable onPress={handleOpenBookRateModel}>
                <View style={styles.RateButton}>
                  <Text style={styles.bookDetailsAtribute}>Rate This Book</Text>
                </View>
              </Pressable>
            </View>
          </View>

          <View style={styles.bookDescriptionContainer}>
            <Text style={styles.bookDescriptionAtribute}>Description : </Text>
            <Text style={styles.bookDescriptionValue}>
              {bookData.description}
            </Text>
          </View>
        </ScrollView>
        {openBookRateModal && (
          <BookRateModal
            openBookRateModal={openBookRateModal}
            handleOpenBookRateModel={handleCloseBookRateModel}
            id={bookData.id}
            userId={authContext.userId}
            token={authContext.token}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 'auto',
    paddingHorizontal: 35,
    paddingVertical: 30,
    flex: 0.87,
    backgroundColor: colors.secondaryLight,
    borderTopRightRadius: 52,
    borderTopLeftRadius: 52,
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: colors.tertiary,
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bookDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bookImage: {
    height: 209,
    width: '45%',
  },
  booksDetails: {
    width: '50%',
    justifyContent: 'center',
  },
  bookTitle: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.h1,
  },
  bookDetailElement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  bookDetailsAtribute: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.small,
    color: colors.primary,
  },
  bookDetailsValue: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.small,
  },
  bookRateContainer: {
    marginTop: 3,
    flexDirection: 'row',
  },
  RateButton: {
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookDescriptionAtribute: {
    fontFamily: 'Asap_400Regular',
    fontWeight: 'bold',
    fontSize: typography.small,
    color: colors.tertiary,
    marginVertical: 8,
  },
  bookDescriptionValue: {
    fontSize: typography.extraSmall,
    fontFamily: 'Asap_400Regular',
    color: colors.tertiary,
    lineHeight: 20,
    textAlign: 'justify',
  },
  favIcon: {
    width: 30,
    height: 55,
  },
  backIconContainer: {
    width: '20%',
  },
  favIconsContainer: {
    position: 'absolute',
    right: 50,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
});

export default BooksDetailsModal;
