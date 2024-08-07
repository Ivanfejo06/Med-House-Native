import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar
        navigation={navigation}
        selected="home"
      />
      <View style={styles.content}>
        <Text>Home Anashe</Text>
      </View>
      <NavBar 
        navigation={navigation} // Pasar la función de navegación al NavBar
        selected="home" // Indica que el ícono de Home está seleccionado
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
  }
});

export default HomeScreen;