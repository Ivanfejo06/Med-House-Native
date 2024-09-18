import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text, Image } from 'react-native';
import axios from 'axios';
import NavBar from '../../componentsHome/NavBar';
import BackTopBar from '../../componentsHome/BackTopBar';
import AskButton from '../../components/AskButton';
import DetailItem from '../../componentsHome/DetailItem';

const { height } = Dimensions.get('window');
const NAVBAR_HEIGHT = height * 0.0974;

const ProductoScreen = ({ navigation, id }) => {
  const [productImage, setProductImage] = useState(null);

  const product = {
    nombre: 'Ibu 400 Ibuprofeno 400mg',
    stock: 1,
    marca: 'ISA',
    forma_farm: 'Comprimidos',
    dosis: '400 mg',
    droga: 'Ibuprofeno',
  };

  const bagItems = [];
  const productDetails = [
    { label: 'Marca', value: product.marca },
    { label: 'Forma farmacéutica', value: product.forma_farm },
    { label: 'Droga', value: product.droga },
    { label: 'Dosis', value: product.dosis },
  ];

  useEffect(() => {
    const fetchImage = async () => {
      const API_KEY = 'AIzaSyDLleYgDPK6K_cXnskOcousP4guhqGYyLU';
      const SEARCH_ENGINE_ID = '42faa62ac6f3f4ded';
      const query = encodeURIComponent(product.nombre);
  
      try {
        const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
          params: {
            key: API_KEY,
            cx: SEARCH_ENGINE_ID,
            searchType: 'image',
            q: query,
            num: 1,
          },
        });
  
        console.log('Respuesta de la API:', response.data); // Imprime la respuesta
  
        if (response.data.items && response.data.items.length > 0) {
          const imageUrl = response.data.items[0].link;
          console.log('URL de la imagen:', imageUrl); // Imprime la URL de la imagen
          setProductImage(imageUrl);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
  
    fetchImage();
  }, []);  

  const isProductInStock = (stock) => stock > 0;
  const isProductInBag = (productId, bagItems) => bagItems.some(item => item.id === productId);

  const inStock = isProductInStock(product.stock);
  const inBag = isProductInBag(id, bagItems);

  return (
    <View style={styles.container}>
      <BackTopBar navigation={() => navigation.goBack()} profile={() => navigation.navigate("ProfileIndex")}/>
      <ScrollView contentContainerStyle={styles.scrollcontainer}>
        <View style={styles.main}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{product.nombre}</Text>
          </View>
          <View>
            {productImage ? (
              <Image source={{ uri: productImage }} style={styles.productImage} />
            ) : (
              <Text>Cargando imagen...</Text>
            )}
          </View>
          <View style={styles.titleView}>
            <Text style={styles.stock}>Stock disponible</Text>
          </View>
          <AskButton 
            title={inStock ? "Solicitar" : "Notificarme"}
            onPress={() => console.log("Solicitar producto")} 
            disabled={!inStock}
          />
          <View style={styles.space}></View>
          <AskButton 
            title={inBag ? "Producto en bolsa" : "Agregar a la bolsa"} 
            onPress={() => console.log(inBag ? "Producto en bolsa" : "Agregar a la bolsa")} 
            disabled={!inBag && inStock}
            style={{
              backgroundColor: !inBag && inStock ? '#DAF2F5' : '#ECF9FA',
              color: !inBag && inStock ? '#1E98A8' : '#B8E0E5',
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

        {/* Preguntas y respuestas */}
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
      <NavBar navigation={navigation} selected="Deseados" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#FFFFFF',
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
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
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
    color: 'gray'
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
  specs:{
    width: '100%',
    overflow: "hidden"
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