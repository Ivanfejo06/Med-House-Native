import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const HEIGHT = height * 0.18;

// Mapa de imágenes
const imageMap = {
  image1: require('../assets/Profile.png'),
  image2: require('../assets/Auth.png'),
  image3: require('../assets/DonacionesBig.png'),
  image4: require('../assets/Deseados.png'),
  image5: require('../assets/Logout.png'),
};

const ProfileNavigator = ({ onPress, text, image }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.middle}>
        <View style={styles.centre}>
          <Image style={styles.image} source={imageMap[image]} />
          <Text style={styles.text}>{text}</Text>
        </View>
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
    alignItems: "center" 
  },
  centre:{
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: HEIGHT
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    overflow: "visible",
    objectFit: "contain"
  },
  text: {
    color: '#A8A8A8',
    fontSize: 18,
    fontWeight: "bold"
  },
});

export default ProfileNavigator;