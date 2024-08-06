import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '../../../components/Button';
import Logo from '../../../components/Logo';
import Entrada from '../../../components/Entrada';
import SmallButton from '../../../components/SmallButton';
import BackButton from '../../../components/BackButton';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const SPACE_HEIGHT = height * 0.195; // 19.5% de la altura de la pantalla
const BUTTON_HEIGHT = height * 0.75;

const LoginScreen = ({ navigation }) => {
  const [DNI, setDNI] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('Home');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.space}></View>
        <BackButton onPress={() => navigation.goBack()} />
        <Logo />
        <Text style={styles.title}>Iniciar sesión</Text>
        <View>
          <Entrada 
            placeholder="DNI"
            value={DNI}
            onChangeText={setDNI}
            color='#00EDDF'
            isDni={true}
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
            title="¿No tienes cuenta?"
            onPress={() => navigation.navigate('RegisterName')}
            style={styles.forgotPasswordButton}
            textStyle={styles.forgotPasswordText}
            color="#1E98A8"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: 40,
    marginBottom: 20,
    marginTop: 10,
    color: "#1E98A8"
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#1E98A8',
  },
});

export default LoginScreen;