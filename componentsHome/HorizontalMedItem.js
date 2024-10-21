import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HorizontalMedItem = ({ item, navigation }) => {
  // Validar que item esté definido antes de acceder a sus propiedades
  if (!item) {
    return null; // O renderiza un mensaje de error, como "Item no disponible".
  }

  const handleItemPress = (id) => {
    navigation.navigate('Producto', { id });
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item.id)}>
      <Image source={{ uri: item.imagen }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.nombre}</Text>
        <Text style={styles.itemDescription}>{item.droga} {item.dosis}</Text>
      </View>
      {item.stock <= 0 && (
        <View style={styles.itemstockContainer}>
          <View style={styles.itemstock}>
            <Text style={styles.itemstockText}>Sin stock</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    width: 150,
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    margin: 5,
    marginBottom: 10,
    borderRadius: 15,
  },
  itemImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  itemDetails: {
    marginVertical: 5,
    marginTop: 15
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  itemstock: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#ED5046'
  },
  itemstockText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default HorizontalMedItem;