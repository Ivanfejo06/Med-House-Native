import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Mis Datos"
      />
      {/* Contenido adicional para Mi Perfil */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default ProfileScreen;