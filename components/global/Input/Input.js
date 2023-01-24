import { StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';

const Input = ({ value, handleChange, placeholder, type, text }) => {
  let borderColor;
  switch (type) {
    case 'success':
      borderColor = colors.success;
      break;
    case 'warning':
      borderColor = colors.warning;
      break;
    case 'error':
      borderColor = colors.error;
      break;
    default:
      borderColor = colors.secondary;
  }
  return (
    <View>
      <Text style={styles.label}>{placeholder}</Text>
      <TextInput
        style={[styles.input, { borderColor }]}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
      />
      <Text style={{ color: borderColor }}> {text} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 294,
    height: 43,
    borderRadius: 4,
    borderWidth: 2,
    fontSize: typography.small,
    paddingHorizontal: 15,
  },
  label: {
    color: colors.tertiary,
    fontFamily: 'Asap_400Regular',
    fontSize: typography.medium,
    marginBottom: 10,
  },
});

export default Input;
