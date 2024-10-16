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
      <BackTopBar navigation={navigation} search={query} profile={() => navigation.navigate("ProfileIndex")}/>
      <View style={styles.content}>
        
        {loading ? (
          <View style={styles.loaderContainer}>
            <Flow size={48} color="#1E98A8" />
          </View>
        ) : error ? (
          <Text style={styles.errorText}>No se encontraron datos del producto.</Text>
        ) : results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()} // Asegúrate de que 'id' sea único
            renderItem={({ item }) => (
              <SearchMedItem item={item} navigation={navigation} />
            )}
            numColumns={2} // Especifica el número de columnas
            columnWrapperStyle={styles.columnWrapper} // Opcional, para estilos entre columnas
            contentContainerStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={true}
          />
        ) : (
          <View style={styles.loaderContainer}>
            <Text style={styles.loaderText}>No se encontraron resultados para "{query}".</Text>
          </View>
        )}
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12, // Espacio entre los elementos y los bordes laterales
  },
  flatListContainer: {
    paddingTop: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Distribuir columnas de manera uniforme
    paddingHorizontal: 3,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  loaderText:{
    fontWeight: "bold",
    color: "gray"
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  title:{
    textAlign: "center",
    padding: 15,
    fontWeight: "bold",
    color: "gray"
  }
});

export default SearchScreen;