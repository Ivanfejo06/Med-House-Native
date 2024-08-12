import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const BACK_HEIGHT = height * 0.083
const BACK_LEFT = height * 0.02;

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Image source={require('../assets/BackWhite.png')} style={styles.backButtonText}/>
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