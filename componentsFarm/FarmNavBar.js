import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import HomeIcon from '../assets/HomeIcon';
import NotificacionesIcon from '../assets/NotificacionesIcon';
import ValidatedIcon from '../assets/ValidatedIcon';

const { height } = Dimensions.get('window');

const NAVBAR_HEIGHT = height * 0.0974;
const LINER_HEIGHT = height * 0.0469;
const BORDERRADIUS = height * 0.029342;
const MARGIN = height * 0.007042;
const PUBLISH_HEIGHT = height * 0.046948;

const FarmNavBar = ({ navigation, selected }) => {
  return (
    <View style={styles.container}>
      <View style={styles.liner}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FarmHome')}>
          <HomeIcon width={BORDERRADIUS} height={BORDERRADIUS} tintColor={selected === 'home' ? '#1E98A8' : '#A8A8A8'} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FarmHistory')}>
          <ValidatedIcon width={BORDERRADIUS} height={BORDERRADIUS} tintColor={selected === 'donaciones' ? '#1E98A8' : '#A8A8A8'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FarmNotificaciones')}>
          <NotificacionesIcon width={BORDERRADIUS} height={BORDERRADIUS} tintColor={selected === 'notificaciones' ? '#1E98A8' : '#A8A8A8'} />
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
    bottom: 0,
    position: "absolute"
  },
  liner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: LINER_HEIGHT,
    marginTop: MARGIN,
    width: '100%',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    overflow: "visible",
  },
  publish: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#1E98A8",
    borderRadius: PUBLISH_HEIGHT / 2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Añade esta línea para Android
  },
  textPublish: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default FarmNavBar;