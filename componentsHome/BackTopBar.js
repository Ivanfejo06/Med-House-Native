import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import BackButton from '../components/BackButtonNormalWhite';

const { height } = Dimensions.get('window');

const TOPBAR_HEIGHT = height * 0.13;
const LINER_HEIGHT = height * 0.03521;
const HEIGHT = height * 0.03521;
const BORDERRADIUS = height * 0.029342;

const BackTopBar = ({ navigation, profile }) => {
  return (
    <View style={styles.container}>
      <View style={styles.liner}>
        <BackButton onPress={navigation} />
        <View style={styles.searchBar}></View>
        <TouchableOpacity style={styles.pfp} onPress={profile}>
          <Image source={require('../assets/Face.png')} style={styles.pfp} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#1E98A8',
    borderBottomLeftRadius: BORDERRADIUS,
    borderBottomRightRadius: BORDERRADIUS,
    width: '100%',
    height: TOPBAR_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative', // Esto es necesario para que 'liner' pueda posicionarse absolutamente dentro de 'container'
  },
  liner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: LINER_HEIGHT,
    bottom: HEIGHT/2, 
    marginLeft: 15,
    marginRight: 15
  },
  button: {
    alignItems: 'center',
  },
  pfp: {
    width: HEIGHT,
    height: HEIGHT,
    borderRadius: HEIGHT/2
  },
  searchBar: {
    flex: 1,
    height: HEIGHT,
    marginHorizontal: 15, // Espacio entre la barra de búsqueda y el botón de perfil
    borderRadius: HEIGHT / 2,
    backgroundColor: "#FFFFFF",
  }
});

export default BackTopBar;