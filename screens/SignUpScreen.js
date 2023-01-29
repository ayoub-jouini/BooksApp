import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import Input from '../components/global/Input/Input';
import { useContext, useState } from 'react';
import Button from '../components/global/Button/Button';
import colors from '../styles/colors';
import typography from '../styles/typography';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { createUser } from '../utils/auth';
import LoadingOverlay from '../components/global/LoadingOverlay/LoadingOverlay';
import { AuthContext } from '../context/auth-context';

const SignUpScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [disabled, setDisabled] = useState(false);

  const [isAuth, setIsAuth] = useState(false);

  const handlePress = () => {
    navigation.navigate('welcome');
  };

  const handleFirstName = (value) => {
    setFirstName(value);
  };
  const handleLastName = (value) => {
    setLastName(value);
  };
  const handleEmail = (value) => {
    setEmail(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleSignUp = async () => {
    setIsAuth(true);
    try {
      const { token, userAdress, userId } = await createUser(
        email,
        password,
        firstName,
        lastName
      );
      authContext.authenticate(token, userId, userAdress);
    } catch (e) {
      Alert.alert(
        'Authentication faild!',
        'Could not log you in, Please check you credentials or try again later'
      );
    }
    setIsAuth(false);
  };

  if (isAuth) {
    return <LoadingOverlay color={colors.primary} />;
  }

  return (
    <View style={styles.screenContainer}>
      <Pressable onPress={handlePress} style={styles.iconContainer}>
        <View>
          <Image
            source={require('../assets/icons/backArrow.png')}
            style={styles.backArrow}
          />
        </View>
      </Pressable>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleBorder} />
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.titleBorder} />
        </View>
        <View style={styles.formContainer}>
          <Input
            value={firstName}
            handleChange={handleFirstName}
            placeholder="First Name"
            type="default"
            text=""
          />
          <Input
            value={lastName}
            handleChange={handleLastName}
            placeholder="Last Name"
            type="default"
            text=""
          />
          <Input
            value={email}
            handleChange={handleEmail}
            placeholder="Email"
            type="default"
            text=""
          />
          <Input
            value={password}
            handleChange={handlePassword}
            placeholder="Password"
            type="default"
            text=""
          />
          <View style={styles.button}>
            <Button
              text="SIGN UP"
              handlePress={handleSignUp}
              type="contained"
              disabled={disabled}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 294,
  },
  mainContainer: {
    flex: 5,
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Asap_400Regular',
    marginHorizontal: 10,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: typography.h1,
  },
  titleBorder: {
    height: 1,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#4C4C4C',
    opacity: 0.1,
  },
  button: {
    marginTop: 15,
    alignItems: 'center',
  },
});

export default SignUpScreen;
