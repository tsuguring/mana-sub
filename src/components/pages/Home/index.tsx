import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import Subscribes, { Subscribe } from '../../organisms/Subscribes';
import { COLOR } from '../../../constants/theme';
import { DETAIL, INPUT } from '../../../constants/path';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      position: 'absolute',
      bottom: 32,
      right: 32,
      width: 48,
      height: 48,
      backgroundColor: COLOR.MAIN_DARK,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
});

const subscribes = [
    {
        id: '1',
        title: 'Netflix',
        detail: '2021/10/11',
    },
    {
        id: '2',
        title: 'AppleMusic',
        detail: '2021/10/11',
    },
]
  
export default function Home() {
    const { navigate } = useNavigation();
    const onPress = React.useCallback(() => {
        navigate(INPUT);
    }, [navigate]);
    const gotoDetail = React.useCallback(
        (state: Subscribe.State) => {
            navigate(DETAIL, {...state});
        },
        [navigate],
    );
    const action = React.useMemo(
        () => ({
            gotoDetail,
        }),
        [gotoDetail],
    );

    return (
        <View style={styles.container}>
            <Subscribes subscribes={subscribes} actions={{ ...ActionSheetIOS, gotoDetail }} />
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Icon color={COLOR.PRIMARY} size={24} name="plus" />
            </TouchableOpacity>
        </View>
    )
}
