import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get("window");

const innerDimension = 300;

const Overlay = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.outer} />
      <View style={styles.inner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  outer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  inner: {
    position: 'absolute',
    top: height / 2 - innerDimension / 2,
    left: width / 2 - innerDimension / 2,
    width: innerDimension,
    height: innerDimension,
    borderRadius: 50, // Esquinas redondeadas
    borderWidth: 5,
    borderColor: "white"
  },
});

export default Overlay;