import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import * as Subscription from "./Subscription";

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
  changemoney: boolean;
}

export default function Subscriptions(props: Props) {
  return (
    <FlatList
      style={styles.flatlistcontainer}
      data={props.subscriptions}
      renderItem={({ item }) => (
        <Subscription.Component
          state={item}
          actions={props.actions}
          changemoney={props.changemoney}
        />
      )}
      ItemSeparatorComponent={(highlighted) => (
        <View style={[styles.separator, highlighted]} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
