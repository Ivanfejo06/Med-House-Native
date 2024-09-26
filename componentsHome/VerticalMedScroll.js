import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MedItem from './MedItem';

const VerticalMedScroll = ({ donations, navigation, title }) => {
  return (
    <View style={styles.MedesShadowContainer}>
        <View style={styles.MedesContainer}>
        <View style={styles.MedesTitleContainer}>
            <Text style={styles.MedesTitle}>{title}</Text>
        </View>
        <FlatList
            data={donations}
            renderItem={({ item }) => (
            <MedItem 
                item={item} 
                navigation={navigation} 
            />
            )}
            keyExtractor={(item) => item.id.toString()} // Asegúrate de convertir el ID a string
            scrollEnabled={false} // Desactiva el scroll
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    MedesShadowContainer: {
        marginVertical: 20,
        margin: 15,
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Añade esta línea para Android
    },
    MedesContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        overflow: 'hidden',
    },
    MedesTitleContainer: {
        backgroundColor: '#1E98A8',
        padding: 5,
        alignItems: 'center',
    },
    MedesTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default VerticalMedScroll;