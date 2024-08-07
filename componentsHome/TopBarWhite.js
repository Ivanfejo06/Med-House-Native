import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BackButton from '../components/BackButtonNormal';

const { height } = Dimensions.get('window');

const TOPBAR_HEIGHT = height * 0.13;
const LINER_WIDTH = height * 0.4260;
const LINER_HEIGHT = height * 0.03521;
const HEIGHT = height * 0.03521;
const BORDERRADIUS = height * 0.029342;

const TopBarWhite = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.liner}>
        <View style={styles.sectionLeft}>
          <BackButton onPress={navigation} />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.section}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: BORDERRADIUS,
    borderBottomRightRadius: BORDERRADIUS,
    width: '100%',
    height: TOPBAR_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  liner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: LINER_WIDTH,
    height: LINER_HEIGHT,
    position: 'absolute',
    bottom: HEIGHT / 2, 
  },
  section: {
    flex: 1,
    alignItems: 'center',
  },
  sectionLeft: {
    flex: 1,
    alignItems: 'left',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TopBarWhite;