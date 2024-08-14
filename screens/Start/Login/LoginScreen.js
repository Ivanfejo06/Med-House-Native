import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, Animated } from 'react-native';
import axios from 'axios';
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
  const [dni, setDNI] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current; // Valor inicial de la opacidad

  const handleLogin = async () => {
    try {
      // Reemplaza esta URL con la URL de tu API
      const apiUrl = 'http://localhost:3000/usuario/login';

      // Enviar solicitud POST con DNI y contraseña
      const response = await axios.post(apiUrl, {
        dni: dni,
        password: password
      });

      // Comprobar si la autenticación fue exitosa
      if (response.data.success) {
        // Guardar el token en almacenamiento local o contexto global según sea necesario
        const { token } = response.data;

        // Aquí puedes guardar el token en almacenamiento local
        // Ejemplo usando AsyncStorage
        // await AsyncStorage.setItem('userToken', token);

        // Iniciar animación de desvanecimiento
        Animated.timing(fadeAnim, {
          toValue: 0, // Cambiar la opacidad a 0
          duration: 1000, // Duración de la animación en milisegundos
          useNativeDriver: true, // Utilizar el driver nativo para mejor rendimiento
        }).start(() => {
          // Navegar a la pantalla de inicio después de la animación
          navigation.replace('Home');
        });
      } else {
        // Mostrar mensaje de error si la autenticación falló
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión.');
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.space}></View>
        <BackButton onPress={() => navigation.goBack()} />
        <Logo />
        <Text style={styles.title}>Iniciar sesión</Text>
        <View>
          <Entrada 
            placeholder="DNI"
            value={dni}
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
      </Animated.View>
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