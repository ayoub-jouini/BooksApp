import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';
import ScreenHeader from '../components/ScreenHeader/SreenHeader';
import BooksScrollHorizontal from '../components/BooksSection/BooksScrollHorizontal';
import SearchBar from '../components/global/SearchBar/SreachBar';
import { useContext, useEffect, useState } from 'react';
import List from '../components/global/SearchBar/List';
import BooksDetailsModal from '../components/BooksSection/BookDetailsModal';
import { getBooks } from '../utils/http';
import { AuthContext } from '../context/auth-context';

const HomeScreen = () => {
  const authContext = useContext(AuthContext);
  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getBooks(authContext.token);
      setBooksList(data);
    };
    getData();
  }, []);

  const [displaySearch, setDisplaySearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const [openBook, setOpenBook] = useState(null);

  const handleOpenBook = (id) => {
    setOpenBook(id);
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

  //logOut
  const handleLogOut = () => {
    authContext.logout();
  };
  return (
    <View style={styles.screenContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <ScreenHeader>
            <Pressable onPress={handleLogOut}>
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
          {booksList && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <BooksScrollHorizontal
                handleOpenBook={handleOpenBook}
                title="Top Books"
                booksList={booksList}
              />
              <BooksScrollHorizontal
                handleOpenBook={handleOpenBook}
                title="Classic Books"
                booksList={booksList}
              />
            </ScrollView>
          )}

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
});

export default HomeScreen;
