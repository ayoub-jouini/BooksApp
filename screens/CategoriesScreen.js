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
import { useContext, useEffect, useState } from 'react';
import List from '../components/global/SearchBar/List';
import typography from '../styles/typography';
import CategoryPost from '../components/global/CategoryPost/CategoryPost';
import { AuthContext } from '../context/auth-context';
import { getBooks, getCategories } from '../utils/http';
import axios from 'axios';
import BooksDetailsModal from '../components/BooksSection/BookDetailsModal';

const CategoriesScreen = ({ navigation }) => {
  const handleNavigation = () => {
    navigation.navigate('Profile');
  };

  const handleNavigateToCategory = (id) => {
    navigation.navigate('category', { categoryID: id });
  };

  const [openBook, setOpenBook] = useState(null);

  const authContext = useContext(AuthContext);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCategories(authContext.token);
      setCategoriesList(data);
    };
    getData();
  }, []);

  const [displaySearch, setDisplaySearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSearchPhrase = (value) => {
    setSearchPhrase(value);
  };

  const handleDisplaySearch = () => {
    setDisplaySearch(!displaySearch);
  };

  //open bookDetailModel
  const handleOpenBook = (id, category) => {
    setOpenBook({ id, category });
    setSearchPhrase('');
  };

  const handleCloseBook = () => {
    setOpenBook(null);
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
              category: keyCat,
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
            <View style={styles.titleContainer}>
              <Text style={styles.title}>categories</Text>
            </View>
            <View style={styles.CategoriesContainer}>
              {categoriesList.map((category, key) => (
                <Pressable
                  onPress={() => handleNavigateToCategory(category.id)}
                  key={key}
                >
                  <CategoryPost image={category.image} name={category.name} />
                </Pressable>
              ))}
              {openBook && (
                <BooksDetailsModal
                  openBook={openBook}
                  handleCloseBook={handleCloseBook}
                />
              )}
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
  CategoriesContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default CategoriesScreen;
