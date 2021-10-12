import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import * as Subscribe from './Subscribe';
import { COLOR } from '../../../constants/theme';

export { Subscribe };

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
    },
    separator: {
      height: 1,
      backgroundColor: COLOR.SECONDARY,
    },
});

export type State = Array<Subscribe.State>;

interface Props {
    subscribes: State;
    actions: Subscribe.Actions;
}

export default function Subscribes(props: Props) {
    return (
        <FlatList
            style={styles.container}
            data={props.subscribes}
            renderItem={({ item }) => <Subscribe.Component state={item} actions={props.actions}/>}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={item => item.id}
        />
    );
}