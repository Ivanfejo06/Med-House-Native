import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import NavBar from '../../componentsHome/NavBar';
import TopBar from '../../componentsHome/TopBar';

const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Inicializa la opacidad en 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Cambia la opacidad a 1
      duration: 1000, // Duración de la animación en milisegundos
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TopBar navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.top}>
          <TouchableOpacity>
            <Image style={styles.favs} source={require("../../assets/Options.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.favsH} source={require("../../assets/Heart.png")} />
          </TouchableOpacity>
        </View>
      </View>
      <NavBar navigation={navigation} selected="home" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    width: 333,
    justifyContent: 'space-between',
    margin: 20,
  },
  favs: {
    height: 30,
    width: 30,
    overflow: 'visible',
    objectFit: 'contain',
  },
  favsH: {
    height: 27,
    width: 27,
    overflow: 'visible',
    objectFit: 'contain',
  },
});

export default HomeScreen;