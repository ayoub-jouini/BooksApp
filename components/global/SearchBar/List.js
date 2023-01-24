import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';

const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

const List = ({ searchPhrase, handleClicked, data }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === '') {
      return <Item name={item.name} details={item.details} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return <Item name={item.name} details={item.details} />;
    }
  };

  return (
    <View style={styles.list__container}>
      <View onStartShouldSetResponder={handleClicked}>
        <FlatList
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
    padding: 15,
    margin: 15,
    width: 294,
    borderWidth: 2,
    borderRadius: 27,
    borderColor: colors.secondary,
  },
  item: {
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondaryLight,
  },
  title: {
    fontSize: typography.small,
    marginBottom: 5,
  },
});
