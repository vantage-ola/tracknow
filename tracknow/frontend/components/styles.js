// components/styles.js
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  // Global text style
  text: {
    color: 'white',
    // Add any other text-related styles you want to apply globally
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  subTitle: {
    fontSize: 16,
    color: 'gray',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});


export default globalStyles;
