import React from 'react';
import { View, Button, StyleSheet, Dimensions, Text, Image } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import ProfileNavigator from '../../componentsHome/ProfileNavigator';

const { height } = Dimensions.get('window');

const CONTENT_WIDTH = height * 0.4260;
const CONTENT_HEIGHT = height * 0.8;
const BORDERRADIUS = height * 0.029342;
const SPACING = height * 0.026;

const ProfileIndex = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Perfil"
      />
      <View style={styles.content}>
        <View style={styles.salute}>
          <Image source={require('../../assets/Face.png')} style={styles.foto} />
          <View style={styles.user}>
            <Text style={styles.hello}>Hola!</Text>
            <Text style={styles.name}>Juanito Perez</Text>
          </View>
        </View>

        <ProfileNavigator
          image={"image1"}
          onPress={() => navigation.navigate("ProfileScreen")}
          text={"Mi Perfil"}
        />
        <ProfileNavigator
          image={"image2"}
          onPress={() => navigation.navigate("AuthenticationScreen")}
          text={"Autenticación"}
        />
        <ProfileNavigator
          image={"image3"}
          onPress={() => navigation.navigate("Donaciones")}
          text={"Donaciones"}
        />
        <ProfileNavigator
          image={"image4"}
          onPress={() => navigation.navigate("Bolsa")} //CAMBIAR RUTA DESPUES DE CREAR DESEADOS DENTRO DE BOLSA
          text={"Deseados"}
        />
        <ProfileNavigator
          image={"image5"}
          onPress={() => navigation.navigate('Start')}
          text={"Cerrar Sesión"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  content: {
    marginTop: SPACING,
    backgroundColor: "#FFFFFF",
    borderRadius: BORDERRADIUS,
    height: CONTENT_HEIGHT,
    width: CONTENT_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  salute:{
    flexDirection: 'row',
    justifyContent: "center",
    margin: 40
  },
  foto: {
    width: 100,
    height: 100
  },
  user:{
    flexDirection: "column",
    justifyContent: "center"
  },
  hello:{
    fontSize: 20,
  },
  name:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E98A8"
  }
});

export default ProfileIndex;