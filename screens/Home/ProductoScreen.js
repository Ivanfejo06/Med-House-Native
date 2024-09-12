import React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import BackTopBar from '../../componentsHome/BackTopBar';
import DeseadosItem from '../../componentsHome/DeseadosItem';
import SendButton from '../../components/SendButton';

const { height, width } = Dimensions.get('window');

const ProductoScreen = ({ navigation, id }) => {
  return (
    <View style={styles.container}>
      <BackTopBar navigation={() => navigation.goBack()} profile={() => navigation.navigate("ProfileIndex")}/>
      <View style={styles.container}>

      </View>
      <NavBar navigation={navigation} selected="Deseados" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
});

export default ProductoScreen;