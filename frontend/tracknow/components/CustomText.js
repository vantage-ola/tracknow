// CustomText.js

import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const loadCustomFonts = async () => {
  await Font.loadAsync({
    'SofiaSans-Regular': require('../assets/fonts/SofiaSans-Regular.ttf'),
    // Add more fonts as needed
  });
};

const CustomText = ({ children, style, ...rest }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadCustomFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading
  }

  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SofiaSans-Regular', // Default font family
  },
});

export default CustomText;
