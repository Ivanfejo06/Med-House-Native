import React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';
import BolsaItem from '../../componentsHome/BolsaItem';
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

const BolsaScreen = ({ navigation }) => {
  const handleIncrease = (itemId) => {
    console.log(`Increase quantity for item ${itemId}`);
  };

  const handleDecrease = (itemId) => {
    console.log(`Decrease quantity for item ${itemId}`);
  };

  const handleRemove = (itemId) => {
    console.log(`Remove item ${itemId}`);
  };

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <View style={styles.bolsaShadowContainer}>
        <View style={styles.bolsaContainer}>
          <View style={styles.bolsaTitleContainer}>
            <Text style={styles.bolsaTitle}>Mi bolsa</Text>
          </View>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <BolsaItem
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.itemList}
          />
        </View>
      </View>
      <View style={styles.button}>
        <SendButton 
          title="Solicitar" 
          onPress={() => console.log("messi")} 
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
    elevation: 5, // Añade esta línea para Android
  },
  bolsaContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden', // Se mantiene en el contenedor interno
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
  button:{
    position: "absolute",
    bottom: 90,
    right: 0,
    left: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Añade esta línea para Android
  }
});

export default BolsaScreen;