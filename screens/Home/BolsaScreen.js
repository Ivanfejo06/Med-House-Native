import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, ActivityIndicator, Alert } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';
import BolsaItem from '../../componentsHome/BolsaItem';
import SendButton from '../../components/SendButton';
import axios from 'axios'; 
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get('window');

const BolsaScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);  // Estado para almacenar los ítems
  const [loading, setLoading] = useState(false);  // Estado de carga
  const token = useSelector(state => state.user.token); // Obtiene el token del estado global

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
      if (data != null){
        const allDetails = await Promise.all(
          data.map(async (item) => {
            const detailResponse = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/medicamento/${item.id_medicamento}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return detailResponse.data.datos; // Asegúrate de que estás accediendo a los datos correctos
          })
        );

        setItems(prevItems => [...prevItems, ...allDetails]); // Agrega nuevos detalles a los existentes
      }
    } catch (error) {
      console.error('Error fetching bolsa items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(); // Llama a la API cuando el componente se monta
  }, []);

  // Función para eliminar un ítem de la bolsa
  const handleRemove = async (itemId) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este item de tu bolsa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const response = await axios.delete(`https://hopeful-emerging-snapper.ngrok-free.app/bolsa/${itemId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              });

              const result = response.data;

              if (result.success) {
                setItems(prevItems => prevItems.filter(item => item.id !== itemId)); // Filtra los ítems eliminados
              } else {
                Alert.alert('Error', result.message || 'Hubo un problema al eliminar el item.');
              }
            } catch (error) {
              console.error('Error removing item:', error);
              Alert.alert('Error', 'Hubo un problema al eliminar el item.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <View style={styles.bolsaShadowContainer}>
        <View style={styles.bolsaContainer}>
          <View style={styles.bolsaTitleContainer}>
            <Text style={styles.bolsaTitle}>Mi bolsa</Text>
          </View>
          {loading ? (
            <View style={styles.emptyContainer}>
              <ActivityIndicator size="large" color="#1E98A8" />
            </View>
          ) : items.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tienes productos en la bolsa, intenta agregar alguno!</Text>
            </View>
          ) : (
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <BolsaItem
                  item={item}
                  onRemove={() => handleRemove(item.id)}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.itemList}
            />
          )}
        </View>
      </View>
      <View style={styles.button}>
        <SendButton 
          title="Solicitar" 
          onPress={() => console.log("Solicitud enviada")} 
        />
      </View>
      <NavBar navigation={navigation} selected="bolsa" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  bolsaShadowContainer: {
    marginTop: 20,
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bolsaContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    maxHeight: 515,
  },
  bolsaTitleContainer: {
    backgroundColor: '#1E98A8',
    padding: 5,
    alignItems: 'center',
  },
  bolsaTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 21  
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: "center"
  },
  button: {
    position: 'absolute',
    bottom: 90,
    right: 0,
    left: 0,
  },
});

export default BolsaScreen;