import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../styles/colors';
import Input from '../global/Input/Input';
import { useContext, useState } from 'react';
import Button from '../global/Button/Button';
import { login } from '../../utils/auth';
import LoadingOverlay from '../global/LoadingOverlay/LoadingOverlay';
import { AuthContext } from '../../context/auth-context';

const SignInModal = ({ showModal, handleShowModal }) => {
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [disabled, setDisabled] = useState(false);

  const [isAuth, setIsAuth] = useState(false);

  const handleEmail = (value) => {
    setEmail(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = async () => {
    handleShowModal();
    setIsAuth(true);
    try {
      const { token, userAdress, userId } = await login(email, password);
      authContext.authenticate(token, userId, userAdress);
    } catch (err) {
      Alert.alert(
        'Authentication faild!',
        'Could not log you in, Please check you credentials or try again later'
      );
    }
    setIsAuth(false);
  };

  if (isAuth) {
    return <LoadingOverlay color={colors.secondaryLight} />;
  }

  return (
    <Modal
      visible={showModal}
      animationType="slide"
      transparent={true}
      style={styles.modal}
    >
      <View style={styles.mainContainer}>
        <Pressable onPress={handleShowModal} style={styles.iconContainer}>
          <Image
            source={require('../../assets/icons/backArrow.png')}
            style={styles.backArrow}
          />
        </Pressable>
        <View style={styles.formContainer}>
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
          <Button
            text="LOG IN"
            handlePress={handleSignIn}
            type="contained"
            disabled={disabled}
          />
          <Text style={styles.forgetPassword}>Forget Password?</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 'auto',
    paddingHorizontal: 35,
    paddingVertical: 20,
    flex: 0.5,
    backgroundColor: colors.secondaryLight,
    borderTopRightRadius: 52,
    borderTopLeftRadius: 52,
    justifyContent: 'space-between',
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  backArrow: {
    marginVertical: 20,
  },
  forgetPassword: {
    marginVertical: 10,
  },
});

export default SignInModal;
