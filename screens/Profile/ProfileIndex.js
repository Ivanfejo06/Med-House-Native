// ProfileIndex.js
import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import ProfileIcon from '../../assets/ProfileIcon';
import AuthIcon from '../../assets/AuthIcon';
import DonacionesIcon from '../../assets/DonacionesIcon';
import DeseadosIcon from '../../assets/DeseadosIcon';
import LogoutIcon from '../../assets/LogoutIcon';
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
              <Text style={styles.hello}>Hola,</Text>
              <Text style={styles.name}>{user ? `${user.nombre} ${user.apellido}` : 'Invitado'}!</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.navigatorContainer} onPress={() => navigation.navigate("ProfileScreen")}>
            <View style={styles.navigatorContent}>
              <View style={styles.icon} >
                <ProfileIcon width={30} height={30}/>
              </View>
              <Text style={styles.navigatorText}>Mi Perfil</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigatorContainer} onPress={() => navigation.navigate("AuthenticationScreen")}>
            <View style={styles.navigatorContent}>
              <View style={styles.icon} >
                <AuthIcon width={30} height={30}/>
              </View>
              <Text style={styles.navigatorText}>Autenticación</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigatorContainer} onPress={() => navigation.navigate("Donaciones")}>
            <View style={styles.navigatorContent}>
              <View style={styles.icon} >
                <DonacionesIcon width={30} height={30}/>
              </View>
              <Text style={styles.navigatorText}>Donaciones</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigatorContainer} onPress={() => navigation.navigate("Deseados")}>
            <View style={styles.navigatorContent}>
              <View style={styles.icon} >
                <DeseadosIcon width={30} height={30}/>
              </View>
              <Text style={styles.navigatorText}>Deseados</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigatorContainer} onPress={handleLogout}>
            <View style={styles.navigatorContent}>
              <View style={styles.icon} >
                <LogoutIcon width={30} height={30}/>
              </View>
              <Text style={styles.navigatorText}>Cerrar Sesión</Text>
            </View>
          </TouchableOpacity>

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
  center: {
    width: '100%',
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignContent: "center"
  }, 
  content: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height: CONTENT_HEIGHT,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxWidth: 700
  },
  salute: {
    flexDirection: 'row',
    justifyContent: "center",
    margin: 40
  },
  foto: {
    width: 100,
    height: 100
  },
  user: {
    flexDirection: "column",
    justifyContent: "center"
  },
  hello: {
    fontSize: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E98A8"
  },
  navigatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#A8A8A8',
    paddingBottom: 20,
  },
  navigatorContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: height * 0.18,
  },
  navigatorText: {
    color: '#A8A8A8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 15,
  },
});

export default ProfileIndex;