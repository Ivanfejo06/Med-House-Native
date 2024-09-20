import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated, Text, FlatList, ScrollView } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';
import MedItem from '../../componentsHome/MedItem';
import HorizontalMedItem from '../../componentsHome/HorizontalMedItem';
import OptionsIcon from '../../assets/OptionsIcon';
import HeartIcon from '../../assets/HeartIcon';

const { height } = Dimensions.get('window');

const NAVBAR_HEIGHT = height * 0.0974;

const donations = [
  {
    id: 1,
    title: 'Donación 1',
    description: 'Descripción de la donación 1',
    image: 'https://your-image-url.com/Med1.png',
    stock: 1
  },
  {
    id: 2,
    title: 'Donación 2',
    description: 'Descripción de la donación 2',
    image: 'https://your-image-url.com/Med2.png',
    stock: 1
  },
  {
    id: 3,
    title: 'Donación 3',
    description: 'Descripción de la donación 3',
    image: 'https://your-image-url.com/Med3.png',
    stock: 0
  },
  {
    id: 4,
    title: 'Donación 4',
    description: 'Descripción de la donación 4',
    image: 'https://your-image-url.com/Med4.png',
    stock: 0
  },
  {
    id: 5,
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
        <View style={styles.top}>
          <TouchableOpacity>
            <OptionsIcon width={30} height={30}></OptionsIcon>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLiked}>
            <HeartIcon width={27} height={27}></HeartIcon>
          </TouchableOpacity>
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
                  navigation={navigation} 
                />
              )}
              keyExtractor={(item) => item.id.toString()} // Asegúrate de convertir el ID a string
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
                <HorizontalMedItem item={item} navigation={navigation} />
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
  scrollContainer: {
    paddingBottom: NAVBAR_HEIGHT
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 30
  },
  MedesShadowContainer: {
    marginVertical: 20,
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
    marginBottom: 20,
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
    paddingHorizontal: 5
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