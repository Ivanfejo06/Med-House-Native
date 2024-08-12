import React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';
import DonacionItem from '../../componentsHome/DonacionItem';

const { height, width } = Dimensions.get('window');

const donations = [
  {
    id: '1',
    title: 'Donación 1',
    description: 'Descripción de la donación 1',
    image: 'https://your-image-url.com/donacion1.png',
    quantity: 1,
    state: false // Rechazado
  },
  {
    id: '2',
    title: 'Donación 2',
    description: 'Descripción de la donación 2',
    image: 'https://your-image-url.com/donacion2.png',
    quantity: 1,
    state: null // En proceso
  },
  {
    id: '3',
    title: 'Donación 3',
    description: 'Descripción de la donación 3',
    image: 'https://your-image-url.com/donacion3.png',
    quantity: 1,
    state: true // Validado
  }
  // Agrega más elementos según sea necesario
];

const DonacionesScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <View style={styles.donacionesShadowContainer}>
        <View style={styles.donacionesContainer}>
          <View style={styles.donacionesTitleContainer}>
            <Text style={styles.donacionesTitle}>Mis donaciones</Text>
          </View>
          <FlatList
            data={donations}
            renderItem={({ item }) => (
              <DonacionItem
                item={item}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.itemList}
          />
        </View>
      </View>
      <NavBar navigation={navigation} selected="donaciones" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  donacionesShadowContainer: {
    marginTop: 20,
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Añade esta línea para Android
  },
  donacionesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    maxHeight: 515,
  },
  donacionesTitleContainer: {
    backgroundColor: '#1E98A8',
    padding: 5,
    alignItems: 'center',
  },
  donacionesTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default DonacionesScreen;