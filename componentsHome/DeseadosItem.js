// DeseadosItem.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import HeartIcon from '../assets/HeartIcon';
import Warning from '../assets/Warning';

const DeseadosItem = ({ item, onRemove, navigation }) => {
  const handleItemPress = (id) => {
    navigation.navigate('Producto', { id });
  };

  const isOutOfStock = item.stock <= 0;
  if (isOutOfStock) {
    itemstockColor = '#ED5046';
    stockText = 'Sin stock';
  }
  
  return (
    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
      <View style={[styles.itemContainer, isOutOfStock && styles.itemContainerOutOfStock]}>
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
      {!isOutOfStock > 0 ? 
      (
        <View></View>
      ) : (
        <View style={styles.itemstock}>
          <Warning width={20} height={20}></Warning>
          <Text style={styles.itemstockText}>Item sin stock</Text>
        </View>
      )}
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
    },
    itemContainerOutOfStock: {
      backgroundColor: '#F0F0F0', // Color más claro cuando está fuera de stock
    },
    itemstock: {
      paddingHorizontal: 5,
      backgroundColor: '#F0F0F0',
      paddingBottom: 10,
      borderColor: "#D3D3D3",
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center"
    },
    itemstockText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "gray",
      marginLeft: 10
    }
});  

export default DeseadosItem;