import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Button from '../../../components/Button';
import Logo from '../../../components/Logo';
import Entrada from '../../../components/Entrada';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const SPACE_HEIGHT = height * 0.195; // 19.5% de la altura de la pantalla
const BUTTON_HEIGHT = height * 0.75;
const BACK_HEIGHT = height * 0.218;
const BACK_LEFT = height * 0.04;

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Manejar recuperación de contraseña
    console.log('Enviar mail presionado');
  };

  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
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
      <View style={styles.spacebutton}>
        <Button 
          title="Enviar mail" 
          onPress={handleForgotPassword}
          style={{ backgroundColor: "#1E98A8" }}
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
    color: "#1E98A8",
  },
  backButton: {
    position: 'absolute',
    top: BACK_HEIGHT,
    left: BACK_LEFT,
  },
  backButtonText: {
    fontSize: 40,
    color: "#1E98A8",
    fontWeight: "medium"
  },
});

export default ForgotPasswordScreen;