// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    backgroundColor: '#1E98A8',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    width: 299,
    height: 50,
    borderRadius: 15
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default Button;