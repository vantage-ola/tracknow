// components/DriverList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import globalStyles from '../components/styles';

const Driver = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://track-now-backend.onrender.com/api/drivers')
      .then((response) => response.json())
      .then((data) => setDrivers(data))
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
        data={drivers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.driverContainer}>
            <Text style={[globalStyles.text, styles.driverName]}>{item.name}</Text>
            <Text style={[globalStyles.text, styles.driverNationality]}>{item.nationality}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  driverContainer: {
    marginBottom: 16,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  driverNationality: {
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

export default Driver;
