// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

// Definir constantes para width y height en porcentaje
const BUTTON_WIDTH = height * 0.4260; // Ajusta el porcentaje según lo necesario
const BUTTON_HEIGHT = height * 0.04694; // Ajusta el porcentaje según lo necesario
const BORDER_RADIUS = height * 0.0176; // Ajustar el radio del borde como porcentaje de la altura del botón

const SendButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
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
    margin: 15,
    borderRadius: 15,
    height: BUTTON_HEIGHT
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SendButton;