// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

// Definir constantes para width y height en porcentaje
const BUTTON_WIDTH = height * 0.3509; // Ajusta el porcentaje según lo necesario
const BUTTON_HEIGHT = height * 0.0586; // Ajusta el porcentaje según lo necesario
const BORDER_RADIUS = height * 0.0176; // Ajustar el radio del borde como porcentaje de la altura del botón

const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, { width: BUTTON_WIDTH, height: BUTTON_HEIGHT, borderRadius: BORDER_RADIUS }, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    backgroundColor: '#1E98A8',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default Button;