import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';

const BolsaScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar
        navigation={navigation}
        selected="home"
      />
      <View style={styles.content}>
        <Text>Bolsa Anashe</Text>
      </View>
      <NavBar 
        navigation={navigation} // Pasar la función de navegación al NavBar
        selected="bolsa" // Indica que el ícono de Home está seleccionado
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
  }
});

export default BolsaScreen;