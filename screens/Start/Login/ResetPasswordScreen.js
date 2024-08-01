import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Button from '../../../components/Button';
import Logo from '../../../components/Logo';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const SPACE_HEIGHT = height * 0.195; // 19.5% de la altura de la pantalla
const BUTTON_HEIGHT = height * 0.75;
const BACK_HEIGHT = height * 0.218;
const BACK_LEFT = height * 0.04;

const ResetPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    // Manejar cambio de contraseña
    console.log('Cambiar contraseña presionado');
  };

  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Logo style={styles.logo} />
      <Text style={styles.title}>Cambiar contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Repetir contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.spacebutton}>
        <Button 
          title="Cambiar contraseña" 
          onPress={handleResetPassword} 
          style={{ backgroundColor: '#00EDDF' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  space: {
    height: SPACE_HEIGHT
  },
  spacebutton: {
    position: 'absolute',
    top: BUTTON_HEIGHT,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    marginTop: 10,
    color: '#00EDDF'
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: BACK_HEIGHT,
    left: BACK_LEFT,
  },
  backButtonText: {
    fontSize: 40,
    color: '#00EDDF'
  },
  logo: {
    width: 100, // Ajusta el tamaño del logo según sea necesario
    height: 100,
    marginBottom: 20,
  },
});

export default ResetPasswordScreen;