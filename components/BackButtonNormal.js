import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import BackIcon from '../assets/BackIcon';

const BackButton = ({ onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.back}>
      <BackIcon width={25} height={20} tintColor={color}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  back:{
    marginRight: 15
  }
});

export default BackButton;