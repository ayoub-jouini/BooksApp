import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import BookPost from '../global/BookPost/BookPost';
import { useContext, useEffect, useState } from 'react';
import { getBookByCategory } from '../../utils/http';
import { AuthContext } from '../../context/auth-context';

const BooksScrollHorizontal = ({ openBook, handleOpenBook, category }) => {
  const [booksList, setBooksList] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const { books, image, name } = await getBookByCategory(
        category,
        authContext.token
      );
      setBooksList(books);
    };
    getData();
  }, []);

  return (
    <View style={styles.booksSection}>
      <Text style={styles.booksContainerTitle}>{category}</Text>
      <View>
        {booksList ? (
          <ScrollView
            style={styles.booksContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {booksList.map((book, key) => (
              <BookPost
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
          </ScrollView>
        ) : (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loading}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  booksContainer: {
    width: '100%',
    height: 295,
    paddingLeft: 20,
  },
  booksContainerTitle: {
    fontFamily: 'Asap_400Regular',
    color: colors.primary,
    fontSize: typography.large,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 30,
  },
});

export default BooksScrollHorizontal;
