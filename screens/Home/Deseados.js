import React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import BackTopBar from '../../componentsHome/BackTopBar';
import DeseadosItem from '../../componentsHome/DeseadosItem';
import SendButton from '../../components/SendButton';

const { height, width } = Dimensions.get('window');

const items = [
  {
    id: '1',
    title: 'Fiebrolex',
    description: 'Paracetamol 500mg',
    image: 'https://your-image-url.com/fiebrolex.png',
    quantity: 1,
  },
  {
    id: '2',
    title: 'Ibu 400',
    description: 'Ibuprofeno 400mg',
    image: 'https://your-image-url.com/ibu400.png',
    quantity: 1,
  }
  // Agrega más elementos según sea necesario
];

const DeseadosScreen = ({ navigation }) => {

  const handleRemove = (itemId) => {
    console.log(`Remove item ${itemId}`);
  };

  return (
    <View style={styles.container}>
      <BackTopBar navigation={() => navigation.goBack()} profile={() => navigation.navigate("ProfileIndex")}/>
      <View style={styles.DeseadosShadowContainer}>
        <View style={styles.DeseadosContainer}>
          <View style={styles.DeseadosTitleContainer}>
            <Text style={styles.DeseadosTitle}>Deseados</Text>
          </View>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <DeseadosItem
                item={item}
                onRemove={handleRemove}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.itemList}
          />
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
});

export default DeseadosScreen;