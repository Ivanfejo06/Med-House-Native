import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import axios from 'axios'; // Importar axios
import Button from '../../../components/Button';
import Entrada from '../../../components/Entrada';
import Logo from '../../../components/LogoInverted';
import BackButton from '../../../components/BackButton';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const SPACE_HEIGHT = height * 0.195; // 19.5% de la altura de la pantalla
const BUTTON_HEIGHT = height * 0.75;

const RegisterDNIScreen = ({ route, navigation }) => {
  const { nombre, apellido, password, email } = route.params;
  const [dni, setDNI] = useState('');

  const handleCreateAccount = async () => {
    try {
      // Reemplaza esta URL con la URL de tu API
      const apiUrl = 'http://localhost:3000/usuario/register';

      // Enviar solicitud POST con los datos del usuario
      const response = await axios.post(apiUrl, {
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        password: password,
        email: email
      });

      // Comprobar si la creación de cuenta fue exitosa
      if (response.data.success) {
        // Navegar a la pantalla de inicio o login si la creación de cuenta fue exitosa
        Alert.alert('Éxito', response.data.message);
        navigation.replace('Login');
      } else {
        // Mostrar mensaje de error si la creación de cuenta falló
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      Alert.alert('Error', 'Ocurrió un error al intentar crear la cuenta.');
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.space}></View>
        <BackButton onPress={() => navigation.goBack()} />
        <Logo />
        <Text style={styles.title}>Ingrese su DNI</Text>
        <Entrada 
          placeholder="DNI"
          value={dni}
          onChangeText={setDNI}
          color='#00EDDF'
          isDni={true}
        />
        <View style={styles.spacebutton}>
          <Button 
            title="Crear cuenta" 
            onPress={handleCreateAccount} 
            style={{ backgroundColor: '#00EDDF' }} 
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
    fontSize: 32,
    marginBottom: 20,
    marginTop: 10,
    color: '#00EDDF'
  },
});

export default RegisterDNIScreen;