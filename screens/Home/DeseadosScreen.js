import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, ActivityIndicator, Alert } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import BackTopBar from '../../componentsHome/BackTopBar';
import DeseadosItem from '../../componentsHome/DeseadosItem';
import { useSelector } from 'react-redux';

const { height } = Dimensions.get('window');

const DeseadosScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const token = useSelector(state => state.user.token); 

  // Función para obtener los items desde la API
  const fetchItems = async (pageNum) => {
    setLoading(true);

    try {
      const response = await fetch(`https://hopeful-emerging-snapper.ngrok-free.app/necesitados?page=${pageNum}&limit=10`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.length > 0) {
        setItems(prevItems => [...prevItems, ...data]);
        if (data.length < 10) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
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
              const response = await fetch('https://hopeful-emerging-snapper.ngrok-free.app/necesitados', {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idMedicamento: itemId }),
              });

              const result = await response.json();

              if (result.success) {
                setItems(prevItems => prevItems.filter(item => item.id !== itemId));
                Alert.alert('Éxito', 'El item ha sido eliminado.');
              } else {
                Alert.alert('Error', result.message || 'Hubo un problema al eliminar el item.');
              }
            } catch (error) {
              console.error('Error removing item:', error);
              Alert.alert('Error', 'Hubo un problema al eliminar el item.');
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <BackTopBar navigation={() => navigation.goBack()} profile={() => navigation.navigate("ProfileIndex")}/>
      <View style={styles.DeseadosShadowContainer}>
        <View style={styles.DeseadosContainer}>
          <View style={styles.DeseadosTitleContainer}>
            <Text style={styles.DeseadosTitle}>Deseados</Text>
          </View>
          {items.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tienes ningún deseado</Text>
            </View>
          ) : (
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <DeseadosItem
                  item={item}
                  onRemove={handleRemove}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.itemList}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading ? <ActivityIndicator size="large" color="#1E98A8" /> : null
              }
            />
          )}
        </View>
      </View>
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
    elevation: 5, // Añade esta línea para Android
  },
  DeseadosContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden', // Se mantiene en el contenedor interno
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
    height: 100,
    width: '100%'
  },
  emptyText: {
    fontSize: 14,
    color: '#1E98A8',
    fontWeight: 'bold'
  },
});

export default DeseadosScreen;