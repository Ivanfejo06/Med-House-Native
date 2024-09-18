import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import BackTopBar from '../../componentsHome/BackTopBar';
import DeseadosItem from '../../componentsHome/DeseadosItem';
import AskButton from '../../components/AskButton';
import DetailItem from '../../componentsHome/DetailItem';

const { height, width } = Dimensions.get('window');

const ProductoScreen = ({ navigation, id }) => {
  const product = {
    nombre: 'Ibu 400 Ibuprofeno 400mg',
    image: 'https://example.com/image.jpg', // Usa la imagen que tengas
    stock: 1000,
    marca: 'ISA',
    forma_farm: 'Comprimidos',
    dosis: '400 mg',
    droga: 'Ibuprofeno'
  };
  const productDetails = [
    { label: 'Marca', value: product.marca },
    { label: 'Forma farmacéutica', value: product.forma_farm },
    { label: 'Droga', value: product.droga },
    { label: 'Dosis', value: product.dosis },
  ];
  return (
    <View style={styles.container}>
      <BackTopBar navigation={() => navigation.goBack()} profile={() => navigation.navigate("ProfileIndex")}/>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* main con imagen del producto */}
          <View style={styles.main}>
            <View style={styles.titleView}>
              <Text style={styles.title}>{product.nombre}</Text>
            </View>
            <View>
              {/* Hacer el slider */}
              <Image source={{ uri: product.image }} style={styles.productImage} />
            </View>
            <View style={styles.titleView}>
              <Text style={styles.stock}>Stock disponible</Text>
            </View>
            <AskButton 
              title="Solicitar" 
              onPress={() => console.log("messi")} 
            />
            <View style={styles.space}></View>
            <AskButton 
              title="Producto en bolsa" 
              onPress={() => console.log("messi")} 
            />
          </View>     

          {/* Características del producto */}
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
            <Text style={styles.questionsTitle}>Preguntas y respuestas</Text>
            <AskButton 
              title="Preguntar" 
              onPress={() => console.log("messi")} 
            />

            {/* Preguntas recientes */}
            <View style={styles.recentQuestions}>
              <Text style={styles.questionText}>
                Buenas, ¿hacen envío hasta Ma?
              </Text>
              <Text style={styles.answerText}>
                No, acerca tu casa. 23/5/2024
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <NavBar navigation={navigation} selected="Deseados" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#FFF',
    width: '100%'
  },
  main: {
    padding: 15,
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: "#CCC",
    paddingBottom: 30,
  },
  space: {
    height: 10,
    width: '100%'
  },
  productImage: {
    width: 150,
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
  titleView:{
    width: '100%',
    textAlign: "left",
    marginTop: 10,
    marginBottom: 25
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