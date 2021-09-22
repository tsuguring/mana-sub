import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SIGN_IN, SIGN_UP } from '../../../constants/path';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default function ChooseLogin() {
    const { navigate } = useNavigation();
    return (
        <View style={styles.container}>
            <Text>ChooseLogin</Text>
            <TouchableOpacity onPress={() => navigate(SIGN_IN)}>
                <Text>go to Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate(SIGN_UP)}>
                <Text>go to Sign up</Text>
            </TouchableOpacity>
        </View>
    )
}
