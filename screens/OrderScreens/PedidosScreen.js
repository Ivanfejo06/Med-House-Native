import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TopBarWhite from '../../componentsHome/TopBarWhite';

const { height, width } = Dimensions.get('window');

const OrderScreens = ({ navigation }) => {
  const token = useSelector(state => state.user.token);
  const [orders, setOrders] = useState([]); // Estado para almacenar los pedidos
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [error, setError] = useState(null); // Estado para errores de la solicitud

  // Función para obtener los pedidos del usuario
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://hopeful-emerging-snapper.ngrok-free.app/pedidos', {
        headers: {
          Authorization: `Bearer ${token}`, // Autenticación con token
        },
      });
      setOrders(response.data.datos); // Establecer la lista de pedidos
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
      fetchOrders(); // Llama a la API para cargar los pedidos
    }
  }, [token]); // Se vuelve a ejecutar si el token cambia

  // Función para manejar la navegación a los detalles del pedido
  const handleOrderPress = (orderId) => {
    navigation.navigate('PedidoDetalle', { pedidoId: orderId });
  };

  // Renderiza la lista de pedidos
  const renderOrderItem = ({ item }) => {
    // Formatear la fecha para mostrar solo hasta el día
    const formattedDate = item.fecha_pedido.split('T')[0];

    // Determinar el estado del pedido
    let statusStyle = {};
    let statusText = '';
    if (item.estado === true) {
      statusStyle = { backgroundColor: '#1EA82C' }; // Listo
      statusText = 'Listo';
    } else if (item.estado === false) {
      statusStyle = { backgroundColor: '#ED5046' }; // Rechazado
      statusText = 'Rechazado';
    } else {
      statusStyle = { backgroundColor: 'orange' }; // En Progreso
      statusText = 'En Progreso';
    }

    return (
      <TouchableOpacity style={styles.orderItem} onPress={() => handleOrderPress(item.id)}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderTitle}>Pedido {item.id}</Text>
        </View>
        <View style={styles.orderFooter}>
          <Text style={styles.orderDate}>Creado: {formattedDate}</Text>
          <View style={[styles.statusBox, statusStyle]}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Historial de pedidos"
      />
      <View style={styles.center}>
        {loading ? (
          <Text>Cargando...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : orders.length === 0 ? (
          <Text>No tienes pedidos.</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
            style={styles.orderList}
          />
        )}
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  orderList: {
    width: '100%',
    paddingTop: 5,
  },
  orderItem: {
    backgroundColor: '#FFF',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 11,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Añade esta línea para Android
    alignItems: 'center', // Centrar el contenido horizontalmente
  },
  orderHeader: {
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold', // Negrita para el título del pedido
    textAlign: 'center', // Centrado
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 14,
    color: '#666', // Color más claro para la fecha
    textAlign: 'left',
  },
  statusBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderScreens;