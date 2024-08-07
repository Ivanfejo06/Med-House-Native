import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const ProfileNavigator = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.middle}>
            <Image style={styles.image} />
            <Text style={styles.text}>{text}</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginTop: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#A8A8A8',
    paddingBottom: 20,
  },
  middle:{
    flexDirection:"row",
    alignItems: "center" 
  },
  image: {
    // Ajusta el tamaño de la imagen según sea necesario
    width: 30,
    height: 30,
    marginRight: 10,
  },
  text: {
    color: '#A8A8A8',
    fontSize: 18,
    fontWeight: "bold"
  },
});

export default ProfileNavigator;