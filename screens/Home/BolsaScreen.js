import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';

const { height } = Dimensions.get('window');

const BolsaScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar
        navigation={navigation}
      />
      <View style={styles.content}>
        <Text>Bolsa</Text>
      </View>
      <NavBar 
        navigation={navigation}
        selected="bolsa"
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

export default BolsaScreen;