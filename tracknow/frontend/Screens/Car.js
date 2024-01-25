import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import globalStyles from '../components/styles';

const Car = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://track-now-backend.onrender.com/api/cars')
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []); // Empty dependency array ensures the effect runs only once

  if (loading) {
    return <ActivityIndicator size="large" color="white" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[globalStyles.text, styles.errorText]}>Error fetching data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.carContainer}>
            <Text style={[globalStyles.text, styles.carName]}>{item.name}</Text>
            <Text style={[globalStyles.text, styles.carClass]}>{item.car_class}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set background color to black
    padding: 16,
  },

  carContainer: {
    marginBottom: 16,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carClass: {
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

export default Car;
