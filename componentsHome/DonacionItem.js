import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DonacionItem = ({ item }) => {
  // Determinar el color de fondo según el estado
  let backgroundColor;
  let itemStateColor;
  let stateText;

  if (item.state === true) {
    itemStateColor = '#1EA82C'; // Mismo color para el estado
    stateText = 'Validado';
  } else if (item.state === false) {
    itemStateColor = '#ED5046'; // Mismo color para el estado
    stateText = 'Rechazado';
  } else {
    itemStateColor = '#1E98A8'; // Mismo color para el estado
    stateText = 'En proceso';
  }

  return (
    <View style={[styles.itemContainer, { backgroundColor }]}>
      <Image source={{ uri: item.image }} style={styles.itemImage}/>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <View style={styles.itemStateContainer}>
        <View style={[styles.itemState, { backgroundColor: itemStateColor }]}>
            <Text style={styles.itemStateText}>{stateText}</Text>
        </View>
      </View>
    </View>
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
    width: 50,
    height: 50,
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
  itemStateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemState: {
    padding: 5,
    borderRadius: 8,
  },
  itemStateText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold"
  }
});

export default DonacionItem;