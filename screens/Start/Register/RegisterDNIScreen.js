import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../../components/Button';
import Entrada from '../../../components/Entrada';
import Logo from '../../../components/LogoInverted';

const RegisterDNIScreen = ({ route, navigation }) => {
  const { nombre, apellido, password, email } = route.params;
  const [dni, setDni] = useState('');

  const handleNext = () => {
    navigation.navigate('RegisterPhoto', { nombre, apellido, password, email, dni });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Logo></Logo>
      <Text style={styles.title}>Ingresa tu DNI</Text>
      <Entrada 
        placeholder="DNI"
        value={dni}
        onChangeText={setDni}
        color="#1E98A8"
      />
      <Button title="Siguiente" onPress={handleNext} style={{ backgroundColor: '#00EDDF' }} />
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

export default RegisterDNIScreen;