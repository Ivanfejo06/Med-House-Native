import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import NavBar from '../../componentsHome/NavBar';
import BackTopBar from '../../componentsHome/BackTopBar';
import SearchMedItem from '../../componentsHome/SearchMedItem'; // Asegúrate de que la ruta sea correcta
import { Flow } from 'react-native-animated-spinkit'; // Importa el Spinner

const { height } = Dimensions.get('window');

const NAVBAR_HEIGHT = height * 0.0974;

const SearchScreen = ({ navigation, route }) => {
  const { query } = route.params; // Obtener la query de los parámetros de navegación
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/busqueda/${query}`);
        if (response.data.datos) {
          setResults(response.data.datos); // Asumimos que la respuesta es un array
        } else {
          setResults([]); // Si la respuesta es null o undefined, establecer results como un array vacío
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <View style={styles.container}>
        <BackTopBar navigation={navigation} profile={() => navigation.navigate("ProfileIndex")} />
        <View style={styles.content}>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <Flow size={48} color="#1E98A8" />
                </View>
            ) : error ? (
                <Text style={styles.errorText}>No se encontraron datos del producto.</Text>
            ) : results.length > 0 ? (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.main}>
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.id.toString()} // Asegúrate de que 'id' sea único
                        renderItem={({ item }) => (
                        <SearchMedItem item={item} navigation={navigation} />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                </ScrollView>
            ) : (
                <View style={styles.loaderContainer}>
                    <Text>No se encontraron resultados para la búsqueda de "{query}".</Text>
                </View>
                )
            }
        </View>
        <NavBar navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: NAVBAR_HEIGHT,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  }
});

export default SearchScreen;