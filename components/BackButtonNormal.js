import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Image source={require('../assets/Back.png')} style={styles.backButtonText}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButtonText: {
    width:25,
    height: 20
  },
});

export default BackButton;