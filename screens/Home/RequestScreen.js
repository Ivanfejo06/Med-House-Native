import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import NavBar from '../../componentsHome/NavBar';
import BackTopBar from '../../componentsHome/BackTopBar';
import DetailItem from '../../componentsHome/DetailItem';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import { Flow } from 'react-native-animated-spinkit';
import MedItem from '../../componentsHome/MedItem';

const { height, width } = Dimensions.get('window');
const SLIDER_WIDTH = width;
const ITEM_WIDTH = 300; // Puedes ajustar esto si es necesario

const RequestScreen = ({ route, navigation }) => {
  const { id, med } = route.params;
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);  // Estado para manejar el loading
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState("");
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/request/${id}`);
        const requestData = response.data.datos;
        if (requestData) {
          setRequest(requestData);
          const userId = requestData.id_usuario;
          const userResponse = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/usuario/${userId}`);
          setUserData(userResponse.data.datos);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching request data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRequestData();
  }, [id, token]);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar esta solicitud?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await axios.delete(`https://hopeful-emerging-snapper.ngrok-free.app/request/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              navigation.goBack(); // Regresa a la pantalla anterior
            } catch (error) {
              console.error('Error deleting request:', error);
              alert('Error al eliminar la solicitud. Por favor, inténtalo de nuevo.');
            }
          },
          style: "destructive"
        }
      ]
    );
  };  

  // Determinar el color y texto basado en el estado del request
  const itemStateColor = request?.estado === true
    ? '#1EA82C'
    : request?.estado === false
    ? '#ED5046'
    : '#1E98A8';

  const stateText = request?.estado === true
    ? 'Validado'
    : request?.estado === false
    ? 'Rechazado'
    : 'En proceso';

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item }} style={styles.requestImage} />
    </View>
  );

  const requestDetails = request
    ? [
        { label: 'Cantidad', value: request.cantidad },
        { label: 'Fecha de apertura', value: request.fecha_apertura.split('T')[0] },
        { label: 'Fecha de caducidad', value: request.fecha_caducidad.split('T')[0] },
        { label: 'Descripcion', value: request.descripcion},
      ]
    : [];

  return (
    <View style={styles.container}>
      <BackTopBar navigation={navigation} profile={() => navigation.navigate('ProfileIndex')} />

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <Flow size={48} color="#1E98A8" />
          </View>
        ) : error ? (
          <Text>No se encontraron datos del request.</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.main}>
              {request.images && request.images.length > 0 ? (
                <Carousel
                  data={request.images}
                  renderItem={renderCarouselItem}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  loop={true}
                />
              ) : (
                <Text>Cargando imágenes...</Text>
              )}
            </View>

            <View style={styles.MedesShadowContainer}>
              <View style={styles.MedesContainer}>
                <View style={styles.MedesTitleContainer}>
                  <View style={styles.MedesNameContainer}>
                    <Image source={require('../../assets/Face.png')} style={styles.foto} />
                    {userData ? (
                      <Text style={styles.MedesTitle}>{userData.nombre} {userData.apellido}</Text>
                    ) : (
                      <Text style={styles.MedesTitle}>Cargando datos del usuario...</Text>
                    )}
                  </View>
                  {request?.estado === null && ( // Cambia aquí para verificar si el estado es "En proceso"
                    <TouchableOpacity style={styles.itemDelete} onPress={handleDelete}>
                      <Text style={styles.itemDeleteText}>Cancelar</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <MedItem navigation={navigation} item={med}/>
                <View style={styles.main}>
                  <View style={styles.specs}>
                    {requestDetails.map((detail, index) => (
                      <DetailItem key={index} label={detail.label} value={detail.value} />
                    ))}
                  </View>
                  <View style={[styles.itemState, { backgroundColor: itemStateColor }]} >
                    <Text style={styles.itemStateText}>{stateText}</Text>
                  </View>

                  {/* Nueva vista debajo de itemStateContainer solo si el estado es "Validado" */}
                  {request.estado === true && (
                    <View style={styles.specs}>
                      <View style={styles.titleView}>
                        <Text style={styles.characteristics}>Comentario del medico</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text>{request.comentario}</Text>
                      </View>
                      
                      <View style={styles.validatedContainer}>
                        <Text style={styles.validatedText}>Tu solicitud ha sido aceptada! Dirigete a los almacenes de de <Text style={styles.validatedHighlightedText}>MedHouse</Text> para depositar el medicamento.</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      <NavBar navigation={navigation} selected="donaciones" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  scrollContainer: {
    paddingBottom: height * 0.0974, // NAVBAR_HEIGHT
  },
  main: {
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  characteristics: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleView: {
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailItem: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: "#1E98A8",
    width: "100%",
  },
  requestImage: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemState: {
    padding: 12,
    borderRadius: 20,
    marginTop: 10
  },
  itemStateText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDelete: {
    padding: 7,
    borderRadius: 20,
    backgroundColor: "#ED5046"
  },
  itemDeleteText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  MedesShadowContainer: {
    marginVertical: 20,
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Para Android
  },
  MedesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
  },
  MedesTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5
  },
  MedesTitleContainer: {
    flexDirection: "row",
    backgroundColor: '#1E98A8',
    padding: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between"
  },
  MedesNameContainer:{
    flexDirection: "row",
    display: "flex",
    alignItems: "center"
  },
  specs: {
    width: '100%',
    alignItems: "center",
    textAlign: "center",
  },
  foto:{
    width: 25,
    height: 25
  },
  validatedContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 21  
  },
  validatedText:{
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: "center"
  },
  validatedHighlightedText:{
    fontSize: 17,
    color: '#1E98A8',
    fontWeight: 'bold',
    textAlign: "center"
  }
});

export default RequestScreen;