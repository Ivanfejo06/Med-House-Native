import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import HorizontalMedItem from './HorizontalMedItem';

const HorizontalMedScroll = ({ donations, navigation, title }) => {
  return (
    <View style={styles.HorizontalMedesShadowContainer}>
        <View style={styles.HorizontalMedesContainer}>
            <View style={styles.MedesTitleContainer}>
                <Text style={styles.MedesTitle}>{title}</Text>
            </View>
            <FlatList
                data={donations}
                renderItem={({ item }) => (
                <HorizontalMedItem item={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.HorizontalitemList}
                horizontal
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    HorizontalMedesShadowContainer: {
        marginBottom: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Añade esta línea para Android
    },
    HorizontalMedesContainer: {
        overflow: 'hidden',
        backgroundColor: "#1E98A8"
    },
    HorizontalitemList:{
        paddingHorizontal: 5
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

export default HorizontalMedScroll;