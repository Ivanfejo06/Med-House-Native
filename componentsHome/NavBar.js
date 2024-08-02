import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const NAVBAR_HEIGHT = height * 0.0974;
const LINER_HEIGHT = height * 0.0469;
const LINER_WIDTH = height * 0.3873;
const BORDERRADIUS = height * 0.029342;
const MARGIN = height * 0.007042;
const PUBLISH_HEIGHT = height * 0.046948;
const PUBLISH_WIDTH = height * 0.111737;

const NavBar = ({ navigation, selected }) => {
  return (
    <View style={styles.container}>
      <View style={styles.liner}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/Home.png')} style={[styles.icon, selected === 'home' && styles.selectedIcon]} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bolsa')}>
          <Image source={require('../assets/Bolsa.png')} style={[styles.icon, selected === 'bolsa' && styles.selectedIcon]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Publish Pressed')}>
          <View style={styles.publish}>
            <Text style={styles.textPublish}>Publicar</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Donaciones')}>
          <Image source={require('../assets/Donaciones.png')} style={[styles.icon, selected === 'donaciones' && styles.selectedIcon]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Notificaciones')}>
          <Image source={require('../assets/Notificaciones.png')} style={[styles.icon, selected === 'notificaciones' && styles.selectedIcon]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: BORDERRADIUS,
    borderTopRightRadius: BORDERRADIUS,
    width: '100%', 
    height: NAVBAR_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  liner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: LINER_WIDTH, 
    height: LINER_HEIGHT,
    marginTop: MARGIN
  },
  button: {
    alignItems: 'center',
  },
  icon: {
    width: BORDERRADIUS,
    height: BORDERRADIUS,
    overflow: "visible"
  },
  selectedIcon: {
    tintColor: '#1E98A8', 
  },
  publish: {
    width: PUBLISH_WIDTH,
    height: PUBLISH_HEIGHT,
    backgroundColor: "#1E98A8",
    borderRadius: PUBLISH_HEIGHT/2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textPublish: {
    color: "#FFFFFF",
    fontSize: 18
  },
});

export default NavBar;