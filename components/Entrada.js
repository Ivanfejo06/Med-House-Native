import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Entrada = ({ placeholder, value, onChangeText, color, secureTextEntry, isDni }) => {
  const [formattedValue, setFormattedValue] = useState('');

  useEffect(() => {
    if (isDni) {
      setFormattedValue(formatDni(value));
    } else {
      setFormattedValue(value);
    }
  }, [value]);

  const handleChange = (text) => {
    if (isDni) {
      const cleanText = text.replace(/\D/g, '').substring(0, 8);
      const formattedText = formatDni(cleanText);
      onChangeText(cleanText);
    } else {
      onChangeText(text);
    }
  };

  const formatDni = (text) => {
    let formattedText = '';
    for (let i = text.length - 1, j = 1; i >= 0; i--, j++) {
      formattedText = text[i] + formattedText;
      if (j % 3 === 0 && i !== 0) {
        formattedText = '.' + formattedText;
      }
    }
    return formattedText;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderBottomColor: color, color: color }]}
        placeholder={placeholder}
        placeholderTextColor={color}
        value={formattedValue}
        onChangeText={handleChange}
        secureTextEntry={secureTextEntry}
        keyboardType={isDni ? 'numeric' : 'default'}
        maxLength={isDni ? 11 : undefined} // 8 dígitos más 2 puntos
        onSubmitEditing={() => Keyboard.dismiss()} // Oculta el teclado al enviar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    width: 263,
    height: 33,
    borderBottomWidth: 2,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Entrada;