import React from 'react';
import { TouchableOpacity } from 'react-native';
import BackIcon from '../assets/BackIcon';

const BackButton = ({ onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BackIcon width={25} height={20} tintColor={color}/>
    </TouchableOpacity>
  );
};

export default BackButton;