import React from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';

const SearchBar = ({
  clicked,
  searchPhrase,
  handleSerchPhrase,
  handleClicked,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={20}
          color={colors.secondary}
          style={{ marginLeft: 1 }}
        />

        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={handleSerchPhrase}
          // onFocus={handleClicked}
        />

        {/* {clicked && ( */}
        <Entypo
          name="cross"
          size={20}
          color={colors.secondary}
          style={{ padding: 1, width: '24%' }}
          onPress={handleClicked}
        />
        {/* )} */}
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: 240,
    height: 43,
  },
  searchBar: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 33,
    alignItems: 'center',
  },
  input: {
    fontSize: typography.small,
    marginLeft: 10,
    width: '76%',
  },
});
