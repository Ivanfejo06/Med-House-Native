import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MedItem = ({ item, navigation }) => {
  
  const handleItemPress = (id) => {
    navigation.navigate('Producto', { id });
  };

  let backgroundColor = '#FFFFFF'; // Establece un valor por defecto si es necesario
  let itemstockColor;
  let stockText;

  if (item.stock <= 0) {
    itemstockColor = '#ED5046';
    stockText = 'Sin stock';
  } else {
    itemstockColor = '#4CAF50'; // Ajusta según tu diseño
    stockText = 'En stock'; // Ajusta según tu diseño
  }

  return (
    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
      <View style={[styles.itemContainer, { backgroundColor }]}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
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
    flexDirection: 'row',
    padding: 10,
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

export default MedItem;
