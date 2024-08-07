import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';

const ProfileIndex = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Index"
      />
      <View style={styles.content}>
        <Button title="Logout" onPress={() => navigation.navigate('Start')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
  }
});

export default ProfileIndex;