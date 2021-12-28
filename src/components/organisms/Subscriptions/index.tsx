import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import * as Subscription from "./Subscription";
import { COLOR } from "../../../constants/theme";

export { Subscription };

const styles = StyleSheet.create({
  flatlistcontainer: {
    alignSelf: "stretch",
    paddingLeft: 10,
    paddingRight: 10,
  },
  separator: {
    marginTop: 30,
  },
});

export type State = Array<Subscription.State>;

interface Props {
  subscriptions: State;
  actions: Subscription.Actions;
}

export default function Subscriptions(props: Props) {
  return (
    <FlatList
      style={styles.flatlistcontainer}
      data={props.subscriptions}
      renderItem={({ item }) => (
        <Subscription.Component state={item} actions={props.actions} />
      )}
      ItemSeparatorComponent={(highlighted) => (
        <View style={[styles.separator, highlighted]} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
