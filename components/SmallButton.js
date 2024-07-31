import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SmallButton = ({ title, onPress, style, textStyle, color }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle, { color: color || '#00EDDF' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5, // Ajustado según el diseño
  },
  text: {
    fontSize: 16,     // Tamaño de fuente según el diseño
    fontFamily: 'Exo2-SemiBold', // Familia de fuente según el diseño
  },
});

export default SmallButton;