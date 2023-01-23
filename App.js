import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AuthContextProvider from './context/auth-context';
import Button from './components/global/Button/Button';
import Input from './components/global/Input/Input';
import { useState } from 'react';

export default function App() {
  const [inputState, setInputState] = useState('');

  const handleChange = (value) => {
    setInputState(value);
  };
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
