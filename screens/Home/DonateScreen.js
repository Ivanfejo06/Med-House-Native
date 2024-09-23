import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, Text } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import Mini from '../../components/MiniButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import MedSearch from '../../componentsHome/MedSearch';
import MedSelector from '../../componentsHome/MedSelector';

const { height } = Dimensions.get('window');
const CONTENT_HEIGHT = height * 0.8;

const DonateScreen = ({ navigation }) => {
  const [medicationData, setMedicationData] = useState({
    selectedMedication: null,
    fecha_apertura: new Date(),
    fecha_caducidad: new Date(),
  });

  const handleOpenDateChange = (event, selectedDate) => {
    setMedicationData({ ...medicationData, fecha_apertura: selectedDate || medicationData.fecha_apertura });
  };

  const handleExpireDateChange = (event, selectedDate) => {
    setMedicationData({ ...medicationData, fecha_caducidad: selectedDate || medicationData.fecha_caducidad });
  };

  const handleSubmit = () => {
    const { selectedMedication, fecha_apertura, fecha_caducidad } = medicationData;

    if (!selectedMedication || !fecha_apertura || !fecha_caducidad) {
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

  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Donar Medicamento"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.center}>
          <View style={styles.content}>
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

            <Mini 
              title="Enviar" 
              onPress={handleSubmit} 
            />
          </View>
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
  content: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height: CONTENT_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 20,
    maxWidth: 700,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    textAlign: "center",
    color: "#1E98A8",
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
});

export default DonateScreen;