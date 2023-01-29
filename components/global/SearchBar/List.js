import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import { AuthContext } from '../../../context/auth-context';
import axios from 'axios';

const Item = ({ id, name, handleOpenBook }) => (
  <Pressable onPress={() => handleOpenBook(id)} style={styles.itemContainer}>
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
    </View>
  </Pressable>
);

const List = ({ searchPhrase, handleClicked, handleOpenBook, data }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === '') {
      return (
        <Item
          id={item.id}
          name={item.bookName}
          handleOpenBook={handleOpenBook}
        />
      );
    }
    // filter of the name
    if (
      item.bookName
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <Item
          id={item.id}
          name={item.bookName}
          handleOpenBook={handleOpenBook}
        />
      );
    }
  };

  return (
    <View style={styles.list__container}>
      <View onStartShouldSetResponder={handleClicked} style={styles.flatList}>
        <FlatList
          style={styles.flatList}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    position: 'absolute',
    zIndex: 2,
    padding: 15,
    marginTop: 50,
    width: 240,
    borderWidth: 2,
    borderRadius: 27,
    borderColor: colors.secondary,
    backgroundColor: colors.secondaryLight,
  },
  item: {
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondaryLight,
  },
  title: {
    fontSize: typography.small,
    marginBottom: 5,
  },
  itemContainer: {
    width: '100%',
  },
  flatList: { width: '100%' },
});
