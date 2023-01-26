import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../styles/colors';
import ScreenHeader from '../components/ScreenHeader/SreenHeader';
import SearchBar from '../components/global/SearchBar/SreachBar';
import { useState } from 'react';
import List from '../components/global/SearchBar/List';
import { booksList } from '../utils/data';
import typography from '../styles/typography';
import BookPostHorizontal from '../components/global/BookPost/BookPostHorizontal';

const BookMarksScreen = () => {
  const bookList = booksList;

  const [displaySearch, setDisplaySearch] = useState(false);

  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSearchPhrase = (value) => {
    setSearchPhrase(value);
  };

  const handleDisplaySearch = () => {
    setDisplaySearch(!displaySearch);
  };

  const [openBook, setOpenBook] = useState(null);

  const handleOpenBook = (id) => {
    setOpenBook(id);
  };

  const handleCloseBook = () => {
    setOpenBook(null);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <ScreenHeader>
            <Pressable>
              <View style={styles.iconBox}>
                <Image source={require('../assets/icons/menuIcon.png')} />
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
              <Text style={styles.title}>Your Favorite Books</Text>
            </View>
            <View style={styles.booksMarkContainer}>
              {booksList.map((book, key) => (
                <BookPostHorizontal
                  key={key}
                  id={book.id}
                  image={book.image}
                  category={book.category}
                  name={book.name}
                  author={book.author}
                  rate={book.rate}
                  price={book.price}
                  handleOpenBook={handleOpenBook}
                />
              ))}
            </View>
          </ScrollView>
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

export default BookMarksScreen;
