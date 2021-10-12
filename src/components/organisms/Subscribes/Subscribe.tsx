import React from "react";
import { StyleSheet, View } from 'react-native';
import { COLOR } from '../../../constants/theme';
import SubscribeDisplay from '../../molecules/Subscribe';

export interface GotoDetail {
    (state: State): void;
}

export interface State {
    id: string;
    title: string;
    detail?: string;
}

const styles = StyleSheet.create({
    contentContainer: {
      backgroundColor: COLOR.MAIN,
      height: 120,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
});

export interface Actions {
    gotoDetail: GotoDetail;
}

interface Props {
    state: State;
    actions: Actions;
}

export function Component(props: Props) {
    const {
        state,
        actions: { gotoDetail },
    } = props;

    const onPress = React.useCallback(() => {
        gotoDetail(state);
    }, [state, gotoDetail]);

    return <SubscribeDisplay onPress={onPress} title={state.title} detail={state.detail}/>
}