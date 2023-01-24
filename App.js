import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AuthContextProvider from './context/auth-context';
import WelcomeScreen from './screens/WelcomeScreen';
import { useFonts, Asap_400Regular } from '@expo-google-fonts/asap';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignUpScreen';

export default function App() {
  let [fontsLoaded] = useFonts({
    Asap_400Regular,
  });

  if (!fontsLoaded) return <Text>loading</Text>;

  const Stack = createNativeStackNavigator();

  return (
    <AuthContextProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
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
