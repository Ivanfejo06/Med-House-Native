// BolsaItem.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import RemoveIcon from '../assets/RemoveIcon';
import Warning from '../assets/Warning';

const BolsaItem = ({ item, onRemove, navigation }) => {
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
        <Image source={{ uri: item.imagen }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.nombre}</Text>
          <Text style={styles.itemDescription}>{item.droga} {item.dosis}</Text>
        </View>
        <View style={styles.itemActions}>
          {!isOutOfStock > 0 ? 
          (
            <View style={styles.itemQuantity}>
              <Text style={styles.itemQuantityText}>1</Text>
            </View>
          ) : (
            <View></View>
          )}
          <TouchableOpacity onPress={() => onRemove(item.id)}>
            <View style={styles.itemRemove}>
              <RemoveIcon height={24} width={24} />
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
  itemContainerOutOfStock: {
    backgroundColor: '#F0F0F0', // Color más claro cuando está fuera de stock
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
  itemQuantityOutOfStock: {
    backgroundColor: '#A9A9A9', // Color gris cuando está fuera de stock
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
  itemRemoveOutOfStock: {
    backgroundColor: '#D3D3D3', // Color gris más claro cuando está fuera de stock
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

export default BolsaItem;