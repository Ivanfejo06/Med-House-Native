// DeseadosItem.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import HeartIcon from '../assets/HeartIcon';

const DeseadosItem = ({ item, onRemove, navigation }) => {
  const handleItemPress = (id) => {
    navigation.navigate('Producto', { id });
  };
  
  return (
    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imagen }} style={styles.itemImage}/>
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.nombre}</Text>
          <Text style={styles.itemDescription}>{item.droga} {item.dosis}</Text>
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity onPress={() => onRemove(item.id)}>
            <View style={styles.itemRemove}>
              <HeartIcon height={24} width={24}></HeartIcon>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: "#D3D3D3",
    },
    itemImage: {
      width: 60,
      height: 60,
      borderRadius: 5,
      resizeMode: 'contain',  // Utilizar resizeMode para ajustar la imagen
    },
    itemDetails: {
      flex: 1,
      marginLeft: 10,
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemDescription: {
      fontSize: 14,
      color: '#7D7D7D',
    },
    itemActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemActionButton: {
      fontSize: 20,
      padding: 5,
      color: '#1E98A8',
    },
    itemRemove: {
      width: 37,
      height: 37,
      marginLeft: 10,
      borderRadius: 7,
      alignItems: 'center',  // Centrar el contenido del botón de eliminación
      justifyContent: 'center',
    },
    itemRemoveImage: {
      width: 24, // Puedes ajustar el tamaño de la imagen según sea necesario
      height: 24,
      resizeMode: 'contain',  // Asegurar que la imagen se ajuste correctamente
    }
});  

export default DeseadosItem;