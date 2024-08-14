import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Animated, Text, FlatList, ScrollView } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';
import MedItem from '../../componentsHome/MedItem';
import HorizontalMedItem from '../../componentsHome/HorizontalMedItem';

const { height } = Dimensions.get('window');

const donations = [
  {
    id: '1',
    title: 'Donación 1',
    description: 'Descripción de la donación 1',
    image: 'https://your-image-url.com/Med1.png',
    stock: 1
  },
  {
    id: '2',
    title: 'Donación 2',
    description: 'Descripción de la donación 2',
    image: 'https://your-image-url.com/Med2.png',
    stock: 1
  },
  {
    id: '3',
    title: 'Donación 3',
    description: 'Descripción de la donación 3',
    image: 'https://your-image-url.com/Med3.png',
    stock: 0
  },
  {
    id: '4',
    title: 'Donación 4',
    description: 'Descripción de la donación 4',
    image: 'https://your-image-url.com/Med4.png',
    stock: 0
  },
  {
    id: '5',
    title: 'Donación 5',
    description: 'Descripción de la donación 5',
    image: 'https://your-image-url.com/Med5.png',
    stock: 1
  },
  // Agrega más elementos según sea necesario
];

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Inicializa la opacidad en 0

  const handleLiked = () => {
    navigation.navigate('Deseados');
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Cambia la opacidad a 1
      duration: 1000, // Duración de la animación en milisegundos
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TopBar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.content}>
        <View style={styles.top}>
          <TouchableOpacity>
            <Image style={styles.favs} source={require("../../assets/Options.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLiked}>
            <Image style={styles.favsH} source={require("../../assets/Heart.png")} />
          </TouchableOpacity>
        </View>
      </View>
        <View style={styles.MedesShadowContainer}>
          <View style={styles.MedesContainer}>
            <View style={styles.MedesTitleContainer}>
              <Text style={styles.MedesTitle}>Mis Medes</Text>
            </View>
            <FlatList
              data={donations}
              renderItem={({ item }) => (
                <MedItem
                  item={item}
                />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.itemList}
            />
          </View>
        </View>
        <View style={styles.HorizontalMedesShadowContainer}>
          <View style={styles.HorizontalMedesContainer}>
            <View style={styles.MedesTitleContainer}>
              <Text style={styles.MedesTitle}>Mis Medes</Text>
            </View>
            <FlatList
              data={donations}
              renderItem={({ item }) => (
                <HorizontalMedItem
                  item={item}
                />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.HorizontalitemList}
              horizontal
            />
          </View>
        </View>
      </ScrollView>
      <NavBar navigation={navigation} selected="home" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingBottom: 80, // Espacio para el NavBar
  },
  top: {
    flexDirection: 'row',
    width: 333,
    justifyContent: 'space-between',
    margin: 20,
    marginBottom: 0
  },
  favs: {
    height: 30,
    width: 30,
    overflow: 'visible',
    objectFit: 'contain',
  },
  favsH: {
    height: 27,
    width: 27,
    overflow: 'visible',
    objectFit: 'contain',
  },
  MedesShadowContainer: {
    marginTop: 20,
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Añade esta línea para Android
  },
  MedesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
  },
  HorizontalMedesShadowContainer: {
    marginTop: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Añade esta línea para Android
  },
  HorizontalMedesContainer: {
    overflow: 'hidden',
    backgroundColor: "#1E98A8"
  },
  HorizontalitemList:{
    flexDirection: "row",
  },
  MedesTitleContainer: {
    backgroundColor: '#1E98A8',
    padding: 5,
    alignItems: 'center',
  },
  MedesTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default HomeScreen;