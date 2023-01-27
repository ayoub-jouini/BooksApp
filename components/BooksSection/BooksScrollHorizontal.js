import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import BookPost from '../global/BookPost/BookPost';

const BooksScrollHorizontal = ({ handleOpenBook, title, booksList }) => {
  return (
    <View style={styles.booksSection}>
      <Text style={styles.booksContainerTitle}>{title}</Text>
      <View>
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
            />
          ))}
        </ScrollView>
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
