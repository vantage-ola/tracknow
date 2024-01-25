import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import globalStyles from '../components/styles';

const Track = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://track-now-backend.onrender.com/api/tracks')
      .then((response) => response.json())
      .then((data) => setTracks(data))
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
        data={tracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.trackContainer}>
            <Text style={[globalStyles.text, styles.trackName]}>{item.name}</Text>
            <Text style={[globalStyles.text, styles.trackDetails]}>
              {item.location.city}, {item.location.country} - {item.length}
            </Text>
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
  trackContainer: {
    marginBottom: 16,
  },
  trackName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  trackDetails: {
    fontSize: 16,
    color: 'gray',
  },
  trackGrade: {
    fontSize: 16,
    color: 'white',
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

export default Track;
