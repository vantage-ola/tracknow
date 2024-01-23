import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import CustomText from './CustomText';

const YourComponent = () => {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    // Set up a blinking effect with setInterval
    const intervalId = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 500); // Adjust the blinking interval in milliseconds (e.g., 500ms)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>
        TRACK<CustomText style={styles.redText}>NOW</CustomText> IN PROGRESS{isBlinking ? '_' : ''}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark background color
  },
  title: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
  redText: {
    color: 'red', // Make the "NOW" part red
  },
});

export default YourComponent;
