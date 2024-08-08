import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';

const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar
        navigation={navigation}
      />
      <View style={styles.content}>
        <View style={styles.top}>
          <Image style={styles.favs} source={require("../../assets/Options.png")}/>
          <Image style={styles.favsH} source={require("../../assets/Heart.png")}/>
        </View>
      </View>
      <NavBar 
        navigation={navigation}
        selected="home"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  top:{
    flexDirection: "row",
    width: 333,
    justifyContent: "space-between",
    margin: 20
  },
  favs:{
    height: 30,
    width: 30,
    overflow: "visible",
    objectFit: "contain"
  },
  favsH:{
    height: 27,
    width: 27,
    overflow: "visible",
    objectFit: "contain"
  }
});

export default HomeScreen;