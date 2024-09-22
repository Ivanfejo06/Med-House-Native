import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

// Definir constantes para width y height en porcentaje
const BUTTON_HEIGHT = height * 0.04694; // Ajusta el porcentaje según lo necesario

const SendButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={disabled ? null : onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    backgroundColor: '#1E98A8',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 15,
    height: BUTTON_HEIGHT,
  },
  disabledButton: {
    backgroundColor: '#B0B0B0', // Color del botón cuando está deshabilitado
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SendButton;