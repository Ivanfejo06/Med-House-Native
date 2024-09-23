import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, Text, TextInput, Animated, Easing } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import Mini from '../../components/MiniButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import MedSearch from '../../componentsHome/MedSearch';
import MedSelector from '../../componentsHome/MedSelector';

const { height, width } = Dimensions.get('window');

const DonateScreen = ({ navigation }) => {
  const [medicationData, setMedicationData] = useState({
    selectedMedication: null,
    fecha_apertura: new Date(),
    fecha_caducidad: new Date(),
    descripcion: '',
    cantidad: '',
  });
  
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

  const handleOpenDateChange = (event, selectedDate) => {
    setMedicationData({ ...medicationData, fecha_apertura: selectedDate || medicationData.fecha_apertura });
  };

  const handleExpireDateChange = (event, selectedDate) => {
    setMedicationData({ ...medicationData, fecha_caducidad: selectedDate || medicationData.fecha_caducidad });
  };

  const handleSubmit = () => {
    const { selectedMedication, fecha_apertura, fecha_caducidad, descripcion, cantidad } = medicationData;

    if (!selectedMedication || !fecha_apertura || !fecha_caducidad || !descripcion || !cantidad) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (fecha_caducidad < fecha_apertura) {
      Alert.alert('Error', 'La fecha de caducidad debe ser posterior a la fecha de apertura.');
      return;
    }

    Alert.alert('Éxito', 'Datos del medicamento recolectados con éxito');
    console.log(medicationData);
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
                  <View style={styles.selectedMedicationContainer}>
                    <Text style={styles.selectedMedicationTitle}>
                      Medicamento seleccionado:
                    </Text>
                    <View style={styles.info}>
                      <View style={styles.hiddenTop}>
                        <MedSelector item={medicationData.selectedMedication}></MedSelector>
                      </View>
                    </View>
                  </View>
                )}

                <View style={styles.input}>
                  <Text style={styles.label}>Fecha de apertura:</Text>
                  <DateTimePicker
                    value={medicationData.fecha_apertura}
                    mode="date"
                    display="default"
                    onChange={handleOpenDateChange}
                  />
                </View>

                <View style={styles.input}>
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
              <View>
                <View style={styles.input}>
                  <TextInput
                    style={styles.textarea}
                    placeholder="Descripción del medicamento"
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => setMedicationData({ ...medicationData, descripcion: text })}
                    value={medicationData.descripcion}
                  />
                </View>
                
                <View style={styles.input}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Cantidad de medicina"
                    keyboardType="numeric"
                    onChangeText={(text) => setMedicationData({ ...medicationData, cantidad: text })}
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
  input: {
    flexDirection: "row", 
    backgroundColor: "#e6e6e6",
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
    textAlign: "center",
    color: "#1E98A8",
  },
  textarea: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 12,
    width: '100%',
    height: 100,
  },
  inputField: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 12,
    width: '100%',
  },
  selectedMedicationContainer: {
    backgroundColor: "#e6e6e6",
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
  selectedMedicationTitle: {
    fontSize: 16,
    color: "#1E98A8",
    marginBottom: 12
  },
  info:{
    borderRadius: 15,
    overflow: "hidden"
  },
  hiddenTop: {
    marginTop: -1, // Mueve hacia arriba un pixel
    paddingTop: 0, // Ajusta el padding para compensar el desplazamiento
  },
  rower:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }
});

export default DonateScreen;