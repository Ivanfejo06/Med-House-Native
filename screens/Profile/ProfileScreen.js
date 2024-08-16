import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';

const { height } = Dimensions.get('window');

const CONTENT_HEIGHT = height * 0.8;

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Mis Datos"
      />
      <View style={styles.center}>
        <View style={styles.content}>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  center:{
    width: '100%',
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignContent: "center"
  }, 
  content: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    height: CONTENT_HEIGHT,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxWidth: 700
  }
});

export default ProfileScreen;