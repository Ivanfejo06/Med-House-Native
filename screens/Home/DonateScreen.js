import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import UserInfo from '../../componentsHome/UserInfo'; // Asegúrate de que UserInfo maneje adecuadamente las fechas
import Mini from '../../components/MiniButton';

const { height } = Dimensions.get('window');

const DonateScreen = ({ navigation }) => {
  const [medicationData, setMedicationData] = useState({
    fecha_apertura: '',
    fecha_caducidad: '',
  });

  const handleSubmit = () => {
    if (!medicationData.fecha_apertura || !medicationData.fecha_caducidad) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Aquí podrías hacer una llamada a una API para enviar los datos
    Alert.alert('Éxito', 'Datos del medicamento recolectados con éxito');
    console.log(medicationData); // Muestra los datos en consola (o envíalos a tu API)
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
            <UserInfo 
              label="Fecha de apertura" 
              value={medicationData.fecha_apertura} 
              editable 
              onChangeText={(date) => setMedicationData({ ...medicationData, fecha_apertura: date })} 
            />
            <UserInfo 
              label="Fecha de caducidad" 
              value={medicationData.fecha_caducidad} 
              editable 
              onChangeText={(date) => setMedicationData({ ...medicationData, fecha_caducidad: date })} 
            />
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
});

export default DonateScreen;