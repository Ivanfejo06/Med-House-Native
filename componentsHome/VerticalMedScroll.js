import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MedItem from './MedItem';
import { Flow } from 'react-native-animated-spinkit'; // Importa el spinner de carga

const VerticalMedScroll = ({ donations, navigation, title, disabled }) => {
  const [loading, setLoading] = useState(true); // Estado de carga

  // Simula la carga de datos (esto es solo para demostración)
  useEffect(() => {
    if (donations && donations.length > 0) {
      setLoading(false); // Cambia el estado de carga cuando los datos están disponibles
    }
  }, [donations]);

  return (
    <View style={styles.MedesShadowContainer}>
      <View style={styles.MedesContainer}>
        <View style={styles.MedesTitleContainer}>
          <Text style={styles.MedesTitle}>{title}</Text>
        </View>
        {loading ? ( // Si estamos cargando, muestra el icono de carga
          <View style={styles.loadingContainer}>
            <Flow size={48} color="#1E98A8" />
          </View>
        ) : ( // Si los datos están cargados, muestra los ítems
          <FlatList
            data={donations}
            renderItem={({ item }) => (
              <MedItem 
                item={item} 
                navigation={navigation}
                disableOnPress={disabled}
              />
            )}
            keyExtractor={(item) => item.id.toString()} // Asegúrate de convertir el ID a string
            scrollEnabled={false} // Desactiva el scroll
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  MedesTitleContainer: {
    backgroundColor: '#1E98A8',
    padding: 5,
    alignItems: 'center',
  },
  MedesTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150, // Ajusta la altura según sea necesario
  },
});

export default VerticalMedScroll;