import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';
import { useSelector } from 'react-redux';
import axios from 'axios';
import VerticalMedScroll from '../../componentsHome/VerticalMedScroll';
import { Flow } from 'react-native-animated-spinkit';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const PedidoDetalleScreen = ({ navigation, route }) => {
  const { pedidoId } = route.params;
  const token = useSelector((state) => state.user.token);
  const [info, setInfo] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://hopeful-emerging-snapper.ngrok-free.app/pedidos/${pedidoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pedidos = response.data.datos || [];
      setInfo(response.data.info[0] || []);

      const ids = pedidos.map((pedido) => pedido.id_medicamento);

      const medicamentosPromises = ids.map(async (medicamentoId) => {
        try {
          const medicamentoResponse = await axios.get(
            `https://hopeful-emerging-snapper.ngrok-free.app/medicamento/${medicamentoId}`
          );
          return medicamentoResponse.data.datos;
        } catch (err) {
          console.error(`Error fetching medication with ID ${medicamentoId}:`, err);
          return null;
        }
      });

      const medicamentos = await Promise.all(medicamentosPromises);
      setMedicamentos(medicamentos.filter((medicamento) => medicamento !== null));
    } catch (err) {
      console.error('Error fetching orders or medications:', err);
      setError('Hubo un problema al obtener tus pedidos o detalles de medicamentos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchInfo();
    }
  }, [token]);

  const getStatusStyle = (estado) => {
    if (estado === true) return { backgroundColor: '#1EA82C' }; // Listo
    if (estado === false) return { backgroundColor: '#ED5046' }; // Rechazado
    return { backgroundColor: 'orange' }; // En Progreso
  };
  
  const getStatusText = (estado) => {
    if (estado === true) return 'Listo';
    if (estado === false) return 'Rechazado';
    return 'En Progreso';
  };  

  const handleDelete = async () => {
    if (info.estado === true) {
      Alert.alert(
        'No se puede eliminar',
        'El pedido ya está listo y no se puede cancelar.',
        [{ text: 'OK' }]
      );
      return;
    }
  
    Alert.alert(
      'Eliminar pedido',
      '¿Estás seguro de que deseas eliminar este pedido?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              setLoading(true);
              await axios.delete(
                `https://hopeful-emerging-snapper.ngrok-free.app/pedidos/${pedidoId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              Alert.alert('Pedido eliminado', 'El pedido se eliminó correctamente.', [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]);
            } catch (err) {
              console.error('Error deleting order:', err);
              Alert.alert('Error', 'Hubo un problema al eliminar el pedido.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };  

  return (
    <View style={styles.container}>
      <TopBarWhite navigation={() => navigation.goBack()} title="Detalle pedido" />
      <View style={styles.box}>
        {loading ? (
          <Flow size={48} color="#1E98A8" />
        ) : (
          <>
            {info.fecha_pedido ? (
              <View style={styles.infoRow}>
                <Text style={styles.errorText}>
                  Pedido: {info.fecha_pedido.split('T')[0]}
                </Text>
                <View style={[styles.statusBox, getStatusStyle(info.estado)]}>
                  <Text style={styles.statusText}>{getStatusText(info.estado)}</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.errorText}>
                Cargando información del pedido...
              </Text>
            )}
          </>
        )}
      </View>
      {loading ? (
        <View style={styles.box}>
          <Flow size={48} color="#1E98A8" />
        </View>
      ) : (
        <VerticalMedScroll
          title={'Lista de medicamentos'}
          disabled={true}
          donations={medicamentos}
        />
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Eliminar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  box: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    borderRadius: 15,
    justifyContent: 'space_between',
    padding: 20,
    maxHeight: 600,
    margin: 15,
    marginBottom: 0,
    alignContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#ED5046',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 15
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PedidoDetalleScreen;