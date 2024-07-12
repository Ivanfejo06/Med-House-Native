import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import MedHouse from '../../components/MedHouse';

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MedHouse/>
      <Button
        title="Iniciar sesión"
        onPress={() => navigation.navigate('Login')}
        style={{ backgroundColor: '#00EDDF' }}
      />
      <Button
        title="Crear cuenta"
        onPress={() => navigation.navigate('RegisterName') }
      />
      <Text style={styles.question}>¿Sos medico?</Text>
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
  question: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default StartScreen;