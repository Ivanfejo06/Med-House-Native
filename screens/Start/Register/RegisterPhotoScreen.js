import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../../components/Button';
import Logo from '../../../components/LogoInverted';

const RegisterPhotoScreen = ({ route, navigation }) => {
  const { nombre, apellido, password, email, dni } = route.params;

  const handleCreateAccount = () => {
    // Manejar creación de cuenta
    console.log('Crear cuenta presionado');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Logo />
      <Text style={styles.title}>Foto de perfil</Text>
      <Button title="Sácate una foto" onPress={() => console.log('Tomar foto presionado')} />
      <Button title="Crear cuenta" onPress={handleCreateAccount} />
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
    fontSize: 40,
    marginBottom: 20,
    marginTop: 10,
    color: '#00EDDF'
  },
  backButton: {
    position: 'relative',
    top: 67,
    left: -140,
  },
  backButtonText: {
    fontSize: 40,
    color: '#00EDDF'
  },
});

export default RegisterPhotoScreen;