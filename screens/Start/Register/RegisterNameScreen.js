import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '../../../components/Button';
import Entrada from '../../../components/Entrada';
import Logo from '../../../components/LogoInverted';
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

  const handleNext = () => {
    navigation.navigate('RegisterPassword', { nombre, apellido });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.space}></View>
        <BackButton onPress={() => navigation.goBack()} />
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
            style={{ backgroundColor: '#00EDDF' }} 
          />
          <SmallButton
            title="¿Tenes cuenta?"
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
});

export default RegisterNameScreen;