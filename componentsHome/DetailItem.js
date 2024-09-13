import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const SPEC_HEIGHT = height * 0.0352

const DetailItem = ({ label, value, backgroundColor }) => {
    return (
        <View style={[styles.detailItem, { backgroundColor }]}>
        <View style={styles.half}>
            <Text style={styles.detailLabel}>{label}</Text>
        </View>
        <View style={styles.half}>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: SPEC_HEIGHT,
        alignItems: "center",
        paddingHorizontal: 5
    },
    detailLabel: {
        color: '#000',
        fontWeight: 'bold'
    },
    detailValue: {
        color: '#000',
    },
    half: {
        width: '50%',
        textAlign: "left"
    },
});

export default DetailItem;