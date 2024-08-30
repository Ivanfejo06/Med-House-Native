import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Button from '../../../components/Button';
import Entrada from '../../../components/Entrada';
import Logo from '../../../components/LogoInverted';
import BackButton from '../../../components/BackButton';

// Obtener el tamaño de la pantalla
const { height } = Dimensions.get('window');

// Calcular el espacio como un porcentaje de la altura de la pantalla
const SPACE_HEIGHT = height * 0.195; // 19.5% de la altura de la pantalla
const BUTTON_HEIGHT = height * 0.75;

const RegisterPasswordScreen = ({ route, navigation }) => {
  const { nombre, apellido } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  useEffect(() => {
    validateForm();
  }, [password, confirmPassword, email]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasSpecialChar;
  };

  const validateForm = () => {
    // Validar el formato del email
    const emailValid = validateEmail(email);
    // Validar la contraseña
    const passwordValid = validatePassword(password);
    // Validar que las contraseñas coincidan
    const passwordsMatch = password === confirmPassword;

    if (!emailValid || !passwordValid || !passwordsMatch) {
      setIsButtonEnabled(false);
    } else {
      setIsButtonEnabled(true);
    }
  };

  const handleNext = () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'El email no tiene un formato válido.');
    } else if (!validatePassword(password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un símbolo especial.');
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
    } else {
      navigation.navigate('RegisterDNI', { nombre, apellido, password, email });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.space}></View>
        <BackButton onPress={() => navigation.goBack()} color={"#00EDDF"}/>
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
            style={{ backgroundColor: isButtonEnabled ? '#00EDDF' : '#B0B0B0' }} 
            disabled={!isButtonEnabled}
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

export default RegisterPasswordScreen;