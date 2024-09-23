import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import NavBar from '../../componentsHome/NavBar';
import BackTopBar from '../../componentsHome/BackTopBar';
import AskButton from '../../components/AskButton';
import DetailItem from '../../componentsHome/DetailItem';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import { Flow } from 'react-native-animated-spinkit'; // Importa el Spinner
import HeartIcon from '../../assets/HeartIcon';

const { height, width } = Dimensions.get('window');
const NAVBAR_HEIGHT = height * 0.0974;
const SLIDER_WIDTH = width;
const ITEM_WIDTH = 300; // Puedes ajustar esto si es necesario

const ProductoScreen = ({ route, navigation }) => {
  const { id } = route.params; // Accede al id desde route.params
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [addedToNecesitado, setAddedToNecesitado] = useState(false);
  const [isInNecesitados, setIsInNecesitados] = useState(false); // New state for checking if product is in "Necesitados"
  const [addedToBolsa, setAddedToBolsa] = useState(false); // Nuevo estado para manejar si está en la bolsa
  const token = useSelector(state => state.user.token); 

  useEffect(() => {
    const fetchProductData = async () => {
        try {
            // Obtiene los datos del producto
            const response = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/medicamento/${id}`);
            const productData = response.data.datos;

        console.log("Product Data:", productData);

            if (productData && productData.nombre) {
                setProduct(productData);

                // Verifica si la imagen del producto existe
                if (productData.imagen != null) {
                    setProductImages([productData.imagen]);
                } else {
                    const API_KEY = 'AIzaSyDLleYgDPK6K_cXnskOcousP4guhqGYyLU';
                    const SEARCH_ENGINE_ID = '42faa62ac6f3f4ded';
                    const query = `${productData.nombre} ${productData.dosis} ${productData.marca} ${productData.forma_farm}`;
                    console.log(query);
                    try {
                        const imageResponse = await axios.get('https://www.googleapis.com/customsearch/v1', {
                            params: {
                                key: API_KEY,
                                cx: SEARCH_ENGINE_ID,
                                searchType: 'image',
                                q: query,
                                num: 1,
                                gl: 'ar',
                            },
                        });

                        if (imageResponse.data.items && imageResponse.data.items.length > 0) {
                            const imageUrl = imageResponse.data.items[0].link;
                            setProductImages([imageUrl]);

                            // Actualiza la imagen del producto en la base de datos
                            await axios.put(`https://hopeful-emerging-snapper.ngrok-free.app/medicamento/${id}`, {
                                url: [imageUrl]
                            });
                        }
                    } catch (imageError) {
                        console.error("Error fetching image from Google:", imageError);
                    }
                }

                // Verifica si el producto está en "Necesitados"
                const necesitaResponse = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/necesitados/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsInNecesitados(!necesitaResponse.data.datos);

                // Nueva consulta para verificar si el producto está en la bolsa
                const bolsaResponse = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/bolsa/check/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAddedToBolsa(bolsaResponse.data.datos); // Asume que la API devuelve un campo "success"
            } else {
                setError(true);
            }
        } catch (error) {
            console.error('Error fetching product data: does not exist', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    fetchProductData();
  }, [id, token]);

  const handleAddToNecesitado = async () => {
    if (!product) return;
  
    try {
      const response = await axios.post(
        'https://hopeful-emerging-snapper.ngrok-free.app/necesitados',
        { idMedicamento: product.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Check if the response indicates success
      if (response.data.success) {
        setAddedToNecesitado(true);
        setIsInNecesitados(true); // Update state to reflect that the product is now added
        console.log('Producto agregado a necesitados.');
      } else {
        console.error('Error al agregar el producto:', response.data.message);
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };
  
  const handleAddToBolsa = async () => {
    try {
        const response = await axios.post(
            `https://hopeful-emerging-snapper.ngrok-free.app/bolsa/${id}`, // Endpoint de agregar a bolsa
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Autenticación Bearer token
                },
            }
        );

        if (response.data.success) {
            setAddedToBolsa(true);
            Alert.alert('Éxito', 'Producto agregado a la bolsa.');
        } else {
            Alert.alert('Error', response.data.message || 'No se pudo agregar a la bolsa.');
        }
    } catch (error) {
        console.error('Error al agregar a la bolsa:', error);
        Alert.alert('Error', 'Ocurrió un error al agregar el producto a la bolsa.');
    }
};

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item }} style={styles.productImage} />
    </View>
  );

  const productDetails = product ? [
    { label: 'Marca', value: product.marca },
    { label: 'Forma farmacéutica', value: product.forma_farm },
    { label: 'Droga', value: product.droga },
    { label: 'Dosis', value: product.dosis },
  ] : [];

  const handleRemove = async () => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este item de tus deseados?',
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
                data: { idMedicamento: product.id },
              });
  
              const result = response.data;
  
              if (result.success) {
                setIsInNecesitados(false); // Update state to reflect that the product is no longer in "Necesitados"
                console.log('Producto eliminado de necesitados.');
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
      <BackTopBar navigation={navigation} profile={() => navigation.navigate("ProfileIndex")} />

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <Flow size={48} color="#1E98A8"/>
          </View>
        ) : error ? (
          <Text>No se encontraron datos del producto.</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollcontainer}>
            <View style={styles.main}>
              <View style={styles.titleView}>
                <Text style={styles.title}>{product.nombre}</Text>
                <TouchableOpacity
                  onPress={isInNecesitados ? handleRemove : handleAddToNecesitado} 
                  style={[styles.addButton, isInNecesitados && styles.addedButton]}
                >
                  <HeartIcon 
                    tintColor={isInNecesitados ? '#1E98A8' : null} 
                    strokecolor={isInNecesitados ? null : '#BBB'} 
                  />
                </TouchableOpacity>
              </View>

              {productImages.length > 0 ? (
                <Carousel
                  data={productImages}
                  renderItem={renderCarouselItem}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  loop={true}
                />
              ) : (
                <Text>Cargando imágenes...</Text>
              )}

              <View style={styles.titleView}>
                <Text style={styles.stock}>{product.stock > 0 ? "Stock disponible" : "Sin stock"}</Text>
              </View>
              <AskButton
                title={product.stock > 0 ? "Solicitar" : "Notificarme"}
                onPress={() => console.log("Solicitar producto")}
                disabled={product.stock <= 0}
              />
              <View style={styles.space}></View>
              <AskButton
                title={
                    product.stock <= 0
                        ? "Sin stock"
                        : addedToBolsa
                            ? "Producto en Bolsa"
                            : "Agregar a la bolsa"
                }
                onPress={product.stock > 0 && !addedToBolsa ? handleAddToBolsa : null} // Evita la acción si ya está en la bolsa
                disabled={product.stock <= 0 || addedToBolsa}
                style={{
                    backgroundColor:
                        product.stock <= 0
                            ? '#DAF2F5'
                            : addedToBolsa
                                ? '#ECF9FA'
                                : '#DAF2F5',
                    color:
                        product.stock <= 0
                            ? '#B8E0E5'
                            : addedToBolsa
                                ? '#B8E0E5'
                                : '#1E98A8',
                }}
              />
            </View>

            <View style={styles.main}>
              <View style={styles.titleView}>
                <Text style={styles.characteristics}>Características del producto</Text>
              </View>
              <View style={styles.specs}>
                {productDetails.map((detail, index) => (
                  <DetailItem
                    key={index}
                    label={detail.label}
                    value={detail.value}
                    backgroundColor={index % 2 === 0 ? '#D9D9D9' : '#F1F1F1'}
                  />
                ))}
              </View>
            </View>

            <View style={styles.main}>
              <View style={styles.titleView}>
                <Text style={styles.characteristics}>Preguntas</Text>
              </View>
              <AskButton
                title="Preguntar"
                onPress={() => console.log("Hacer pregunta")}
              />
            </View>
          </ScrollView>
        )}
      </View>

      <NavBar navigation={navigation} selected="Deseados" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80
  },
  scrollcontainer: {
    paddingBottom: NAVBAR_HEIGHT,
  },
  main: {
    padding: 15,
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: "#DDD",
    paddingBottom: 30,
  },
  space: {
    height: 10,
    width: '100%',
  },
  productImage: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  characteristics: {
    fontSize: 18,
  },
  titleView: {
    width: '100%',
    marginTop: 10,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  stock: {
    color: 'gray',
  },
  productDetails: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  specs: {
    width: '100%',
    overflow: "hidden",
  },
  questionsContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
  },
  questionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  askButton: {
    backgroundColor: '#1E98A8',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  askButtonText: {
    color: '#FFF',
  },
  recentQuestions: {
    marginTop: 10,
  },
  questionText: {
    color: '#000',
    marginBottom: 5,
  },
  answerText: {
    color: 'gray',
    fontSize: 12,
  },
});

export default ProductoScreen;