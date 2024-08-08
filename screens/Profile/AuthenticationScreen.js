import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBarWhite from '../../componentsHome/TopBarWhite';

const AuthenticationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBarWhite 
        navigation={() => navigation.goBack()}
        title="Autenticación"
      />
      {/* Contenido adicional para Autenticación */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default AuthenticationScreen;
