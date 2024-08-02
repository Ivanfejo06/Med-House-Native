import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const LOGO_HEIGHT = height * 0.1009;
const LOGO_WIDTH = height * 0.24647;

const Logo = () => {
  return (
    <Image source={require('../assets/Logo.png')} style={styles.logo} />
  );
};

const styles = StyleSheet.create({
  logo: {
      width: LOGO_WIDTH,
      height: LOGO_HEIGHT,
      margin: 0
  }
});

export default Logo;