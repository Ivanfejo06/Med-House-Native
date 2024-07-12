import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Medhouse = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={require('../assets/LogoV.png')} style={styles.logo} />
      <View style={styles.bar}></View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>MED</Text>
        <Text style={styles.subtitle}>HOUSE</Text>
        <Text style={styles.slogan}>Medicamentos a disposición</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 59,
    height: 120
  },
  logo: {
    width: 45,
    height: 110,
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
});

export default Medhouse;
