import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const BACK_HEIGHT = height * 0.218;
const BACK_LEFT = height * 0.04;

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Image source={require('../assets/BackBlue.png')} style={styles.backButtonText}/>
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
    width:25,
    height: 20
  },
});

export default BackButton;