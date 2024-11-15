import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Alert, Text, FlatList, ScrollView } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SendButton from '../../components/SendButton';
import { Flow } from 'react-native-animated-spinkit';
import MedItem from '../../componentsHome/MedItem';
import VerticalMedScroll from '../../componentsHome/VerticalMedScroll';

const { height, width } = Dimensions.get('window');

const StorageOrderScreen = ({ navigation }) => {
  const token = useSelector(state => state.user.token);
  const [items, setItems] = useState([]);  // Estado para almacenar los ítems
  const [loading, setLoading] = useState(false);  // Estado de carga

  // Función para obtener los ítems de la API
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://hopeful-emerging-snapper.ngrok-free.app/bolsa', {
        headers: {
          Authorization: `Bearer ${token}`, // Autenticación con token
        },
      });

      const data = response.data.datos; // Asegúrate de que estás accediendo a los datos correctos
      if (data != null) {
        const allDetails = await Promise.all(
          data.map(async (item) => {
            const detailResponse = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/medicamento/${item.id_medicamento}`);
            return detailResponse.data.datos; // Asegúrate de que estás accediendo a los datos correctos
          })
        );

        setItems(allDetails);  // Actualiza el estado de los ítems
      }
    } catch (error) {
      console.error('Error fetching bolsa items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Usamos useEffect para obtener los ítems cuando el componente se monta
  useEffect(() => {
    if (token) {
      fetchItems(); // Llama a la API para cargar los ítems
    }
  }, [token]); // Se vuelve a ejecutar si el token cambia

  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Retirar en almacen"
      />
      
      <View style={styles.center}>
        
        <View style={styles.box}>
          <Text style={styles.title}>No se que poner ahi</Text>
        </View>
      </View>
      <ScrollView>
        <VerticalMedScroll
          donations={items}
          navigation={navigation}
          title={"Prodctos en bolsa"} // Nombre de la categoría
          disabled={true}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <SendButton 
          title="Crear Pedido" 
          onPress={() => navigation.navigate('Solicitar')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#F0F0F0',
  },
  center: {
    width: '100%',
    flexDirection: "column",
    padding: 15,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 20
  },
  box: {
    width: "100%",
    backgroundColor: "#FFF",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    borderRadius: 15,
    justifyContent: "space-between",
    padding: 20,
    maxHeight: 600,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 0,
    left: 0,
  },
  title:{
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15
  },
  lister:{
    borderWidth: 2,
    borderColor: "#1E98A8",
    borderRadius: 15,
  }
});

export default StorageOrderScreen;