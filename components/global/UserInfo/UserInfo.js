import { StyleSheet, Text, View } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';

const UserInfo = ({ attribute, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeText}>{attribute}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 317,
    height: 55,
    borderWidth: 1,
    borderColor: colors.secondaryLight,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attributeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: colors.secondaryLight,
  },
  valueContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attributeText: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.small,
    color: colors.secondaryLight,
  },
  valueText: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.extraSmall,
    color: colors.secondaryLight,
  },
});

export default UserInfo;
