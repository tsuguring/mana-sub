import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { Button, dismiss, TextField } from '../../atoms';
import{ Context, Status } from '../../../contexts/ui';
import { useControlledComponent } from '../../lib/hooks';
import { COLOR } from '../../../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLOR.MAIN,
    },
    text: {
        marginVertical: 20,
    },
    button: {
        marginTop: 20,
    },
});

export default function SignUp() {
    const { setApplicationState } = React.useContext(Context);
    const mailAddress = useControlledComponent('');
    const password = useControlledComponent('');

    return (
        <TouchableWithoutFeedback onPress={dismiss}>
            <View style={styles.container}>
                <TextField
                    label="email"
                    value={mailAddress.value}
                    onChangeText={mailAddress.onChangeText}
                    style={styles.text}
                    autoCompleteType="email"
                />
                <TextField
                    label="password"
                    value={password.value}
                    onChangeText={password.onChangeText}
                    style={styles.text}
                    autoCompleteType="password"
                />
                <Button 
                    onPress={() => setApplicationState(Status.AUTHORIZED)}
                    style={styles.button}
                    label="登録"
                />
            </View>
        </TouchableWithoutFeedback>
    );
}
