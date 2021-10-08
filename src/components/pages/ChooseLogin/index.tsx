import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SIGN_IN, SIGN_UP } from '../../../constants/path';
import { Button } from '../../atoms'
import { COLOR } from '../../../constants/theme'

const padding = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.MAIN,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
        paddingVertical: padding,
    },
    button: {
        marginBottom: 40,
        width: 300,
    },
});

export default function ChooseLogin() {
    const { navigate } = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Button onPress={() => navigate(SIGN_IN)} style={styles.button} label="サインイン" />
                <Button onPress={() => navigate(SIGN_UP)} style={styles.button} label="サインアップ" />
            </View>
        </View>
    )
}
