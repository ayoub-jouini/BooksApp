import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/auth-context';

const BookPostHorizontal = ({
  id,
  image,
  category,
  name,
  author,
  price,
  rate,
  handleOpenBook,
  openBook,
}) => {
  const authContext = useContext(AuthContext);

  const [favIcon, setFavIcon] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let response;
      try {
        response = await axios.get(
          `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/Users/${authContext.userId}/books/${id}.json?auth=${authContext.token}`
        );
        !response.data ? setFavIcon(false) : setFavIcon(true);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [openBook]);

  const handleDeleteFavBook = async () => {
    let response;
    try {
      response = await axios.delete(
        `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/Users/${authContext.userId}/books/${id}.json?auth=${authContext.token}`
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
        `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/Users/${authContext.userId}/books/${id}.json?auth=${authContext.token}`,
        {
          author: author,
          bookName: name,
          category: category,
          image: image,
          price: price,
          rate: rate,
        }
      );

      setFavIcon(true);
    } catch (err) {
      console.log('fama 8alta');
    }
  };

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
            <Image source={{ uri: image }} style={{ width: 81, height: 128 }} />
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
        </View>

        {favIcon ? (
          <Pressable
            onPress={handleDeleteFavBook}
            style={styles.favIconsContainer}
          >
            <Image
              source={require('../../../assets/icons/favoriteContained.png')}
              style={styles.favIcon}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={handleAddFavBook}
            style={styles.favIconsContainer}
          >
            <Image
              style={styles.favIcon}
              source={require('../../../assets/icons/favorite.png')}
            />
          </Pressable>
        )}
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
    flex: 2,
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
    flex: 3,
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
  favIcon: {
    position: 'absolute',
    right: 20,
    width: 25,
    height: 45,
  },
});

export default BookPostHorizontal;
