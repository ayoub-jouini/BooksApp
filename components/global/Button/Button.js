import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';

const Button = ({
  text,
  handlePress,
  type = 'texted',
  disabled = false,
  small = false,
}) => {
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
        small ? { height: 38, width: 39 } : { height: 47, width: 191 },
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
    borderColor: colors.secondaryLight,
    borderWidth: 1,
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
