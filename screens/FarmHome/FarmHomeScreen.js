import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated, ScrollView, Text, FlatList } from 'react-native';
import FarmNavBar from '../../componentsFarm/FarmNavBar';
import TopBar from '../../componentsHome/TopBar';
import { Flow } from 'react-native-animated-spinkit';
import FarmDonacionItem from '../../componentsFarm/FarmDonacionItem';
import { useFocusEffect } from '@react-navigation/native'; // Importa el hook
import { useSelector } from 'react-redux';

const { height } = Dimensions.get('window');
const FarmNavBar_HEIGHT = height * 0.0974;

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Inicializa la opacidad en 0
  const [medScrolls, setMedScrolls] = useState([]); // Lista de medicamentos
  const [meds, setMeds] = useState([]);  // Estado para almacenar los medicamentos
  const [loading, setLoading] = useState(false); // Estado para controlar el loading
  const token = useSelector(state => state.user.token); // Obtiene el token del estado global

  // Función para traer medicamentos
  const fetchMedScrolls = async () => {
    if (loading) return; // Evitar que se dispare el fetch múltiples veces 
    setLoading(true); // Marcar como cargando

    try {
        const response = await fetch('https://hopeful-emerging-snapper.ngrok-free.app/request/pendant');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        if (data && data.datos) {
            const allDetails = await Promise.all(
                data.datos.map(async (item) => {
                    const detailResponse = await fetch(`https://hopeful-emerging-snapper.ngrok-free.app/medicamento/${item.id_medicamento}`);
                    const detailData = await detailResponse.json();
                    return detailData.datos; // Asegúrate de que estás accediendo a los datos correctos
                })
            );
            setMeds([...allDetails]);
            setMedScrolls(data.datos);
        } else {
            console.error('Estructura de datos inesperada:', data);
        }
    } catch (error) {
        console.error('Error fetching medications:', error);
    } finally {
        setLoading(false); // Terminar la carga
    }    
  };

  // Fetch inicial de medicamentos
  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1, // Cambia la opacidad a 1
      duration: 1000, // Duración de la animación en milisegundos
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useFocusEffect(
    React.useCallback(() => {
        fetchMedScrolls(); // Llamar al fetch cuando el componente monte
    }, [token])
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TopBar navigation={navigation} showText={true} text={"MedHouse Medic"} />
      <ScrollView>
        <View style={styles.bolsaShadowContainer}>
          <View style={styles.bolsaContainer}>
            <View style={styles.bolsaTitleContainer}>
              <Text style={styles.bolsaTitle}>Nuevas solicitudes</Text>
            </View>
            {loading ? (
              <View style={styles.emptyContainer}>
                <Flow size={48} color="#1E98A8"/>
              </View>
            ) : medScrolls.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay nuevas solicitudes, buen trabajo!</Text>
              </View>
            ) : (
              <FlatList
                data={medScrolls}
                renderItem={({ item, index }) => (
                  <FarmDonacionItem
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
      <FarmNavBar navigation={navigation} selected="home" />
    </Animated.View>
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
        alignSelf: 'center',
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

export default HomeScreen;