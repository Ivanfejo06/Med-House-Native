import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image} from 'react-native';
import Button from '../../../components/Button';
import Logo from '../../../components/Logo';

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
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Olvidé mi contraseña"
        onPress={() => navigation.navigate('ForgotPassword')}
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
    fontSize: 24,
    marginBottom: 20,
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