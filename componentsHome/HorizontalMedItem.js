import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HorizontalMedItem = ({ item }) => {
  // Determinar el color de fondo según el estado
  let backgroundColor;
  let itemstockColor;
  let stockText;

  if (item.stock <= 0) {
    itemstockColor = '#ED5046'; // Mismo color para el estado
    stockText = 'Sin stock';
  }

  return (
    <TouchableOpacity>
        <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage}/>
        <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
        <View style={styles.itemstockContainer}>
            <View style={[styles.itemstock, { backgroundColor: itemstockColor }]}>
                <Text style={styles.itemstockText}>{stockText}</Text>
            </View>
        </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    padding: 10,
    width: 150,
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    margin: 10,
    marginTop: 0,
    marginRight: 5,
    borderRadius: 15,
    padding: 10
  },
  itemImage: {
    width: 130,
    height: 130,
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
  itemstockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemstock: {
    padding: 5,
    borderRadius: 8,
  },
  itemstockText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold"
  }
});

export default HorizontalMedItem;