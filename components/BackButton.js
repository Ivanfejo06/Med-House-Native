import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const BACK_HEIGHT = height * 0.218;
const BACK_LEFT = height * 0.04;

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Text style={styles.backButtonText}>←</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: BACK_HEIGHT,
    left: BACK_LEFT,
  },
  backButtonText: {
    fontSize: 40,
    color: '#00EDDF',
    fontWeight: 'medium'
  },
});

export default BackButton;