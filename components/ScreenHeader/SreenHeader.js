import { StyleSheet, View } from 'react-native';

const ScreenHeader = ({ children }) => {
  return <View style={styles.iconsContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
});

export default ScreenHeader;
