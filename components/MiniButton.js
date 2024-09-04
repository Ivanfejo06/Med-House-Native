// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { height} = Dimensions.get('window');

// Definir constantes para width y height en porcentaje
const BORDER_RADIUS = height * 0.0176; // Ajustar el radio del borde como porcentaje de la altura del botón

const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, { borderRadius: BORDER_RADIUS }, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    backgroundColor: '#1E98A8',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default Button;