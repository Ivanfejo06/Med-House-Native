// ProfileIndex.js
import React from 'react';
import { View, Button, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import ProfileNavigator from '../../componentsHome/ProfileNavigator';
import { clearUser } from '../../store/userSlice';

const { height } = Dimensions.get('window');

const CONTENT_HEIGHT = height * 0.8;

const ProfileIndex = ({ navigation }) => {
  const user = useSelector(state => state.user.user); // Obtén el usuario global
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser()); // Limpia el token y la información del usuario
    navigation.replace('Start'); // Navega a la pantalla de login
  };

  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Perfil"
      />
      <View style={styles.center}>
        <View style={styles.content}>
          <View style={styles.salute}>
            <Image source={require('../../assets/Face.png')} style={styles.foto} />
            <View style={styles.user}>
              <Text style={styles.hello}>Hola!</Text>
              <Text style={styles.name}>{user ? `${user.nombre} ${user.apellido}` : 'Invitado'}</Text>
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
            onPress={() => navigation.navigate("Deseados")}
            text={"Deseados"}
          />
          <ProfileNavigator
            image={"image5"}
            onPress={handleLogout}
            text={"Cerrar Sesión"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  center:{
    width: '100%',
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignContent: "center"
  }, 
  content: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    height: CONTENT_HEIGHT,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxWidth: 700
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