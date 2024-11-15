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
                <Text style={styles.bottomDetailsText}>Lun-Vie 09:00-19:00</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("Storage")}>
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
    paddingTop: 20
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
    justifyContent: "space-between",
    marginBottom: 15
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