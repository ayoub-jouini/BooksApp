import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthContextProvider from './context/auth-context';
import Button from './components/global/Button/Button';
import Input from './components/global/Input/Input';
import { useEffect, useState } from 'react';
import Select from './components/global/Select/Select';
import SearchBar from './components/global/SearchBar/SreachBar';
import List from './components/global/SearchBar/List';

export default function App() {
  const [inputState, setInputState] = useState('');

  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleChange = (value) => {
    setInputState(value);
  };

  const handleClicked = () => {
    setClicked(!clicked);
  };

  const fakeData = [
    {
      'id': '1',
      'name': 'JavaScript',
    },
    {
      'id': '2',
      'name': 'Python',
    },
    {
      'id': '3',
      'name': 'Java',
    },
  ];

  return (
    <AuthContextProvider>
      <View style={styles.container}>
        <Input
          value={inputState}
          type="error"
          handleChange={handleChange}
          placeholder="default"
          text="warning text"
        />
        <Select
          value={inputState}
          type="error"
          handleChange={handleChange}
          placeholder="default"
          text="warning text"
          items={[
            { label: 'Football', value: 'football' },
            { label: 'Baseball', value: 'baseball' },
            { label: 'Hockey', value: 'hockey' },
          ]}
        />
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={handleClicked}
        />
        {
          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={handleClicked}
          />
        }
        <StatusBar style="auto" />
      </View>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
