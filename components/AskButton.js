// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

// Definir constantes para width y height en porcentaje
const BUTTON_HEIGHT = height * 0.04694; // Ajusta el porcentaje según lo necesario

const SendButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, style]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    backgroundColor: '#1E98A8',
    alignItems: 'center',
    borderRadius: 15,
    height: BUTTON_HEIGHT,
    width: '100%'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SendButton;