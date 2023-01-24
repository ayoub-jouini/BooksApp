import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import Button from '../components/global/Button/Button';

const WelcomeScreen = () => {
  const handlePress = () => {};
  return (
    <View style={styles.screenContainer}>
      <Image
        source={require('../assets/images/6870523-011.png')}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.title}>BOOKLAND</Text>
      </View>
      <Button text="GET STARTED" handlePress={handlePress} type="outlined" />
      <View style={styles.textContainerSecond}>
        <Text style={styles.already}>Already Have Account?</Text>
        <Text style={styles.login}>LOG IN</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainerSecond: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { resizeMode: 'contain', width: '90%' },
  text: {
    fontFamily: 'Asap_400Regular',
    color: colors.secondaryLight,
    fontSize: 32,
    letterSpacing: 2,
  },
  title: {
    fontFamily: 'Asap_400Regular',
    color: colors.secondaryLight,
    fontSize: 32,
    fontWeight: 'bold',
  },
  already: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.extraSmall,
    color: colors.secondaryLight,
  },
  login: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.extraSmall,
    color: colors.secondaryLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLight,
  },
});

export default WelcomeScreen;
