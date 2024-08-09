import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import axios from 'axios'; // Importar axios
import { launchCamera } from 'react-native-image-picker';
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

  const handleTakePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1.0,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('Usuario canceló la toma de foto');
      } else if (response.errorCode) {
        Alert.alert('Error', `Error al tomar la foto: ${response.errorMessage}`);
      } else {
        console.log('Foto tomada:', response.assets[0].uri);
        // Aquí puedes hacer algo con la foto, como subirla a un servidor o mostrarla
      }
    });
  };

  const handleCreateAccount = async () => {
    try {
      // Reemplaza esta URL con la URL de tu API
      const apiUrl = 'http://your-api-url.com/register';

      // Enviar solicitud POST con los datos del usuario
      const response = await axios.post(apiUrl, {
        nombre,
        apellido,
        password,
        email,
        dni
      });

      // Comprobar si la creación de cuenta fue exitosa
      if (response.data.success) {
        // Navegar a la pantalla de inicio o login si la creación de cuenta fue exitosa
        Alert.alert('Éxito', 'Cuenta creada con éxito');
        navigation.replace('Login');
      } else {
        // Mostrar mensaje de error si la creación de cuenta falló
        Alert.alert('Error', 'No se pudo crear la cuenta. Inténtalo de nuevo.');
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
        <Text style={styles.title}>Foto de perfil</Text>
        <Button 
          title="Sácate una foto" 
          onPress={handleTakePhoto} 
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
    height: SPACE_HEIGHT,
  },
  spacebutton: {
    position: 'absolute',
    top: BUTTON_HEIGHT,
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    marginTop: 10,
    color: '#00EDDF',
  },
});

export default RegisterPhotoScreen;