import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated, ScrollView } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';
import VerticalMedScroll from '../../componentsHome/VerticalMedScroll';
import HorizontalMedScroll from '../../componentsHome/HorizontalMedScroll';
import OptionsIcon from '../../assets/OptionsIcon';
import HeartIcon from '../../assets/HeartIcon';

const { height } = Dimensions.get('window');
const NAVBAR_HEIGHT = height * 0.0974;

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Inicializa la opacidad en 0
  const [medScrolls, setMedScrolls] = useState([]); // Lista dinámica de MedScrolls
  const [page, setPage] = useState(1); // Estado para paginación de horizontal scrolls
  const [loading, setLoading] = useState(false); // Estado para controlar el loading
  const [selectedCategories, setSelectedCategories] = useState(new Set()); // Conjunto para categorías seleccionadas

  const handleLiked = () => {
    navigation.navigate('Deseados');
  };

  // Función para traer más categorías y medicamentos cuando el usuario baja
  const fetchMoreMedScrolls = async () => {
    if (loading) return; // Evitar que se dispare el fetch múltiples veces
    setLoading(true); // Marcar como cargando

    try {
      // Traer categorías de medicamentos
      const categoriesResponse = await fetch('https://hopeful-emerging-snapper.ngrok-free.app/categorias');
      const categoriesData = await categoriesResponse.json();
      const categories = categoriesData.datos;

      // Filtrar las categorías ya seleccionadas
      const availableCategories = categories.filter(category => !selectedCategories.has(category.id));

      // Verificar si hay más categorías disponibles
      if (availableCategories.length === 0) {
        console.log('No hay más categorías disponibles');
        return; // No hacer nada si no hay más categorías
      }

      // Seleccionar 5 categorías aleatorias de las disponibles
      const selected = availableCategories.sort(() => 0.5 - Math.random()).slice(0, 5);

      // Agregar las categorías seleccionadas al conjunto
      selected.forEach(category => selectedCategories.add(category.id));

      // Fetch de medicamentos por cada categoría para VerticalMedScroll
      const medsPromises = selected.map(async (category) => {
        const medsResponse = await fetch(`https://hopeful-emerging-snapper.ngrok-free.app/medicamento/categoria/${category.id}?limit=5&orderBy=stock`);
        const medsData = await medsResponse.json();
        return {
          categoryId: category.id,
          categoryName: category.nombre, // Suponiendo que la categoría tiene una propiedad `name`
          meds: medsData.datos, // Asignar medicamentos de la categoría
        };
      });

      // Traer medicamentos para el nuevo set de VerticalMedScroll
      const results = await Promise.all(medsPromises);

      // Filtrar resultados vacíos
      const validResults = results.filter(result => result.meds.length > 0);
      if (validResults.length === 0) {
        console.log('No hay medicamentos disponibles para las categorías seleccionadas');
        return; // No hacer nada si no hay medicamentos
      }

      // Agregar nuevos MedScrolls a la lista dinámica
      setMedScrolls((prevScrolls) => [
        ...prevScrolls,
        ...validResults.map(result => ({
          verticalMeds: result.meds, // Medicamentos de la categoría
          categoryName: result.categoryName, // Nombre de la categoría
          page: page, // Página actual para paginación
        })),
      ]);
      setPage((prevPage) => prevPage + 1); // Incrementar página para la siguiente tanda

    } catch (error) {
      console.error('Error fetching more categories or medicines:', error);
    } finally {
      setLoading(false); // Terminar la carga
    }
  };

  // Fetch inicial de la primera tanda de medicamentos
  useEffect(() => {
    fetchMoreMedScrolls(); // Llamar al fetch cuando el componente monte

    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1, // Cambia la opacidad a 1
      duration: 1000, // Duración de la animación en milisegundos
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Detectar cuando el usuario llega al final del ScrollView
  const handleEndReached = () => {
    if (!loading) {
      fetchMoreMedScrolls(); // Traer más MedScrolls
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TopBar navigation={navigation} />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        onMomentumScrollEnd={handleEndReached} // Detecta cuando se llega al final del scroll
      >
        <View style={styles.top}>
          <TouchableOpacity>
            <OptionsIcon width={30} height={30}></OptionsIcon>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLiked}>
            <HeartIcon width={27} height={27}></HeartIcon>
          </TouchableOpacity>
        </View>

        {/* Generar dinámicamente múltiples MedScrolls */}
        {medScrolls.map((scrollData, index) => (
          <View key={index}>
            {/* Scroll vertical con medicamentos de categorías */}
            <VerticalMedScroll
              donations={scrollData.verticalMeds}
              navigation={navigation}
              title={`${scrollData.categoryName}`} // Nombre de la categoría
            />

            {/* Scroll horizontal con paginación */}
            <HorizontalMedScroll
              donations={scrollData.horizontalMeds || []}
              navigation={navigation}
              title={`${scrollData.categoryName}`} // Nombre de la categoría
              onEndReached={() => {
                fetchHorizontalMeds(scrollData.page).then((newMeds) => {
                  // Actualizar el scroll horizontal con más medicamentos
                  setMedScrolls((prevScrolls) => {
                    const updatedScrolls = [...prevScrolls];
                    updatedScrolls[index].horizontalMeds = [
                      ...(updatedScrolls[index].horizontalMeds || []),
                      ...newMeds,
                    ];
                    return updatedScrolls;
                  });
                });
              }}
            />
          </View>
        ))}
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
    paddingBottom: NAVBAR_HEIGHT,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 30,
  },
});

export default HomeScreen;