// BolsaItem.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const BolsaItem = ({ item, onRemove }) => {
  return (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage}/>
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
        <View style={styles.itemActions}>
          <View style={styles.itemQuantity}>
              <Text style={styles.itemQuantityText}>{item.quantity}</Text>
          </View>
          <TouchableOpacity onPress={() => onRemove(item.id)}>
              <View style={styles.itemRemove}>
                  <Image style={styles.itemRemoveImage} source={require("../assets/Remove.png")}/>
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
    itemQuantity: {
      width: 37,
      height: 37,
      backgroundColor: '#1E98A8',
      marginLeft: 10,
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
    },
    itemQuantityText: {
      color: "#FFFFFF",
      fontSize: 20,
      fontWeight: "bold",
    },
    itemRemove: {
      width: 37,
      height: 37,
      backgroundColor: '#ED5046',
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

export default BolsaItem;