import React from 'react';
import { StyleSheet, Image } from 'react-native';

const Logo = () => {
  return (
    <Image source={require('../assets/LogoInverted.png')} style={styles.logo} />
  );
};

const styles = StyleSheet.create({
  logo: {
      width: 210,
      height: 86,
      margin: 0
  }
});

export default Logo;