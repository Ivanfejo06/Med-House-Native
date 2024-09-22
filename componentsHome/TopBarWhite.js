import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BackButton from '../components/BackButtonNormal';

const { height } = Dimensions.get('window');

const TOPBAR_HEIGHT = height * 0.13;
const LINER_WIDTH = height * 0.4260;
const LINER_HEIGHT = height * 0.03521;
const HEIGHT = height * 0.03521;
const BORDERRADIUS = height * 0.029342;

const TopBarWhite = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.liner}>
        <View style={styles.sectionLeft}>
          <BackButton onPress={navigation} color={"#1E98A8"}/>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.sectionRight}>
          <Text></Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: BORDERRADIUS,
    borderBottomRightRadius: BORDERRADIUS,
    width: '100%',
    height: TOPBAR_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative', 
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
  section: {
    alignItems: 'center', // Centra los elementos horizontalmente
    justifyContent: 'flex-start', // Asegura que ocupe el espacio solo según su contenido
    flex: 0, // Establece flex en 0 para que no ocupe más espacio del necesario
  },  
  sectionLeft: {
    alignItems: 'left',
    width: "20%"
  },
  sectionRight: {
    alignItems: 'left',
    width: "20%"
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TopBarWhite;