import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text, Image } from 'react-native';
import axios from 'axios';
import NavBar from '../../componentsHome/NavBar';
import BackTopBar from '../../componentsHome/BackTopBar';
import AskButton from '../../components/AskButton';
import DetailItem from '../../componentsHome/DetailItem';
import Carousel from 'react-native-snap-carousel';
import { Flow } from 'react-native-animated-spinkit'; // Importa el Spinner

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

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/medicamento/${id}`);
        const productData = response.data.datos;

        console.log("Product Data:", productData);

        if (productData && productData.nombre) {
          setProduct(productData);

          const API_KEY = 'AIzaSyDLleYgDPK6K_cXnskOcousP4guhqGYyLU';
          const SEARCH_ENGINE_ID = '42faa62ac6f3f4ded';
          const query = `${productData.nombre} ${productData.marca} ${productData.forma_farm}`;

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
              const imageUrls = imageResponse.data.items.map(item => item.link);
              setProductImages(imageUrls);
            }
          } catch (imageError) {}
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching product data: doesnt exist');
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

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

  return (
    <View style={styles.container}>
      <BackTopBar navigation={() => navigation.goBack()} profile={() => navigation.navigate("ProfileIndex")} />

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
                <Text style={styles.stock}>Stock disponible</Text>
              </View>
              <AskButton
                title={product.stock > 0 ? "Solicitar" : "Notificarme"}
                onPress={() => console.log("Solicitar producto")}
                disabled={product.stock <= 0}
              />
              <View style={styles.space}></View>
              <AskButton
                title="Agregar a la bolsa"
                onPress={() => console.log("Agregar a la bolsa")}
                disabled={product.stock <= 0}
                style={{
                  backgroundColor: product.stock > 0 ? '#DAF2F5' : '#ECF9FA',
                  color: product.stock > 0 ? '#1E98A8' : '#B8E0E5',
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
    textAlign: "left",
    marginTop: 10,
    marginBottom: 25,
  },
  stock: {
    color: 'gray',
  },
  button: {
    backgroundColor: '#1E98A8',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
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