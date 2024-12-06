import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import SendButton from '../../components/SendButton';
import VerticalMedScroll from '../../componentsHome/VerticalMedScroll';

const { height, width } = Dimensions.get('window');

const StorageOrderScreen = ({ navigation }) => {
  const token = useSelector(state => state.user.token);
  const user = useSelector(state => state.user.user);
  const [items, setItems] = useState([]);  // Estado para almacenar los ítems
  const [loading, setLoading] = useState(false);  // Estado de carga
  const [isSubmitting, setIsSubmitting] = useState(false);  // Estado para controlar el proceso de envío

  // Función para obtener los ítems de la API
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://hopeful-emerging-snapper.ngrok-free.app/bolsa', {
        headers: {
          Authorization: `Bearer ${token}`, // Autenticación con token
        }
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
      Alert.alert(
        'Error',
        'Hubo un problema al obtener los productos. Intenta nuevamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
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

  // Función para manejar el submit (crear pedido)
  const handleSubmit = async () => {
    if (items.length === 0) {
      Alert.alert(
        'Error',
        'No hay productos en la bolsa para crear el pedido.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }
  
    setIsSubmitting(true);  // Activar estado de carga
  
    try {
      console.log("Token: ", token);  // Verifica el token antes de hacer la solicitud
      console.log("user: ", user);
      // Enviar solicitud POST para crear el pedido
      const response = await axios.post(`https://hopeful-emerging-snapper.ngrok-free.app/pedidos/${user.id}`);
  
      if (response.data.success) {
        // Si la solicitud fue exitosa, redirigir al usuario a la pantalla de confirmación o detalles del pedido
        Alert.alert(
          'Éxito',
          'Pedido creado correctamente.',
          [
            { text: 'OK', onPress: () => navigation.navigate('Home') },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          'Error',
          'No se pudo crear el pedido. Intenta nuevamente.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error creating order:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al crear el pedido. Intenta nuevamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } finally {
      setIsSubmitting(false);  // Desactivar estado de carga
    }
  };  

  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Retirar en almacen"
      />
      <View style={styles.box}>
        <Text style={styles.warnText}>Esta opción es para retirar en los almacenes, ten en cuenta los horarios funcionales.</Text>
      </View>
      <ScrollView>
        <VerticalMedScroll
          donations={items}
          navigation={navigation}
          title={"Productos en bolsa"} // Nombre de la categoría
          disabled={true}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <SendButton 
          title="Crear Pedido" 
          onPress={handleSubmit} // Usamos handleSubmit al presionar el botón
          disabled={isSubmitting} // Desactivar el botón durante la carga
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
  box: {
    backgroundColor: "#FFF",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    borderRadius: 15,
    justifyContent: "space-between",
    padding: 20,
    maxHeight: 600,
    margin: 20,
    marginBottom: 0
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 0,
    left: 0,
  },
  warnText: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: "center"
  },
});

export default StorageOrderScreen;