import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Entrada = ({ placeholder, value, onChangeText, color, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderBottomColor: color, color: color }]}
        placeholder={placeholder}
        placeholderTextColor={color}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    width: 263,       // Ancho según la imagen
    height: 33,       // Altura según la imagen
    borderBottomWidth: 2,
    fontSize: 18,     // Tamaño de fuente ajustado según la imagen
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Entrada;