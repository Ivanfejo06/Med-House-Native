import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const SPEC_HEIGHT = height * 0.0352

const DetailItem = ({ label, value }) => {
    return (
        <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{label}: </Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: "#1E98A8",
        marginBottom: 10,
        width: "100%"
    },
    detailLabel: {
        color: '#000',
    },
    detailValue: {
        color: '#000',
        fontWeight: 'bold'
    },
});

export default DetailItem;