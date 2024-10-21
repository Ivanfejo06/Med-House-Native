import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, Text, TextInput, Animated, Easing } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import Mini from '../../components/MiniButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import MedSearch from '../../componentsHome/MedSearch';
import MedSelector from '../../componentsHome/MedSelector';
import { useSelector } from 'react-redux';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

const DonateScreen = ({ navigation }) => {
  const [medicationData, setMedicationData] = useState({
    selectedMedication: null,
    fecha_apertura: new Date(),
    fecha_caducidad: new Date(),
    descripcion: '',
    cantidad: '',
  });
  const [errors, setErrors] = useState({
    selectedMedication: false,
    fecha_apertura: false,
    fecha_caducidad: false,
    descripcion: false,
    cantidad: false,
  });
  const token = useSelector(state => state.user.token);
  
  // Empieza en el segundo paso (1 en lugar de 0)
  const [step, setStep] = useState(-1); 
  const slideAnim = useState(new Animated.Value(-width))[0]; // Desplaza el contenedor al segundo paso

  useEffect(() => {
    // Mueve el contenedor animado al segundo paso al iniciar la pantalla
    Animated.timing(slideAnim, {
      toValue: -(width * step),
      duration: 0, // Sin animación al cargar, para que comience directamente en el segundo paso
      useNativeDriver: true,
    }).start();
  }, [step]);

  const handleSubmit = async () => {
    const { selectedMedication, fecha_apertura, fecha_caducidad, descripcion, cantidad } = medicationData;
    if (!selectedMedication || !fecha_apertura || !fecha_caducidad || !descripcion || !cantidad) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
  
    if (fecha_caducidad < fecha_apertura) {
      Alert.alert('Error', 'La fecha de caducidad debe ser posterior a la fecha de apertura.');
      return;
    }
    try {
      // Aquí debes ajustar la URL a la de tu API
      const response = await axios.post('https://hopeful-emerging-snapper.ngrok-free.app/request', {
        medId: selectedMedication.id,
        fecha_apertura: fecha_apertura.toISOString().split('T')[0],
        fecha_caducidad: fecha_caducidad.toISOString().split('T')[0],
        descripcion: descripcion,
        cantidad: cantidad,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,  // Se usa el token desde Redux
        }
      });      
  
      if (response.status === 201) {
        Alert.alert('Éxito', 'Donación realizada con éxito');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Hubo un problema al enviar los datos.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al conectar con el servidor.');
    }
  };  

  const handleSelectMedication = (item) => {
    setMedicationData({ ...medicationData, selectedMedication: item });
  };

  const handleNextStep = () => {
    if (step < 2) {
      Animated.timing(slideAnim, {
        toValue: -(width * (step + 1)),
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setStep(step + 1));
    }
  };

  const handlePrevStep = () => {
    if (step > -1) {
      Animated.timing(slideAnim, {
        toValue: -(width * (step - 1)),
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setStep(step - 1));
    }
  };
  
  const messi = () => {

  }

  const validateField = (field, minLength = 3) => {
    if (!medicationData[field] || medicationData[field].length < minLength) {
      setErrors(prev => ({ ...prev, [field]: true }));
    } else {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };  

  const handleFieldChange = (field, value) => {
    setMedicationData({ ...medicationData, [field]: value });
    validateField(field);
  };

  const handleOpenDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || medicationData.fecha_apertura;
    setMedicationData({ ...medicationData, fecha_apertura: new Date(currentDate) });
    validateField('fecha_apertura');
  };
  
  const handleExpireDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || medicationData.fecha_caducidad;
    setMedicationData({ ...medicationData, fecha_caducidad: new Date(currentDate) });
    validateField('fecha_caducidad');
  };  

  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Donar Medicamento"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.center}>
          <Animated.View style={[styles.animatedContainer, { transform: [{ translateX: slideAnim }] }]}>
            {/* Primer paso: Selección de medicamento y fechas */}
            <View style={styles.step}>
              <View>
                <MedSearch onSelect={handleSelectMedication} />
                {medicationData.selectedMedication && (
                  <View style={styles.selectedMedication}>
                    <MedSelector item={medicationData.selectedMedication} onSelect={messi}></MedSelector>
                  </View>
                )}

                <View style={[styles.input, errors.fecha_apertura ? styles.errorBorder : styles.validBorder]}>
                  <Text style={styles.label}>Fecha de apertura:</Text>
                  <DateTimePicker
                    value={medicationData.fecha_apertura}
                    mode="date"
                    display="default"
                    onChange={handleOpenDateChange}
                  />
                </View>

                <View style={[styles.input, errors.fecha_caducidad ? styles.errorBorder : styles.validBorder]}>
                  <Text style={styles.label}>Fecha de caducidad:</Text>
                  <DateTimePicker
                    value={medicationData.fecha_caducidad}
                    mode="date"
                    display="default"
                    onChange={handleExpireDateChange}
                  />
                </View>
              </View>

              <Mini title="Siguiente" onPress={handleNextStep} />
            </View>

            {/* Segundo paso: Descripción y cantidad */}
            <View style={styles.step}>
              <View style={styles.wit}>
                <View style={[styles.selectedMedicationContainer, errors.descripcion ? styles.errorBorder : styles.validBorder]}>
                  <TextInput
                    style={styles.textarea}
                    placeholder="Descripción del medicamento"
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => handleFieldChange('descripcion', text)}
                    value={medicationData.descripcion}
                  />
                </View>
                
                <View style={[styles.selectedMedicationContainer, errors.cantidad ? styles.errorBorder : styles.validBorder]}>
                  <TextInput
                    style={styles.textarea}
                    placeholder="Cantidad de medicina restante"
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => handleFieldChange('cantidad', text)}
                    value={medicationData.cantidad}
                  />
                </View>
              </View>
              <View style={styles.rower}>
                <Mini title="Anterior" onPress={handlePrevStep} />
                <Mini title="Siguiente" onPress={handleNextStep} />
              </View>
            </View>

            {/* Tercer paso: Subida de fotos (pendiente de implementar) */}
            <View style={styles.step}>
              <View>
                <Text style={styles.label}>Subir fotos del medicamento</Text>
                {/* Aquí podrías agregar la lógica para enviar fotos */}
              </View>

              <View style={styles.rower}>
                <Mini title="Anterior" onPress={handlePrevStep} />
                <Mini title="Enviar" onPress={handleSubmit} />
              </View>
            </View>

          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  center: {
    width: '100%',
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  animatedContainer: {
    flexDirection: "row",
    width: width * 3, // Aumenta el tamaño para tener el espacio de los 3 pasos
  },
  step: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 15,
    marginHorizontal: 15,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: width, // Cada paso ocupa el ancho completo de la pantalla
    justifyContent: "space-between"
  },
  wit:{
    width: "100%"
  },
  input: {
    flexDirection: "row", 
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.84, 
    justifyContent: "space-between",
    marginBottom: 20,
    width: '100%',
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E98A8",
  },
  textarea: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 12,
    width: '100%',
    height: 100
  },
  inputField: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 12,
    width: '100%',
  },
  selectedMedicationContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.84, 
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  selectedMedication: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingVertical: 5,
    justifyContent: "space-between",
    marginBottom: 15,
    width: '100%',
    alignItems: "center",
  },
  selectedMedicationTitle: {
    fontSize: 16,
    color: "#1E98A8",
    marginBottom: 12,
    fontWeight: "bold"
  },
  rower:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  validBorder: {
    borderColor: '#1E98A8',
    borderWidth: 2,
  },
  errorBorder: {
    borderColor: '#F00',
    borderWidth: 2,
  }
});

export default DonateScreen;