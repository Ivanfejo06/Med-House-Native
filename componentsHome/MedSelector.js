import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MedSelector = ({ item, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(item)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imagen }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.nombre}</Text>
          <Text style={styles.itemDescription}>{item.droga} {item.dosis}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFF",
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: "#1E98A8",
    width: '100%',
    borderRadius: 15
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
});

export default MedSelector;