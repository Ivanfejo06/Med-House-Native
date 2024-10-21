import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, Text } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Next from '../../assets/Next';

const { height, width } = Dimensions.get('window');

const SolicitarScreen = ({ navigation }) => {
  const token = useSelector(state => state.user.token);

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

  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Elegí tu forma de entrega"
      />
      <View style={styles.center}>
        <TouchableOpacity style={styles.box}>
            <View style={styles.details}>
                <View style={styles.rower}>
                    <Text style={styles.option}>Enviar a domicilio</Text>
                    <Next></Next>
                </View>
                <View>
                    <Text styles={styles.address}>Av. Rivadavia 1800</Text>
                </View>
            </View>
            <View style={styles.bottomDetails}>
                <Text style={styles.bottomDetailsText}>Lun-Vie 09:00-19:00 - Sab 10:00-18:00</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
            <View style={styles.details}>
                <View style={styles.rower}>
                    <Text style={styles.option}>Retirar en almacen</Text>
                    <Next></Next>
                </View>
                <View>
                    <Text styles={styles.address}>Av. Rivadavia 1800</Text>
                </View>
            </View>
            <View style={styles.bottomDetails}>
                <Text style={styles.bottomDetailsText}>Lun-Vie 09:00-19:00 - Sab 10:00-18:00</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  center: {
    width: '100%',
    flexDirection: "column",
    padding: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  box:{
    width: "100%",
    backgroundColor: "#FFF",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    borderRadius: 15,
    height: 160,
    justifyContent: "space-between"
  },
  details:{
    padding: 20
  },
  bottomDetails:{
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC"
  },
  bottomDetailsText:{
    fontSize: 14,
    color: "#808080"
  },
  option:{
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20
  },
  address:{
    fontSize: 16
  },
  rower:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
});

export default SolicitarScreen;