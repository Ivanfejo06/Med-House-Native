import React from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import NotificacionesItem from '../../componentsHome/NotificacionesItem';
import FarmNavBar from '../../componentsHome/FarmNavBar';
import TopBar from '../../componentsHome/TopBar';

const { height } = Dimensions.get('window');

const notifications = [
  {
    id: '1',
    message: 'Tu pedido ha sido enviado',
    image: 'https://your-image-url.com/notificacion1.png'
  },
  {
    id: '2',
    message: 'Tu donación ha sido recibida',
    image: 'https://your-image-url.com/notificacion2.png'
  },
  {
    id: '3',
    message: 'Nuevo mensaje de soporte',
    image: 'https://your-image-url.com/notificacion3.png'
  }
  // Agrega más notificaciones según sea necesario
];

const FarmNotificacionesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar
        navigation={navigation}
      />
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificacionesItem
            item={item}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.itemList}
      />
      <FarmNavBar 
        navigation={navigation}
        selected="notificaciones"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default FarmNotificacionesScreen;
