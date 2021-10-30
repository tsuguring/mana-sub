import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import * as Subscribe from "./Subscribe";
import { COLOR } from "../../../constants/theme";

export { Subscribe };

const styles = StyleSheet.create({
  flatlistcontainer: {
    alignSelf: "stretch",
    backgroundColor: COLOR.MAIN,
    paddingLeft: 10,
    paddingRight: 10,
  },
  separator: {
    marginTop: 30,
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
      style={styles.flatlistcontainer}
      data={props.subscribes}
      renderItem={({ item }) => (
        <Subscribe.Component state={item} actions={props.actions} />
      )}
      ItemSeparatorComponent={(highlighted) => (
        <View style={[styles.separator, highlighted]} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
