import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SearchMedItem = ({ item, navigation }) => {
  const handleItemPress = (id) => {
    navigation.navigate('Producto', { id });
  };
  
  // Determinar el color de fondo según el estado
  let itemstockColor;
  let stockText; 

  if (item.stock <= 0) {
    itemstockColor = '#ED5046'; // Mismo color para el estado
    stockText = 'Sin stock';
  }
  if (item.stock > 0) {
    itemstockColor = '#FFFFFF'; // Mismo color para el estado
    stockText = 'Sin stock';
  }

  return (
    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.imagen }} style={styles.itemImage}/>
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.nombre}</Text>
                <Text style={styles.itemDescription}>{item.droga} {item.dosis}</Text>
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
    borderRadius: 15,
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
    justifyContent: 'center', // Asegura que el contenido se centre horizontalmente
    alignItems: 'center',
    marginTop: 10, // Opcional, para un poco de separación
    width: '100%', // Asegura que el contenedor use el ancho completo del elemento padre
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

export default SearchMedItem;