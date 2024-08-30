import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import BackIcon from '../assets/BackIcon';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const BACK_HEIGHT = height * 0.235;
const BACK_LEFT = height * 0.04;

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <BackIcon width={25} height={20} tintColor="#00EDDF"/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: BACK_HEIGHT,
    left: BACK_LEFT,
  }
});

export default BackButton;