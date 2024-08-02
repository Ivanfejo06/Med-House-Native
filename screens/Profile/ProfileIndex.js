import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ProfileIndex = ({ navigation }) => {
  return (
    <View style={styles.container}>
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