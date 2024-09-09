import React, { useState, useEffect, useRef } from 'react';
import { Image, View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, Modal, TextInput, Animated, Easing, Platform, KeyboardAvoidingView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import UserInfo from '../../componentsHome/UserInfo'; // Importa el componente UserInfo
import axios from 'axios'; // Importa Axios
import { setUser } from '../../store/userSlice'; // Importa la acción para actualizar el usuario
import Boton from '../../components/Button';
import Mini from '../../components/MiniButton';

const { height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.user.user); // Obtén el usuario global
  const token = useSelector(state => state.user.token); // Obtén el token global
  const dispatch = useDispatch(); // Obtén el dispatch para actualizar el estado global
  const [userData, setUserData] = useState({ ...user });
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const slideAnim = useRef(new Animated.Value(height)).current;
  const passwordInputRef = useRef(null);

  useEffect(() => {
    setUserData({ ...user });
  }, [user]);

  useEffect(() => {
    // Verifica si hay cambios en los datos del usuario
    const hasChanges = Object.keys(userData).some(key => userData[key] !== user[key]);
    setIsButtonEnabled(hasChanges);
  }, [userData]);

  useEffect(() => {
    if (modalVisible) {
      // Focus on the password input when modal is opened
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
    }
  }, [modalVisible]);

  const handleSubmit = async () => {
    if (!passwordInput) {
      Alert.alert('Error', 'Por favor ingrese la contraseña.');
      return;
    }
    if (passwordInput != user.password) {
      Alert.alert('Error', 'La constraseña ingresada no es la correcta.');
      return;
    }

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
        try {
          const apiUrl = 'https://hopeful-emerging-snapper.ngrok-free.app/usuario/login';
          const loginResponse = await axios.post(apiUrl, { 
            dni: userData.dni, 
            password: passwordInput // Usa la contraseña proporcionada
          });

          if (loginResponse.data.success) {
            const { token, user } = loginResponse.data;
            dispatch(setUser({ token, user }));
            closeModal(); // Cierra el modal después del éxito
            Alert.alert('Éxito', 'Información actualizada con éxito');
          } else {
            Alert.alert('Error', loginResponse.data.message);
          }
        } catch (error) {
          Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión.');
          console.error(error);
        }
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar la información:', error);
      Alert.alert('Error', 'Error al actualizar la información');
    }
  };

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 500,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
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
            <View style={styles.salute}>
              <Image source={require('../../assets/Face.png')} style={styles.foto} />
            </View>

            <UserInfo 
              label="Nombre" 
              value={userData.nombre || ''} 
              editable 
              onChangeText={(text) => setUserData({ ...userData, nombre: text })} 
            />

            <UserInfo 
              label="Apellido" 
              value={userData.apellido || ''} 
              editable 
              onChangeText={(text) => setUserData({ ...userData, apellido: text })} 
            />

            <UserInfo 
              label="Fecha de Nacimiento" 
              value={userData.fecha_nacimiento || ''} 
              editable 
              onChangeText={(date) => setUserData({ ...userData, fecha_nacimiento: date })} 
            />

            <UserInfo 
              label="Género" 
              value={userData.genero || ''} 
              editable 
              onChangeText={(gender) => setUserData({ ...userData, genero: gender })} 
            />

            <UserInfo 
              label="Teléfono" 
              value={(userData.telefono || '').toString()} // Convierte el número a string
              editable 
              onChangeText={(text) => setUserData({ ...userData, telefono: text })} 
            />
            <View style={styles.right}>
              <Mini 
                title="Guardar Cambios" 
                onPress={openModal} 
                disabled={!isButtonEnabled} // Usa el estado para habilitar/deshabilitar el botón
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={() => { }}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalContent}
              >
                <View style={styles.logoContainer}>
                  {/* Agrega el logo si es necesario */}
                </View>
                <Text style={styles.modalTitle}>Verifica tu identidad</Text>
                <Text style={styles.modalSubtitle}>Ingresa nuevamente tu contraseña para efectuar los cambios</Text>
                <TextInput
                  ref={passwordInputRef}
                  style={styles.textInput}
                  placeholder="Contraseña"
                  secureTextEntry
                  value={passwordInput}
                  onChangeText={setPasswordInput}
                />
                <View style={styles.buttonContainer}>
                  <Boton 
                    title="Confirmar" 
                    onPress={handleSubmit} // Llama a handleSubmit directamente
                  />
                  <Button title="Cancelar" onPress={closeModal} />
                </View>
              </KeyboardAvoidingView>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 20,
    maxWidth: 700,
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: 'gray',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  salute: {
    flexDirection: 'row',
    justifyContent: "center",
    marginBottom: 40
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  right:{
    width: '100%',
    alignContent: "flex-end"
  }
});

export default ProfileScreen;