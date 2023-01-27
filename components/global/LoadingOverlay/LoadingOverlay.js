import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingOverlay = ({ color }) => {
  return (
    <View styles={styles.container}>
      <ActivityIndicator size="large" color={color} style={styles.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loading: {
    height: '100%',
  },
});

export default LoadingOverlay;
