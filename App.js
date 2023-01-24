import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AuthContextProvider from './context/auth-context';
import WelcomeScreen from './screens/WelcomeScreen';
import { useFonts, Asap_400Regular } from '@expo-google-fonts/asap';

export default function App() {
  let [fontsLoaded] = useFonts({
    Asap_400Regular,
  });

  if (!fontsLoaded) return <Text>loading</Text>;

  return (
    <AuthContextProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <WelcomeScreen />
          <StatusBar style="auto" />
        </SafeAreaView>
      </View>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5ECF1',
  },
});
