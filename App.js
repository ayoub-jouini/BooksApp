import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthContextProvider from './context/auth-context';
import Button from './components/global/Button/Button';

export default function App() {
  return (
    <AuthContextProvider>
      <View style={styles.container}>
        <Button text="Enabled" type="contained" disabled />
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
