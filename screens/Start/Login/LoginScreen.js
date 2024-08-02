import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Button from '../../../components/Button';
import Logo from '../../../components/Logo';
import Entrada from '../../../components/Entrada';
import SmallButton from '../../../components/SmallButton';

// Obtener el tamaño de la pantalla
const { height, width } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const SPACE_HEIGHT = height * 0.195; // 5% de la altura de la pantalla
const BUTTON_HEIGHT = height * 0.75;
const BACK_HEIGHT = height * 0.218;
const BACK_LEFT = height * 0.04;

const LoginScreen = ({ navigation }) => {
  const [DNI, setDNI] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Logo/>
      <Text style={styles.title}>Iniciar sesión</Text>
      <View>
        <Entrada 
          placeholder="DNI"
          value={DNI}
          onChangeText={setDNI}
          color='#00EDDF'
        />
        <Entrada 
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          color='#1E98A8'
          secureTextEntry={true}
        />
        <SmallButton 
          title="Olvidé mi contraseña"
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotPasswordButton}
          textStyle={styles.forgotPasswordText}
          color="#00EDDF"
        />
      </View>
      <View style={styles.spacebutton}>
        <Button 
          title="Iniciar sesión" 
          onPress={handleLogin} 
          style={{ backgroundColor: "#1E98A8" }}
        />
        <SmallButton
          title="¿No tenes cuenta?"
          onPress={() => navigation.navigate('RegisterName')}
          style={styles.forgotPasswordButton}
          textStyle={styles.forgotPasswordText}
          color="#1E98A8"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  space: {
    height: SPACE_HEIGHT
  },
  spacebutton:{
    position: 'absolute',
    top: BUTTON_HEIGHT
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    marginTop: 10,
    color: "#1E98A8"
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
    left: BACK_LEFT
  },
  backButtonText: {
    fontSize: 40,
    color: "#1E98A8",
    fontWeight: "medium"
  }
});

export default LoginScreen;