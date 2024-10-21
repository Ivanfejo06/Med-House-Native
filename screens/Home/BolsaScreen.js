import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, Alert, ScrollView } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';
import BolsaItem from '../../componentsHome/BolsaItem';
import SendButton from '../../components/SendButton';
import axios from 'axios'; 
import { useSelector } from 'react-redux';
import { Flow } from 'react-native-animated-spinkit';
import Warning from '../../assets/Warning';
import { useFocusEffect } from '@react-navigation/native'; // Importa el hook

const { height, width } = Dimensions.get('window');

const BolsaScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);  // Estado para almacenar los ítems
  const [loading, setLoading] = useState(false);  // Estado de carga
  const [hasOutOfStockItems, setHasOutOfStockItems] = useState(false); // Nuevo estado para controlar el stock
  const token = useSelector(state => state.user.token); // Obtiene el token del estado global

  // Función para verificar si hay ítems sin stock
  // Función para verificar si hay ítems sin stock
  const checkOutOfStockItems = (items) => {
    let i = 0;
    
    while (i < items.length) {
      if (items[i].stock <= 0) {
        return true; // Si encuentra un ítem sin stock, retorna true
      }
      i++;
    }
    
    return false; // Si todos los ítems tienen stock, retorna false
  };

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
            const detailResponse = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/medicamento/${item.id_medicamento}`);
            return detailResponse.data.datos; // Asegúrate de que estás accediendo a los datos correctos
          })
        );

        setItems([...allDetails]);
        setHasOutOfStockItems(checkOutOfStockItems(allDetails)); // Actualiza el estado según el stock
      }
    } catch (error) {
      console.error('Error fetching bolsa items:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchItems(); // Llama a la API cuando el componente se monta o se vuelve a enfocar
    }, [token]) // Agrega el token como dependencia
  );

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
                const updatedItems = items.filter(item => item.id !== itemId); // Filtra los ítems eliminados
                setItems(updatedItems);
                setHasOutOfStockItems(checkOutOfStockItems(updatedItems)); // Actualiza si hay ítems sin stock
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
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        <View style={styles.bolsaShadowContainer}>
          <View style={styles.bolsaContainer}>
            <View style={styles.bolsaTitleContainer}>
              <Text style={styles.bolsaTitle}>Mi bolsa</Text>
            </View>
            {loading ? (
              <View style={styles.emptyContainer}>
                <Flow size={48} color="#1E98A8"/>
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
                scrollEnabled={false}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {hasOutOfStockItems && ( // Muestra el mensaje si hay productos sin stock
          <View style={styles.outofcontainer}>
            <View style={styles.outof}>
              <Warning width={20} height={20}></Warning>
              <Text style={styles.outOfStockWarning}>Hay productos sin stock</Text>
            </View>
          </View>
        )}
        <SendButton 
          title="Solicitar" 
          onPress={() => navigation.navigate('Solicitar')} 
          disabled={hasOutOfStockItems || items.length === 0} // Desactiva si no hay productos o hay productos sin stock
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
  buttonContainer: {
    position: 'absolute',
    bottom: 90,
    right: 0,
    left: 0,
  },
  outOfStockWarning: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    marginLeft: 10
  },  
  outofcontainer:{
    width: '100%'
  },
  outof: {
    alignSelf: 'center',  // Asegura que el ancho se ajuste al contenido
    backgroundColor: "#FFF",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Para Android
    paddingHorizontal: 15, // Espacio horizontal para ajustar el contenido
    paddingVertical: 10, // Espacio vertical
    flexDirection: "row"
  },  
});

export default BolsaScreen;