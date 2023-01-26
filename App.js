import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AuthContextProvider from './context/auth-context';
import WelcomeScreen from './screens/WelcomeScreen';
import { useFonts, Asap_400Regular } from '@expo-google-fonts/asap';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from './styles/colors';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  let [fontsLoaded] = useFonts({
    Asap_400Regular,
  });

  if (!fontsLoaded) return <Text>loading</Text>;

  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  return (
    <AuthContextProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            {/* <Stack.Navigator>
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
              <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator> */}
            <Tab.Navigator
              initialRouteName="home"
              screenOptions={{
                tabBarStyle: {
                  height: 70,
                  backgroundColor: colors.primary,
                  borderTopWidth: 0,
                  elevation: 0, // for Android
                  shadowOffset: {
                    width: 0,
                    height: 0, // for iOS
                  },
                },
                tabBarShowLabel: false,
              }}
            >
              <Tab.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <Image
                      source={require('./assets/icons/categoryIcon.png')}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <Image source={require('./assets/icons/homeIcon.png')} />
                  ),
                }}
              />
              <Tab.Screen
                name="Bookmarks"
                component={BookmarksScreen}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <Image
                      source={require('./assets/icons/bookMarkIcon.png')}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
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
