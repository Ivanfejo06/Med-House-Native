import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Button from '../../../components/Button';
import Entrada from '../../../components/Entrada';
import Logo from '../../../assets/LogoInverted';
import SmallButton from '../../../components/SmallButton';
import BackButton from '../../../components/BackButton';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const SPACE_HEIGHT = height * 0.195; // 19.5% de la altura de la pantalla
const BUTTON_HEIGHT = height * 0.75;

const RegisterNameScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  useEffect(() => {
    validateForm();
  }, [nombre, apellido]);

  const validateForm = () => {
    // Validar que los campos no estén vacíos, no superen los 40 caracteres y tengan más de 3 letras
    if (
      nombre.trim() === '' ||
      apellido.trim() === '' ||
      nombre.length > 40 ||
      apellido.length > 40 ||
      nombre.length < 3 ||
      apellido.length < 3
    ) {
      setIsButtonEnabled(false);
    } else {
      setIsButtonEnabled(true);
    }
  };  

  const handleNext = () => {
    if (nombre.trim() === '' || apellido.trim() === '') {
      Alert.alert('Error', 'Todos los campos deben ser completados.');
    } else if (nombre.length > 40 || apellido.length > 40) {
      Alert.alert('Error', 'Los campos no deben superar los 40 caracteres.');
    } else if (nombre.length < 3 || apellido.length < 3) {
      Alert.alert('Error', 'Los campos deben tener más de 3 letras.');
    } else {
      navigation.navigate('RegisterPassword', { nombre, apellido });
    }
  };  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.space}></View>
        <BackButton onPress={() => navigation.goBack()} color={"#00EDDF"}/>
        <Logo />
        <Text style={styles.title}>Crear cuenta</Text>
        <Entrada 
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          color="#1E98A8"
        />
        <Entrada 
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
          color='#00EDDF'
        />
        <View style={styles.spacebutton}>
          <Button 
            title="Siguiente" 
            onPress={handleNext} 
            style={{ backgroundColor: isButtonEnabled ? '#00EDDF' : '#B0B0B0' }} 
            disabled={!isButtonEnabled}
          />
          <SmallButton
            title="¿Tenés cuenta?"
            onPress={() => navigation.navigate('Login')}
            style={styles.forgotPasswordButton}
            textStyle={styles.forgotPasswordText}
            color='#00EDDF'
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
    color: '#00EDDF'
  },
  forgotPasswordButton: {
    // Añadir estilo para el botón pequeño si es necesario
  },
  forgotPasswordText: {
    // Añadir estilo para el texto del botón pequeño si es necesario
  },
});

export default RegisterNameScreen;