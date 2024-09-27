import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, Alert, ScrollView } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';
import DonacionItem from '../../componentsHome/DonacionItem';
import axios from 'axios'; 
import { useSelector } from 'react-redux';
import { Flow } from 'react-native-animated-spinkit';

const { height, width } = Dimensions.get('window');

const DonacionesScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);  // Estado para almacenar los ítems
  const [meds, setMeds] = useState([]);  // Estado para almacenar los medicamentos
  const [loading, setLoading] = useState(false);  // Estado de carga
  const token = useSelector(state => state.user.token); // Obtiene el token del estado global

  // Función para obtener los ítems de la API
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://hopeful-emerging-snapper.ngrok-free.app/request', {
        headers: {
          Authorization: `Bearer ${token}`, // Autenticación con token
        },
      });
      const data = response.data.datos; // Asegúrate de que estás accediendo a los datos correctos
      if (data != null) {
        // Obtener los detalles de cada medicamento asociado a cada ítem
        const allDetails = await Promise.all(
          data.map(async (item) => {
            const detailResponse = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/medicamento/${item.id_medicamento}`);
            return detailResponse.data.datos; // Asegúrate de que estás accediendo a los datos correctos
          })
        );

        setMeds([...allDetails]);
      }
      setItems([...data]);
    } catch (error) {
      console.error('Error fetching donaciones items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(); // Llama a la API cuando el componente se monta
  }, []);

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        <View style={styles.bolsaShadowContainer}>
          <View style={styles.bolsaContainer}>
            <View style={styles.bolsaTitleContainer}>
              <Text style={styles.bolsaTitle}>Historial de donaciones</Text>
            </View>
            {loading ? (
              <View style={styles.emptyContainer}>
                <Flow size={48} color="#1E98A8"/>
              </View>
            ) : items.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tienes postulaciones de donaciones, intenta agregar alguna!</Text>
              </View>
            ) : (
              <FlatList
                data={items}
                renderItem={({ item, index }) => (
                  <DonacionItem
                    item={item}
                    med={meds[index]}  // Pasar el medicamento correspondiente al ítem
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
      <NavBar navigation={navigation} selected="donaciones" />
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

export default DonacionesScreen;