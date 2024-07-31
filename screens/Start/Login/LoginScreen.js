import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import Button from '../../../components/Button';
import Logo from '../../../components/Logo';
import Entrada from '../../../components/Entrada';
import SmallButton from '../../../components/SmallButton'

const LoginScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Manejar inicio de sesión
    console.log('Iniciar sesión presionado');
  };

  return (
    <View style={styles.container}>
    <Logo></Logo>
      <Text style={styles.title}>Iniciar sesión</Text>
      
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

      <Entrada 
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        color="#1E98A8"
        secureTextEntry={true}
      />

      <SmallButton 
        title="Olvidé mi contraseña"
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.forgotPasswordButton}
        textStyle={styles.forgotPasswordText}
        color='#00EDDF'
      />

      <Button 
        title="Iniciar sesión" 
        onPress={handleLogin} 
        style={{ backgroundColor: '#00EDDF' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    color: "#1E98A8"
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 10,
  },
});

export default LoginScreen;