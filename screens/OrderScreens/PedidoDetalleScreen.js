import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, Text } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import { useSelector } from 'react-redux';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

const PedidoDetalleScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const token = useSelector(state => state.user.token);
  const [info, setInfo] = useState([]); // Estado para almacenar los pedidos

  // Función para obtener los pedidos del usuario
  const fetchInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/pedidos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Autenticación con token
        },
      });
      console.log(response.data)
      setInfo(response.data.datos); // Establecer la lista de pedidos
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Hubo un problema al obtener tus pedidos.');
    } finally {
      setLoading(false);
    }
  };

  // Usamos useEffect para obtener los pedidos cuando el componente se monta
  useEffect(() => {
    if (token) {
      fetchInfo(); // Llama a la API para cargar los pedidos
    }
  }, [token]); // Se vuelve a ejecutar si el token cambia

  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Detalle pedido"
      />
      <View style={styles.box}>
        <Text style={styles.warnText}>{info}</Text>
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
});

export default PedidoDetalleScreen;