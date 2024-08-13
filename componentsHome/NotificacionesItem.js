import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const NotificacionesItem = ({ item }) => {
  return (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage}/>
        <View style={styles.itemDetails}>
          <Text style={styles.itemMessage}>{item.message}</Text>
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
    backgroundColor: "#FFFFFF",
    margin: 15,
    marginBottom: 0,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
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
  itemMessage: {
    fontSize: 16,
    color: '#000000',
    fontWeight: "bold"
  },
});

export default NotificacionesItem;