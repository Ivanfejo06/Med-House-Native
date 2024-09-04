import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Button, Dimensions, Keyboard, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import UserInfo from '../../componentsHome/UserInfo'; // Importa el componente UserInfo
import axios from 'axios'; // Importa Axios
import { setUser } from '../../store/userSlice'; // Importa la acción para actualizar el usuario

const { height } = Dimensions.get('window');
const CONTENT_HEIGHT = height * 0.8;

const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.user.user); // Obtén el usuario global
  const token = useSelector(state => state.user.token); // Obtén el token global
  const dispatch = useDispatch(); // Obtén el dispatch para actualizar el estado global
  const [userData, setUserData] = useState({ ...user });

  useEffect(() => {
    setUserData({ ...user });
  }, [user]);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        'https://hopeful-emerging-snapper.ngrok-free.app/usuario', // Cambia la URL según tu configuración
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
          },
        }
      );

      if (response.data.success) {
        // Actualiza el estado global con la nueva información del usuario y el token
        const { token: newToken, user: updatedUser } = response.data;
        dispatch(setUser({ token: newToken, user: updatedUser }));

        // Actualiza el estado local con la nueva información
        setUserData({ ...updatedUser });

        Alert.alert('Éxito', 'Información actualizada con éxito');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar la información:', error);
      Alert.alert('Error', 'Error al actualizar la información');
    }
  };

  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Mis Datos"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.center}>
          <View style={styles.content}>
            
            <UserInfo 
              label="Nombre" 
              value={userData.nombre} 
              editable 
              onChangeText={(text) => setUserData({ ...userData, nombre: text })} 
            />

            <UserInfo 
              label="Apellido" 
              value={userData.apellido} 
              editable 
              onChangeText={(text) => setUserData({ ...userData, apellido: text })} 
            />

            <UserInfo 
              label="Email" 
              value={userData.email} 
              editable 
              onChangeText={(text) => setUserData({ ...userData, email: text })} 
            />

            <UserInfo 
              label="Fecha de Nacimiento" 
              value={userData.fecha_nacimiento} 
              editable 
              onChangeText={(date) => setUserData({ ...userData, fecha_nacimiento: date })} 
            />

            <UserInfo 
              label="Género" 
              value={userData.genero} 
              editable 
              onChangeText={(gender) => setUserData({ ...userData, genero: gender })} 
            />

            <UserInfo 
              label="Teléfono" 
              value={userData.telefono} 
              editable 
              onChangeText={(text) => setUserData({ ...userData, telefono: text })} 
            />

            <Button title="Guardar Cambios" onPress={handleSubmit} />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    padding: 20,
    maxWidth: 700
  }
});

export default ProfileScreen;