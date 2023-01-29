import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';
import ScreenHeader from '../components/ScreenHeader/SreenHeader';
import BooksScrollHorizontal from '../components/BooksSection/BooksScrollHorizontal';
import SearchBar from '../components/global/SearchBar/SreachBar';
import { useContext, useEffect, useState } from 'react';
import BooksDetailsModal from '../components/BooksSection/BookDetailsModal';
import List from '../components/global/SearchBar/List';
import { AuthContext } from '../context/auth-context';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const handleNavigation = () => {
    navigation.navigate('Profile');
  };

  const authContext = useContext(AuthContext);

  const categories = ['Fantasy', 'Non-Fiction', 'Young Adult', 'Horror'];

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

  //getDatafor searchBar list
  const [searchBarData, setSearchBarData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let response;
      try {
        response = await axios.get(
          `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/categories.json?auth=${authContext.token}`
        );

        let bookList = [];
        for (let keyCat in response.data) {
          for (let keyBook in response.data[keyCat].books) {
            console.log(keyBook);
            const bookItem = {
              id: keyBook,
              bookName: response.data[keyCat].books[keyBook].bookName,
            };
            bookList.push(bookItem);
          }
        }

        setSearchBarData(bookList);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

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
                    data={searchBarData}
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
            {categories.map((category, key) => (
              <BooksScrollHorizontal
                key={key}
                category={category}
                handleOpenBook={handleOpenBook}
                openBook={openBook}
              />
            ))}
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
});

export default HomeScreen;
