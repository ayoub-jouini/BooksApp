import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../../../styles/colors';
import { useFonts, Asap_400Regular } from '@expo-google-fonts/asap';
import typography from '../../../styles/typography';

const Button = ({
  text,
  handlePress,
  type = 'texted',
  disabled = false,
  small = false,
}) => {
  let [fontsLoaded] = useFonts({
    Asap_400Regular,
  });

  if (!fontsLoaded) return <Text>loading</Text>;

  let buttonStyle;
  let textStyle;
  switch (type) {
    case 'contained':
      buttonStyle = styles.containedButton;
      textStyle = styles.containedText;
      break;
    case 'outlined':
      buttonStyle = styles.outlinedButton;
      textStyle = styles.outlinedText;
      break;
    default:
      buttonStyle = styles.textedButton;
      textStyle = styles.textedText;
  }

  return (
    <Pressable
      style={[
        buttonStyle,
        styles.button,
        disabled ? { opacity: 0.7 } : { opacity: 1 },
        small ? { height: 38, width: 39 } : { height: 47, width: 156 },
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={[textStyle, styles.text]}> {text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { fontFamily: 'Asap_400Regular', fontSize: typography.small },
  containedButton: {
    backgroundColor: colors.primary,
  },
  containedText: {
    color: colors.secondaryLight,
  },
  outlinedButton: {
    backgroundColor: colors.secondaryLight,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  outlinedText: {
    color: colors.primary,
  },
  textedButton: {},
  textedText: {
    color: colors.primary,
  },
});

export default Button;
