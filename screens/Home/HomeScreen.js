import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar
        navigation={navigation}
        selected="home"
      />
      <View style={styles.content}>
        <View style={styles.top}>
        <Image style={styles.favs} source={require("../../assets/Heart.png")}/>
          <Image style={styles.favs} source={require("../../assets/Heart.png")}/>
        </View>
      </View>
      <NavBar 
        navigation={navigation} // Pasar la función de navegación al NavBar
        selected="home" // Indica que el ícono de Home está seleccionado
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  content: {
  },
  top:{
    flexDirection: "row",
    height: 50,
    width: 393,
    justifyContent: "space-between"
  },
  favs:{
    height: 22,
    width: 22
  }
});

export default HomeScreen;