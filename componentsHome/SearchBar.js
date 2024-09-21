import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Suponiendo que usas Redux para manejar el token

const { height } = Dimensions.get('window');

const TOPBAR_HEIGHT = height * 0.13;
const LINER_HEIGHT = height * 0.03521;
const HEIGHT = height * 0.03521;
const BORDERRADIUS = height * 0.029342;

const SearchBar = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const textInputRef = useRef(null);
  const token = useSelector(state => state.user.token); // Ajusta según tu estructura de Redux

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get('https://hopeful-emerging-snapper.ngrok-free.app/busqueda/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setSearchHistory(response.data.datos); // Asume que "datos" es la clave con el array
      }
    } catch (error) {
      console.error(error);
    }
  };  

  const handleSearch = async () => {
    if (query) {
      try {
        // Verifica si la búsqueda ya existe en el historial
        let searchExists = false;
        if(searchHistory){
            searchExists = searchHistory.some(item => item.busqueda.toLowerCase() === query.toLowerCase());
        }

        if (!searchExists) {
          await axios.post(`https://hopeful-emerging-snapper.ngrok-free.app/busqueda/${query}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });

          // Agrega la nueva búsqueda solo si no existe
          setSearchHistory(prev => [...prev, { busqueda: query }]);
        }

        navigation.navigate('Search', { query });
      } catch (error) {
        console.error(error);
      }
    }
    setModalVisible(false);
  };  

  const handleSearchTouch = async (busqueda) => {
    if (busqueda) {
      setQuery(busqueda);
      navigation.navigate('Search', { query: busqueda });
    }
    setModalVisible(false);
  };

  const deleteSearch = async (id) => {
    try {
      await axios.delete(`https://hopeful-emerging-snapper.ngrok-free.app/busqueda/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSearchHistory(prev => prev.filter(item => item.id !== id)); // Filtra el historial
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllSearches = async () => {
    try {
      await axios.delete(`https://hopeful-emerging-snapper.ngrok-free.app/busqueda/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSearchHistory([]); // Limpia el historial
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = async () => {
    setModalVisible(true);
    setQuery('');
    await fetchSearchHistory(); // Cargar historial al abrir el modal
    setTimeout(() => {
      textInputRef.current.focus();
    }, 100);
  };

  return (
    <View style={styles.conteiner}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.placeholderText}>Buscar en MedHouse</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.container}>
              <View style={styles.liner}>
                <View style={styles.searchBar}>
                  <TextInput
                    ref={textInputRef}
                    placeholder='Buscar en MedHouse'
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                    style={styles.input}
                    returnKeyType="search"
                  />
                </View>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={deleteAllSearches}>
              <Text style={styles.deleteAllButton}>Borrar historial</Text>
            </TouchableOpacity>
            <FlatList
              data={searchHistory}
              keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} // Asegúrate de que cada item tenga un id único
              renderItem={({ item }) => (
                <View style={styles.flexer}>
                  <TouchableOpacity onPress={() => handleSearchTouch(item.busqueda)}>
                    <Text>{item.busqueda}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteSearch(item.id)}>
                    <Text style={styles.deleteButton}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={styles.historyList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#1E98A8',
    borderBottomLeftRadius: BORDERRADIUS,
    borderBottomRightRadius: BORDERRADIUS,
    width: '100%',
    height: TOPBAR_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative', // Esto es necesario para que 'liner' pueda posicionarse absolutamente dentro de 'container'
  },
  liner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: LINER_HEIGHT,
    bottom: HEIGHT / 2,
    marginLeft: 15,
    marginRight: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT,
    marginRight: 15,
    borderRadius: HEIGHT / 2,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    zIndex: 1,
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#aaa',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  modalContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  historyList: {
    flexGrow: 1,
  },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ED5046",
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    paddingHorizontal: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: "bold",
  },
  input: {
    flex: 1
  },
  deleteButton: {
    color: '#ED5046', // Color del texto para eliminar
  },
  deleteAllButton: {
    color: '#ED5046',
    padding: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  flexer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
  }
});

export default SearchBar;