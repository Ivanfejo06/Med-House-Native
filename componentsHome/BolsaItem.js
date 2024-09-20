// BolsaItem.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import RemoveIcon from '../assets/RemoveIcon';

const BolsaItem = ({ item, onRemove, navigation }) => {
  const handleItemPress = (id) => {
    navigation.navigate('Producto', { id });
  };
  
  return (
    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imagen }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.nombre}</Text>
          <Text style={styles.itemDescription}>{item.droga} {item.dosis}</Text>
        </View>
        <View style={styles.itemActions}>
          <View style={styles.itemQuantity}>
            <Text style={styles.itemQuantityText}>1</Text>
          </View>
          <TouchableOpacity onPress={() => onRemove(item.id)}>
            <View style={styles.itemRemove}>
              <RemoveIcon height={24} width={24} />
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
    resizeMode: 'contain',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemRemoveImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  }
});

export default BolsaItem;