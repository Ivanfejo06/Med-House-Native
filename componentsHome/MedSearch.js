import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import axios from 'axios';
import MedSelector from './MedSelector';
import { Flow } from 'react-native-animated-spinkit';

const { height } = Dimensions.get('window');

const HEIGHT = height * 0.03521;
const LINER_HEIGHT = height * 0.03521;

const MedSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://hopeful-emerging-snapper.ngrok-free.app/busqueda/${query}`);
      setResults(response.data.datos);
    } catch (err) {
      setError('Error al cargar los medicamentos');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query.length > 2) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (item) => {
    onSelect(item);
    setQuery('');
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.liner}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Buscar medicamentos..."
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Flow size={48} color="#1E98A8" />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MedSelector item={item} onSelect={handleSelect} />}
          ListEmptyComponent={!loading && query.length > 2 && <Text style={styles.noResultsText}>No hay resultados</Text>}
          style={styles.list}
        />
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.84,
    justifyContent: "space-between",
    marginBottom: 20,
    width: '100%',
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#1E98A8"
  },
  input: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    zIndex: 1,
    flex: 1,
  },
  liner: {
    alignItems: 'center',
    height: LINER_HEIGHT,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginVertical: 10,
  },
  noResultsText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#7D7D7D',
  },
  list: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    width: '100%',
  },
});

export default MedSearch;