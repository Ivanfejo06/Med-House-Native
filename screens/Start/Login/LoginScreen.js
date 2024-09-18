import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Button from '../../../components/Button';
import Logo from '../../../assets/Logo';
import Entrada from '../../../components/Entrada';
import SmallButton from '../../../components/SmallButton';
import BackButton from '../../../components/BackButton';
import { setUser } from '../../../store/userSlice';

const { height } = Dimensions.get('window');
const SPACE_HEIGHT = height * 0.195;
const BUTTON_HEIGHT = height * 0.75;

const LoginScreen = ({ navigation }) => {
  const [dni, setDNI] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const dispatch = useDispatch();

  const validateDNI = () => dni.length >= 8;
  const validateForm = () => {
    if (validateDNI(dni) && password.trim() !== '') {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [dni, password]);

  const handleLogin = async () => {
    if (!validateDNI(dni)) {
      Alert.alert('Error', 'El DNI debe tener al menos 8 caracteres.');
      return;
    }

    if (password.trim() === '') {
      Alert.alert('Error', 'La contraseña no puede estar vacía.');
      return;
    }

    try {
      const apiUrl = 'https://hopeful-emerging-snapper.ngrok-free.app/usuario/login';
      const response = await axios.post(apiUrl, { dni, password });

      if (response.data.success) {
        const { token, user } = response.data;
        dispatch(setUser({ token, user }));

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          navigation.replace('Home');
        });
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión.');
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.space}></View>
        <BackButton onPress={() => navigation.goBack()} color={"#00EDDF"}/>
        <Logo />
        <Text style={styles.title}>Iniciar sesión</Text>
        <View>
          <Entrada placeholder="DNI" value={dni} onChangeText={setDNI} color='#00EDDF' isDni={true} />
          <Entrada placeholder="Contraseña" value={password} onChangeText={setPassword} color='#1E98A8' secureTextEntry={true} />
          <SmallButton title="Olvidé mi contraseña" onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPasswordButton} textStyle={styles.forgotPasswordText} color="#00EDDF" />
        </View>
        <View style={styles.spacebutton}>
          <Button title="Iniciar sesión" onPress={handleLogin} style={{ backgroundColor: isButtonEnabled ? '#1E98A8' : '#B0B0B0' }} disabled={!isButtonEnabled} />
          <SmallButton title="¿No tienes cuenta?" onPress={() => navigation.navigate('RegisterName')} style={styles.forgotPasswordButton} textStyle={styles.forgotPasswordText} color="#1E98A8" />
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
    color: "#1E98A8",
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#1E98A8',
  },
});

export default LoginScreen;