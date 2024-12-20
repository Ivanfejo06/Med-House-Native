import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, Modal, TextInput, Animated, Easing, Platform, KeyboardAvoidingView, Button, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import axios from 'axios'; 
import { setUser } from '../../store/userSlice'; 
import Mini from '../../components/MiniButton';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.user.user); 
  const token = useSelector(state => state.user.token); 
  const dispatch = useDispatch(); 
  const [userData, setUserData] = useState({ email: user.email });
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState(''); 
  const [newPassword, setNewPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [newPhone, setNewPhone] = useState(''); // Nuevo estado para teléfono
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false); // Nuevo estado de validación para teléfono
  const [modalType, setModalType] = useState('email'); 

  const slideAnim = useRef(new Animated.Value(width)).current; 

  // Función que determina si el usuario es un "farmacéutico" o no
  const isFarmaceutico = userData.titulo !== undefined;  // Si 'titulo' existe, es farmaceutico

  // Obtener el endpoint correcto según si es farmaceutico o no
  const getEndpoint = () => {
    return isFarmaceutico ? 'farmaceutico' : 'usuario';  // Si es farmaceutico, el endpoint es 'farmaceutico'
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password, confirm) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasSpecialChar && password === confirm;
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/; // Ajusta según el formato esperado
    return phoneRegex.test(phone);
  };

  useEffect(() => {
    setIsEmailValid(validateEmail(newEmail) && newEmail !== user.email); 
  }, [newEmail]);

  useEffect(() => {
    setIsPasswordValid(validatePassword(newPassword, confirmPassword));
  }, [newPassword, confirmPassword]); 

  useEffect(() => {
    setIsPhoneValid(validatePhoneNumber(newPhone)); // Validación de teléfono
  }, [newPhone]);

  const handleEmailSubmit = async () => {
    const endpoint = getEndpoint();
    if (!isEmailValid) {
      Alert.alert('Error', 'El email no es válido o no ha sido modificado.');
      return;
    }
  
    try {
      const updatedUserData = { ...user, email: newEmail };
      const response = await axios.put(
        `https://hopeful-emerging-snapper.ngrok-free.app/${endpoint}`, // Cambiar la URL aquí
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        const apiUrl = `https://hopeful-emerging-snapper.ngrok-free.app/${endpoint}/login`; // Cambiar la URL aquí
        const loginResponse = await axios.post(apiUrl, {
          dni: user.dni,
          password: user.password
        });
  
        if (loginResponse.data.success) {
          const { token, user } = loginResponse.data;
          dispatch(setUser({ token, user }));
          closeModal();
          Alert.alert('Éxito', 'Email actualizado con éxito');
          setNewEmail('');
          setIsEmailValid(false);
        } else {
          Alert.alert('Error', loginResponse.data.message);
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
    const endpoint = getEndpoint();
    if (!isPasswordValid) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un símbolo especial.');
      return;
    }
    
    if (newPassword !== confirmPassword && newPassword.length !== 0) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
  
    try {
      const updatedUserData = { ...user, password: newPassword };
      const response = await axios.put(
        `https://hopeful-emerging-snapper.ngrok-free.app/${endpoint}`, // Cambiar la URL aquí
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        // Ahora autenticar con la nueva contraseña
        const apiUrl = `https://hopeful-emerging-snapper.ngrok-free.app/${endpoint}/login`; // Cambiar la URL aquí
        const loginResponse = await axios.post(apiUrl, {
          dni: user.dni,
          password: newPassword
        });
  
        if (loginResponse.data.success) {
          const { token, user } = loginResponse.data;
          dispatch(setUser({ token, user }));
          closeModal();
          Alert.alert('Éxito', 'Contraseña actualizada con éxito');
          setNewPassword('');
          setConfirmPassword('');
          setIsPasswordValid(false);
        } else {
          Alert.alert('Error', loginResponse.data.message);
        }
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      Alert.alert('Error', 'Error al actualizar la contraseña');
    }
  };

  const handlePhoneSubmit = async () => {
    const endpoint = getEndpoint();
    if (!isPhoneValid) {
      Alert.alert('Error', 'El número de teléfono no es válido o no ha sido modificado.');
      return;
    }
  
    try {
      const updatedUserData = { ...user, telefono: newPhone }; // Ajusta según el campo del teléfono en tu modelo de datos
      const response = await axios.put(
        `https://hopeful-emerging-snapper.ngrok-free.app/${endpoint}`, // Cambiar la URL aquí
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        // Ahora autenticar con el mismo token ya que solo se actualiza el teléfono
        const apiUrl = `https://hopeful-emerging-snapper.ngrok-free.app/${endpoint}/login`; // Cambiar la URL aquí
        const loginResponse = await axios.post(apiUrl, {
          dni: user.dni,
          password: user.password
        });
  
        if (loginResponse.data.success) {
          const { token, user } = loginResponse.data;
          dispatch(setUser({ token, user }));
          closeModal();
          Alert.alert('Éxito', 'Número de teléfono actualizado con éxito');
          setNewPhone('');
          setIsPhoneValid(false);
        } else {
          Alert.alert('Error', loginResponse.data.message);
        }
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar el número de teléfono:', error);
      Alert.alert('Error', 'Error al actualizar el número de teléfono');
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
        <ScrollView style={styles.middle}>
          <View style={styles.center}>
            <View style={styles.content}>
              <View style={styles.textContainer}>
                <Text style={styles.infoTitle}>Email</Text>
                <Text style={styles.infoDescription}>
                  El mail con el cual te mandaremos actualizaciones mails de confirmacion sobre 
                  <Text style={styles.highlightedText}> MedHouse</Text>
                </Text>
                <View style={styles.spacer}>
                  <Text style={styles.currentMail}>
                    Email Actual:
                  </Text>
                  <Text style={styles.mail}>
                    {user.email}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Mini 
                  title="Modificar Email" 
                  onPress={() => openModal('email')} 
                />
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.textContainer}>
                <Text style={styles.infoTitle}>Contraseña</Text>
                <Text style={styles.infoDescription}>
                  Cambia tu contraseña para asegurar tu cuenta de
                  <Text style={styles.highlightedText}> MedHouse</Text>
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Mini 
                  title="Cambiar Contraseña" 
                  onPress={() => openModal('password')} 
                />
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.textContainer}>
                <Text style={styles.infoTitle}>Número de Teléfono</Text>
                <Text style={styles.infoDescription}>
                  Actualiza tu número de teléfono para mantener tu cuenta segura.
                </Text>
                <View style={styles.spacer}>
                  <Text style={styles.currentMail}>
                    Teléfono Actual:
                  </Text>
                  <Text style={styles.mail}>
                    {user.telefono || 'No proporcionado'}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Mini 
                  title="Modificar Teléfono" 
                  onPress={() => openModal('phone')} 
                />
              </View>
            </View>
          </View>
          <View style={styles.space}/>
        </ScrollView>
      </TouchableWithoutFeedback>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.modalContent}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Animated.View style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>

                  {modalType === 'email' && (
                    <>
                      <Text style={styles.modalTitle}>Modificar Email</Text>
                      <Text style={styles.modalSubtitle}>Ingresa el nuevo email</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder={user.email}  
                        onChangeText={setNewEmail}
                      />
                      <View>
                        <Mini
                          style={[styles.button, { backgroundColor: isEmailValid ? '#1E98A8' : '#B0B0B0', marginBottom: 15 }]} 
                          title="Confirmar" 
                          onPress={handleEmailSubmit}
                          disabled={!isEmailValid}
                        />
                        <Button title="Cancelar" onPress={closeModal} />
                      </View>
                    </>
                  )}
                  {modalType === 'password' && (
                    <>
                      <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
                      <Text style={styles.modalSubtitle}>Ingresa la nueva contraseña</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Nueva Contraseña"
                        secureTextEntry
                        onChangeText={setNewPassword}
                      />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Confirmar Contraseña"
                        secureTextEntry
                        onChangeText={setConfirmPassword}
                      />
                      <View>
                        <Mini
                          style={[styles.button, { backgroundColor: isPasswordValid ? '#1E98A8' : '#B0B0B0', marginBottom: 15 }]} 
                          title="Confirmar" 
                          onPress={handlePasswordSubmit}
                          disabled={!isPasswordValid}
                        />
                        <Button title="Cancelar" onPress={closeModal} />
                      </View>
                    </>
                  )}
                  {modalType === 'phone' && (
                    <>
                      <Text style={styles.modalTitle}>Modificar Número de Teléfono</Text>
                      <Text style={styles.modalSubtitle}>Ingresa el nuevo número de teléfono</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Nuevo Teléfono"
                        keyboardType="phone-pad"
                        onChangeText={setNewPhone}
                      />
                      <View>
                        <Mini
                          style={[styles.button, { backgroundColor: isPhoneValid ? '#1E98A8' : '#B0B0B0', marginBottom: 15 }]} 
                          title="Confirmar" 
                          onPress={handlePhoneSubmit}
                          disabled={!isPhoneValid}
                        />
                        <Button title="Cancelar" onPress={closeModal} />
                      </View>
                    </>
                  )}
                </Animated.View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
  space:{
    height: 150,
    width: '100%'
  },
  middle:{
    width: '100%',
    height: '100%',
  },
  center: {
    width: '100%',
    flexDirection: "column",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
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
  currentMail: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'left',
    color: "#1E98A8"
  },
  spacer: {
    flexDirection: "row", 
    backgroundColor: "#e6e6e6", // Color del borde
    borderRadius: 15,       // Radio de las esquinas
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.84, 
    justifyContent: "space-around"
  },
  highlightedText: {
    color: "#1E98A8",
    fontWeight: "bold"
  },
  mail: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20
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
  mini:{
    marginBottom: 10
  }
});

export default ProfileScreen;