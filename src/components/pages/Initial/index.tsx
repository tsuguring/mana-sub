import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLOR } from '../../../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.MAIN,
    },
    text: {
        color: COLOR.WHITE,
    }
});

export default function Initial() {
    return (
        <View style={styles.container}>
            <Text>Initial</Text>
        </View>
    )
}
