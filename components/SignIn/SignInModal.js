import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';
import Input from '../global/Input/Input';
import { useState } from 'react';
import Button from '../global/Button/Button';
import { login } from '../../utils/auth';

const SignInModal = ({ showModal, handleShowModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [disabled, setDisabled] = useState(false);

  const handleEmail = (value) => {
    setEmail(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    login(email, password);
  };

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
