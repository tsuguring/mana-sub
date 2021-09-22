import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default function Graph() {
    return (
        <View style={styles.container}>
            <Text>Graph</Text>
        </View>
    )
}
