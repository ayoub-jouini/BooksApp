import { useContext, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AuthContext } from '../context/auth-context';
import { getBookByCategory } from '../utils/http';
import ScreenHeader from '../components/ScreenHeader/SreenHeader';
import List from '../components/global/SearchBar/List';
import BookPostHorizontal from '../components/global/BookPost/BookPostHorizontal';
import colors from '../styles/colors';
import typography from '../styles/typography';
import SearchBar from '../components/global/SearchBar/SreachBar';
import BooksDetailsModal from '../components/BooksSection/BookDetailsModal';

const SingleCategoryScreen = ({ route, navigation }) => {
  const handleNavigation = () => {
    navigation.navigate('Profile');
  };

  const categoryID = route.params.categoryID;

  const [booksList, setBooksList] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const { books, image, name } = await getBookByCategory(
        categoryID,
        authContext.token
      );
      setBooksList(books);
    };
    getData();
  }, []);

  const [displaySearch, setDisplaySearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const [openBook, setOpenBook] = useState(null);

  const handleOpenBook = (id, category) => {
    setOpenBook({ id, category });
    setSearchPhrase('');
  };

  const handleCloseBook = () => {
    setOpenBook(null);
  };

  const handleSearchPhrase = (value) => {
    setSearchPhrase(value);
  };

  const handleDisplaySearch = () => {
    setDisplaySearch(!displaySearch);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <ScreenHeader>
            <Pressable onPress={handleNavigation}>
              <View style={styles.iconBox}>
                <Image source={require('../assets/icons/profileIcon.png')} />
              </View>
            </Pressable>
            {displaySearch ? (
              <View>
                <SearchBar
                  clicked={displaySearch}
                  handleClicked={handleDisplaySearch}
                  searchPhrase={searchPhrase}
                  handleSerchPhrase={handleSearchPhrase}
                />
                {searchPhrase && (
                  <List
                    handleOpenBook={handleOpenBook}
                    searchPhrase={searchPhrase}
                    handleClicked={handleSearchPhrase}
                    data={booksList}
                  />
                )}
              </View>
            ) : (
              <Pressable onPress={handleDisplaySearch}>
                <View style={styles.iconBox}>
                  <Image source={require('../assets/icons/searchIcon.png')} />
                </View>
              </Pressable>
            )}
          </ScreenHeader>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{categoryID}</Text>
            </View>
            <View style={styles.booksMarkContainer}>
              {booksList.map((book, key) => (
                <BookPostHorizontal
                  key={key}
                  id={book.id}
                  image={book.image}
                  category={book.category}
                  name={book.bookName}
                  author={book.author}
                  rate={book.rate}
                  price={book.price}
                  handleOpenBook={handleOpenBook}
                  openBook={openBook}
                />
              ))}
            </View>
          </ScrollView>
          {openBook && (
            <BooksDetailsModal
              openBook={openBook}
              handleCloseBook={handleCloseBook}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 2,
  },
  mainContainer: {
    padding: 10,
    flex: 1,
    width: '100%',
    backgroundColor: colors.secondaryLight,
    borderBottomLeftRadius: 52,
    borderBottomRightRadius: 52,
    elevation: 3,
  },
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 15,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.secondaryLight,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Asap_400Regular',
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: typography.h1,
  },
  booksMarkContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default SingleCategoryScreen;
