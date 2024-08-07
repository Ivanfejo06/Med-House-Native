import React from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';

const { height } = Dimensions.get('window');

const CONTENT_WIDTH = height * 0.4260;
const CONTENT_HEIGHT = height * 0.8;
const BORDERRADIUS = height * 0.029342;
const SPACING = height * 0.026;

const ProfileIndex = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Perfil"
      />
      <View style={styles.content}>
        <Button title="Logout" onPress={() => navigation.navigate('Start')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  content: {
    marginTop: SPACING,
    backgroundColor: "#FFFFFF",
    borderRadius: BORDERRADIUS,
    height: CONTENT_HEIGHT,
    width: CONTENT_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});

export default ProfileIndex;