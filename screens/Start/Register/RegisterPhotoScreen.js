import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '../../../components/Button';
import Logo from '../../../components/LogoInverted';
import BackButton from '../../../components/BackButton';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const SPACE_HEIGHT = height * 0.195; // 19.5% de la altura de la pantalla
const BUTTON_HEIGHT = height * 0.75;

const RegisterPhotoScreen = ({ route, navigation }) => {
  const { nombre, apellido, password, email, dni } = route.params;

  const handleCreateAccount = () => {
    // Manejar creación de cuenta
    console.log('Crear cuenta presionado');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.space}></View>
        <BackButton onPress={() => navigation.goBack()} />
        <Logo />
        <Text style={styles.title}>Foto de perfil</Text>
        <Button 
          title="Sácate una foto" 
          onPress={() => console.log('Tomar foto presionado')} 
          style={{ backgroundColor: '#1E98A8' }}
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
    fontSize: 40,
    marginBottom: 20,
    marginTop: 10,
    color: '#00EDDF'
  },
});

export default RegisterPhotoScreen;