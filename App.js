import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Button from './Button';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/Logo.png')} style={styles.logo} />
        <View style={styles.bar}></View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>MED</Text>
          <Text style={styles.subtitle}>HOUSE</Text>
          <Text style={styles.slogan}>Medicamentos a disposición</Text>
        </View>
      </View>
      <Button
        title="Iniciar sesión"
        onPress={() => console.log('Iniciar sesión presionado')}
        style={{ backgroundColor: '#00EDDF' }}
      />
      <Button
        title="Crear cuenta"
        onPress={() => console.log('Crear cuenta presionado')}
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 59,
    height: 120
  },
  logo: {
    height: 110,
    width: 45
  },
  bar:{
    width: 4,
    height: 120,
    backgroundColor: '#1E98A8',
    borderRadius: 2,
    marginLeft: 21
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    height: 56,
    fontSize: 56,
    fontWeight: 'bold',
    color: '#1E98A8',
    fontFamily: 'Exo2-Regular', // Asegúrate de que el nombre de la fuente sea correcto,
  },
  subtitle: {
    height: 56,
    position: 'relative',
    fontSize: 56,
    fontWeight: 'regular',
    color: '#1E98A8',
    fontFamily: 'MiFuente-Regular', // Asegúrate de que el nombre de la fuente sea correcto
  },
  slogan: {
    height: 29,
    fontSize: 16.5,
    fontWeight: 'medium',
    color: '#00EDDF',
    fontFamily: 'MiFuente-Regular', // Asegúrate de que el nombre de la fuente sea correcto
  },
  question: {
    fontSize: 20,
    color: '#1E98A8',
    marginTop: 20,
    fontFamily: 'Exo2-Regular', // Asegúrate de que el nombre de la fuente sea correcto
  },
});

export default App;