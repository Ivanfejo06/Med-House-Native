import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../../components/Button';
import Logo from '../../../components/Logo';
import Entrada from '../../../components/Entrada';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Manejar recuperación de contraseña
    console.log('Enviar mail presionado');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Logo />
      <Text style={styles.title}>Recuperar contraseña</Text>
      <Entrada 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        color='#00EDDF'
      />
      <Button 
        title="Enviar mail" 
        onPress={handleForgotPassword}
        style={{ backgroundColor: "#1E98A8" }}
      />
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
    fontSize: 32,
    marginBottom: 20,
    marginTop: 10,
    color: "#1E98A8"
  },
  backButton: {
    position: 'relative',
    top: 67,
    left: -140,
  },
  backButtonText: {
    fontSize: 40,
    color: "#1E98A8"
  },
});

export default ForgotPasswordScreen;