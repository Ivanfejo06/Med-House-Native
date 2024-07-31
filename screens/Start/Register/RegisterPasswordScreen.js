import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../../components/Button';
import Entrada from '../../../components/Entrada';
import Logo from '../../../components/LogoInverted';

const RegisterPasswordScreen = ({ route, navigation }) => {
  const { nombre, apellido } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    navigation.navigate('RegisterDNI', { nombre, apellido, password, email });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Logo />
      <Text style={styles.title}>Escribe tu contraseña</Text>
      <Entrada 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        color="#1E98A8"
      />
      <Entrada 
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        color='#00EDDF'
      />
      <Entrada 
        placeholder="Repetir contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        color="#1E98A8"
      />
      <Button 
        title="Siguiente" 
        onPress={handleNext} 
        style={{ backgroundColor: '#00EDDF' }} 
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

export default RegisterPasswordScreen;