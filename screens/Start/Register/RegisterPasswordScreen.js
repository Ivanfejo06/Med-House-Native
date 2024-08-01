import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Button from '../../../components/Button';
import Entrada from '../../../components/Entrada';
import Logo from '../../../components/LogoInverted';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const SPACE_HEIGHT = height * 0.195; // 19.5% de la altura de la pantalla
const BUTTON_HEIGHT = height * 0.75;
const BACK_HEIGHT = height * 0.218;
const BACK_LEFT = height * 0.04;

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
      <View style={styles.space}></View>
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
      <View style={styles.spacebutton}>
        <Button 
          title="Siguiente" 
          onPress={handleNext} 
          style={{ backgroundColor: '#00EDDF' }} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  space: {
    height: SPACE_HEIGHT
  },
  spacebutton: {
    position: 'absolute',
    top: BUTTON_HEIGHT
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    marginTop: 10,
    color: '#00EDDF'
  },
  backButton: {
    position: 'absolute',
    top: BACK_HEIGHT,
    left: BACK_LEFT,
  },
  backButtonText: {
    fontSize: 40,
    color: '#00EDDF',
    fontWeight: 'medium'
  },
});

export default RegisterPasswordScreen;