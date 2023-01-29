import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/auth-context';

const BookPost = ({
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
          userRate: 0,
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
        style={styles.starIcon}
      />
    );
  }
  for (let i = 0; i < emptyStarsNumber; i++) {
    emptyStars.push(
      <Image
        key={i}
        source={require('../../../assets/icons/star.png')}
        style={styles.starIcon}
      />
    );
  }
  return (
    <Pressable onPress={() => handleOpenBook(id, category)}>
      <View style={styles.bookPost}>
        <View style={styles.bookHeader}>
          <View style={styles.bookimage}>
            <Image source={{ uri: image }} style={{ width: 81, height: 128 }} />
          </View>
          {favIcon ? (
            <Pressable
              onPress={handleDeleteFavBook}
              style={styles.favIconsContainer}
            >
              <Image
                style={styles.favIcon}
                source={require('../../../assets/icons/favoriteWhiteContained.png')}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={handleAddFavBook}
              style={styles.favIconsContainer}
            >
              <Image
                style={styles.favIcon}
                source={require('../../../assets/icons/favoriteWhite.png')}
              />
            </Pressable>
          )}
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
  favIconsContainer: {
    position: 'absolute',
    right: 15,
    top: -5,
    width: 25,
    height: 50,
  },
  favIcon: {
    width: 25,
    height: 50,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
});

export default BookPost;
