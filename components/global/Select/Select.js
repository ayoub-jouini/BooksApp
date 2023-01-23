import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';

const Select = ({ items, value, handleChange, placeholder, type, text }) => {
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
      <View style={[styles.container, { borderColor }]}>
        <RNPickerSelect
          value={value}
          onValueChange={handleChange}
          items={items}
          placeholder={{ label: placeholder, value: null }}
        />
      </View>
      <Text style={{ color: borderColor }}> {text} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 294,
    height: 43,
    borderRadius: 4,
    borderWidth: 2,
    paddingLeft: 5,
    fontSize: typography.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Select: {
    flex: 1,
  },
});

export default Select;
