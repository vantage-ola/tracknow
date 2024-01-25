import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import globalStyles from '../components/styles';

const Laptime = () => {
  const [laptimes, setLaptimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://track-now-backend.onrender.com/api/laptimes');
        const data = await response.json();
        setLaptimes(Array.isArray(data) ? data : [data]); // Ensure data is an array
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  const fetchCarData = async (carId) => {
    const response = await fetch(`https://track-now-backend.onrender.com/api/cars/${carId}`);
    return response.json();
  };

  const fetchTrackData = async (trackId) => {
    const response = await fetch(`https://track-now-backend.onrender.com/api/tracks/${trackId}`);
    return response.json();
  };

  const LaptimeItem = ({ item }) => {
    const [carData, setCarData] = useState(null);
    const [trackData, setTrackData] = useState(null);

    useEffect(() => {
      fetchCarData(item.car_id).then(setCarData);
      fetchTrackData(item.track_id).then(setTrackData);
    }, [item.car_id, item.track_id]);

    if (!carData || !trackData) {
      return <ActivityIndicator size="small" color="white" />;
    }

    return (
      <View style={styles.laptimeContainer}>
        <Text style={[globalStyles.text, styles.carName]}>{carData.name}</Text>
        <Text style={[globalStyles.text, styles.laptimeDate]}>{item.date}</Text>
        <View style={styles.laptimeInfoContainer}>
          <Text style={[globalStyles.text, styles.laptimeInfo]}>{item.time}</Text>
          <Text style={[globalStyles.text, styles.laptimeInfo, styles.trackName]}>{trackData.name}</Text>
        </View>
      </View>
    );
  };

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
        data={laptimes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <LaptimeItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', // Dark background
    padding: 16,
  },
  laptimeContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#1c1c1c', // Darker background color
    borderRadius: 8,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4, // Reduced margin
    color: 'white',
  },
  laptimeDate: {
    fontSize: 8, // Smaller font size
    color: 'gray',
    marginBottom: 8,
  },
  laptimeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  laptimeInfo: {
    fontSize: 16,
    color: 'red',
    marginRight: 8,
  },
  trackName: {
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

export default Laptime;
