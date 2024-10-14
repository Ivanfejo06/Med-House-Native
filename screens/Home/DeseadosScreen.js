import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, Alert, ScrollView } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import BackTopBar from '../../componentsHome/BackTopBar';
import DeseadosItem from '../../componentsHome/DeseadosItem';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Flow } from 'react-native-animated-spinkit'; // Importa el Spinner

const { height } = Dimensions.get('window');

const DeseadosScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const token = useSelector(state => state.user.token); 
  const [currentPage, setCurrentPage] = useState(1);

  const fetchItems = async () => {
    if (loading || !hasMore) return; // Evitar múltiples llamadas simultáneas

    setLoading(true);
  
    try {
      const response = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/necesitados`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: 10,
        },
      });

      const ids = response.data.datos;

      if (ids.length > 0) {
        const allDetails = await Promise.all(
          ids.map(async (item) => {
            const detailResponse = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/medicamento/${item.id_medicamento}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return detailResponse.data.datos; // Asegúrate de que estás accediendo a los datos correctos
          })
        );

        setItems(prevItems => [...prevItems, ...allDetails]); // Agrega nuevos detalles a los existentes

        if (ids.length < 10) {
          setHasMore(false); // Si la longitud es menor que 10, no hay más ítems
        } else {
          setCurrentPage(prevPage => prevPage + 1); // Incrementa la página solo si hay más ítems
        }
      } else {
        setHasMore(false); // No hay más ítems si la respuesta está vacía
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [currentPage]); // Se ejecuta cada vez que currentPage cambia

  const handleLoadMore = () => {
    fetchItems(); // Carga más ítems
  };

  const handleRemove = async (itemId) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este item?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const response = await axios.delete('https://hopeful-emerging-snapper.ngrok-free.app/necesitados', {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                data: { idMedicamento: itemId },
              });

              const result = response.data;

              if (result.success) {
                setItems(prevItems => prevItems.filter(item => item.id !== itemId));
              } else {
                Alert.alert('Error', result.message || 'Hubo un problema al eliminar el item.');
              }
            } catch (error) {
              console.error('Error removing item:', error);
              Alert.alert('Error', 'Hubo un problema al eliminar el item.');
            }
          },
          style: "destructive"
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <BackTopBar navigation={navigation} profile={() => navigation.navigate("ProfileIndex")}/>
      <ScrollView>
        <View style={styles.DeseadosShadowContainer}>
          <View style={styles.DeseadosContainer}>
            <View style={styles.DeseadosTitleContainer}>
              <Text style={styles.DeseadosTitle}>Deseados</Text>
            </View>
            {loading && items.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Flow size={48} color="#1E98A8"/>
              </View>
            ) : items.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tienes ningún deseado, intenta agregar alguno!</Text>
              </View>
            ) : (
              <FlatList
                data={items}
                renderItem={({ item }) => (
                  <DeseadosItem
                    item={item}
                    onRemove={() => handleRemove(item.id)}
                    navigation={navigation}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.itemList}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                scrollEnabled={false}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <NavBar navigation={navigation} selected="Deseados" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  DeseadosShadowContainer: {
    marginTop: 20,
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  DeseadosContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    maxHeight: 515,
  },
  DeseadosTitleContainer: {
    backgroundColor: '#1E98A8',
    padding: 5,
    alignItems: 'center',
  },
  DeseadosTitle: {
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
});

export default DeseadosScreen;