import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, Modal, TextInput, Animated, Easing, Platform, KeyboardAvoidingView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import axios from 'axios'; // Importa Axios
import { setUser } from '../../store/userSlice'; // Importa la acción para actualizar el usuario
import Boton from '../../components/Button';
import Mini from '../../components/MiniButton';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.user.user); // Obtén el usuario global
  const token = useSelector(state => state.user.token); // Obtén el token global
  const dispatch = useDispatch(); // Obtén el dispatch para actualizar el estado global
  const [userData, setUserData] = useState({ email: user.email });
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email); // Estado para el nuevo email
  const [newPassword, setNewPassword] = useState(''); // Estado para la nueva contraseña
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [modalType, setModalType] = useState('email'); // 'email' o 'password' para determinar qué tipo de modal mostrar

  const slideAnim = useRef(new Animated.Value(width)).current; // Animación desde la derecha

  useEffect(() => {
    setUserData({ email: user.email });
  }, [user]);

  useEffect(() => {
    // Verifica si hay cambios en el email del usuario
    setIsButtonEnabled(newEmail !== user.email);
  }, [newEmail]);

  const handleEmailSubmit = async () => {
    if (!newEmail) {
      Alert.alert('Error', 'Por favor ingrese un email.');
      return;
    }

    try {
      const response = await axios.put(
        'https://hopeful-emerging-snapper.ngrok-free.app/usuario',
        { email: newEmail }, // Solo actualiza el email
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        try {
          const apiUrl = 'https://hopeful-emerging-snapper.ngrok-free.app/usuario/login';
          const loginResponse = await axios.post(apiUrl, { 
            dni: user.dni, 
            password: user.password // Usar la contraseña actual del usuario
          });

          if (loginResponse.data.success) {
            const { token, user } = loginResponse.data;
            dispatch(setUser({ token, user }));
            closeModal(); // Cierra el modal después del éxito
            Alert.alert('Éxito', 'Email actualizado con éxito');
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
      console.error('Error al actualizar el email:', error);
      Alert.alert('Error', 'Error al actualizar el email');
    }
  };

  const handlePasswordSubmit = async () => {
    if (!newPassword) {
      Alert.alert('Error', 'Por favor ingrese una nueva contraseña.');
      return;
    }

    try {
      const response = await axios.put(
        'https://hopeful-emerging-snapper.ngrok-free.app/usuario',
        { password: newPassword }, // Solo actualiza la contraseña
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        Alert.alert('Éxito', 'Contraseña actualizada con éxito');
        closeModal(); // Cierra el modal después del éxito
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      Alert.alert('Error', 'Error al actualizar la contraseña');
    }
  };

  const openModal = (type) => {
    setModalType(type); // Establece el tipo de modal a mostrar
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Mueve el modal a la posición central
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: width, // Mueve el modal fuera de la pantalla a la derecha
      duration: 400,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Autenticación"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.center}>
          <View style={styles.content}>
            {/* Sección de Email */}
            <View style={styles.textContainer}>
              <Text style={styles.infoTitle}>Email</Text>
              <Text style={styles.infoDescription}>
                El mail con el cual te mandaremos actualizaciones sobre MedHouse
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Mini 
                title="Modificar Email" 
                onPress={() => openModal('email')} 
                disabled={!isButtonEnabled} 
              />
            </View>
          </View>
          <View style={styles.content}>
            {/* Sección de Contraseña */}
            <View style={styles.textContainer}>
              <Text style={styles.infoTitle}>Contraseña</Text>
              <Text style={styles.infoDescription}>
                Cambia tu contraseña para asegurar tu cuenta
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Mini 
                title="Cambiar Contraseña" 
                onPress={() => openModal('password')} 
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
            <Animated.View style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalContent}
              >
                {modalType === 'email' && (
                  <>
                    <Text style={styles.modalTitle}>Modificar Email</Text>
                    <Text style={styles.modalSubtitle}>Ingresa el nuevo email</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Nuevo Email"
                      value={newEmail}
                      onChangeText={setNewEmail}
                    />
                    <View>
                      <Boton 
                        title="Confirmar" 
                        onPress={handleEmailSubmit}
                      />
                      <Button title="Cancelar" onPress={closeModal} />
                    </View>
                  </>
                )}
                {modalType === 'password' && (
                  <>
                    <Text style={styles.modalTitle}>Modificar Contraseña</Text>
                    <Text style={styles.modalSubtitle}>Ingresa la nueva contraseña</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Nueva Contraseña"
                      secureTextEntry
                      value={newPassword}
                      onChangeText={setNewPassword}
                    />
                    <View style={styles.buttonContainer}>
                      <Boton 
                        title="Confirmar" 
                        onPress={handlePasswordSubmit}
                      />
                      <Button title="Cancelar" onPress={closeModal} />
                    </View>
                  </>
                )}
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
    flexDirection: "column",
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
    flexDirection: "column", // Cambiado a column para apilar los elementos verticalmente
  },
  textContainer: {
    marginBottom: 20, // Añade un espacio debajo del contenedor de texto
  },
  buttonContainer: {
    alignSelf: 'flex-end', // Alinea el botón a la derecha
    flexDirection: 'column', // Alinea los botones en fila
    justifyContent: 'space-between', // Añade espacio entre los botones
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  infoDescription: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'left',
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center', // Centra el contenido verticalmente,
    alignItems: "center"
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
  modalContent:{
    width: '100%'
  }
});

export default ProfileScreen;