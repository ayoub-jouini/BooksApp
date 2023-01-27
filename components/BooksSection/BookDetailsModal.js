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
import { booksList } from '../../utils/data';
import BookRateModal from './BookRateModal';
import { AuthContext } from '../../context/auth-context';
import { getBookById } from '../../utils/http';

const BooksDetailsModal = ({ openBook, handleCloseBook }) => {
  const [showModal, setShowModal] = useState(false);
  const [openBookRateModal, setOpenBookRateModal] = useState(false);

  const handleOpenBookRateModel = () => {
    setOpenBookRateModal(!openBookRateModal);
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
    };
    getData();
  }, []);
  if (bookData === []) {
    return <LoadingOverlay color={colors.primary} />;
  }

  const emptyStarsNumber = 5 - bookData.rate;

  let stars = [];
  let emptyStars = [];

  for (let i = 0; i < bookData.rate; i++) {
    stars.push(
      <Image
        key={'c' + i}
        source={require('../../assets/icons/starContained.png')}
      />
    );
  }
  for (let i = 0; i < emptyStarsNumber; i++) {
    emptyStars.push(
      <Image key={i} source={require('../../assets/icons/starContained.png')} />
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable onPress={handleCloseBook}>
            <View style={styles.iconBox}>
              <Image source={require('../../assets/icons/backArrow.png')} />
            </View>
          </Pressable>
          <View style={styles.bookDetailsContainer}>
            <Image
              resizeMode="contain"
              source={{ uri: bookData.image }}
              style={styles.bookImage}
            />
            <View style={styles.booksDetails}>
              <Text style={styles.bookTitle}>{bookData.name}</Text>
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
            handleOpenBookRateModel={handleOpenBookRateModel}
            id={bookData.id}
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
});

export default BooksDetailsModal;
