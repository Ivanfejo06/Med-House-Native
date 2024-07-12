import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../../components/Button';

const RegisterPhotoScreen = ({ route, navigation }) => {
  const { nombre, apellido, password, email, dni } = route.params;

  const handleCreateAccount = () => {
    // Manejar creación de cuenta
    console.log('Crear cuenta presionado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foto de perfil</Text>
      <Button title="Sacate una foto" onPress={() => console.log('Tomar foto presionado')} />
      <Button title="Crear cuenta" onPress={handleCreateAccount}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default RegisterPhotoScreen;