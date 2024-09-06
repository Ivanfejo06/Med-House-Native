import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, Modal, TextInput, Animated, Easing, Platform, KeyboardAvoidingView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import axios from 'axios'; 
import { setUser } from '../../store/userSlice'; 
import Boton from '../../components/Button';
import Mini from '../../components/MiniButton';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.user.user); 
  const token = useSelector(state => state.user.token); 
  const dispatch = useDispatch(); 
  const [userData, setUserData] = useState({ email: user.email });
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email); 
  const [newPassword, setNewPassword] = useState(''); 
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [modalType, setModalType] = useState('email'); 

  const slideAnim = useRef(new Animated.Value(width)).current; 

  useEffect(() => {
    setUserData({ email: user.email });
  }, [user]);

  useEffect(() => {
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
        { email: newEmail }, 
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
            password: user.password 
          });

          if (loginResponse.data.success) {
            const { token, user } = loginResponse.data;
            dispatch(setUser({ token, user }));
            closeModal(); 
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
        { password: newPassword }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        Alert.alert('Éxito', 'Contraseña actualizada con éxito');
        closeModal(); 
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      Alert.alert('Error', 'Error al actualizar la contraseña');
    }
  };

  const openModal = (type) => {
    setModalType(type); 
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, 
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: width, 
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
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                          style={styles.button}
                        />
                        <Button title="Cancelar" onPress={closeModal} />
                      </View>
                    </>
                  )}
                </KeyboardAvoidingView>
              </Animated.View>
            </TouchableWithoutFeedback>
            <View></View>
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
    flexDirection: "column", 
  },
  textContainer: {
    marginBottom: 20, 
  },
  buttonContainer: {
    width: "100%",
    alignSelf: 'flex-end', 
    flexDirection: 'column', 
    justifyContent: 'space-between', 
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
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContent: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: '100%', // Asegura que el botón ocupe todo el ancho disponible
  },
});

export default ProfileScreen;