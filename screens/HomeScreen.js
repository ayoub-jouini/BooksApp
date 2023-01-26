import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';
import ScreenHeader from '../components/ScreenHeader/SreenHeader';
import BooksScrollHorizontal from '../components/BooksSection/BooksScrollHorizontal';
import SearchBar from '../components/global/SearchBar/SreachBar';
import { useState } from 'react';
import List from '../components/global/SearchBar/List';

const booksList = [
  {
    image: require('../assets/images/image27.jpg'),
    category: 'Young Adult',
    name: 'Nine Lars',
    author: 'Maureen Liars',
    rate: 4,
    price: '16.00',
  },
  {
    image: require('../assets/images/image28.jpg'),
    category: 'Fantasy',
    name: 'Sorrow and Starlight',
    author: 'Caroline Peckham',
    rate: 4,
    price: '30.00',
  },
  {
    image: require('../assets/images/image27.jpg'),
    category: 'Young Adult',
    name: 'Nine Lars',
    author: 'Maureen Liars',
    rate: 4,
    price: '16.00',
  },
  {
    image: require('../assets/images/image28.jpg'),
    category: 'Fantasy',
    name: 'Sorrow and Starlight',
    author: 'Caroline Peckham',
    rate: 4,
    price: '30.00',
  },
];

const HomeScreen = () => {
  const [displaySearch, setDisplaySearch] = useState(false);

  const [searchPhrase, setSearchPhrase] = useState('');

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
            <BooksScrollHorizontal title="Top Books" booksList={booksList} />
            <BooksScrollHorizontal
              title="Classic Books"
              booksList={booksList}
            />
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
    flex: 0.9,
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
