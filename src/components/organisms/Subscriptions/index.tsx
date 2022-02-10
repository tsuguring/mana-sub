import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
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
  sort: string;
}

export default function Subscriptions(props: Props) {
  const nowdate = new Date(Date.now());
  const today = +new Date(nowdate.toLocaleDateString());

  const renderItem = useCallback(
    ({ item }) => (
      <Subscription.Component
        state={item}
        actions={props.actions}
        changemoney={props.changemoney}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item) => item.id, []);

  switch (props.sort) {
    case "muchmoney":
      return (
        <FlatList
          style={styles.flatlistcontainer}
          data={props.subscriptions.sort(function (a, b) {
            return (
              Number(b.money) / Number(b.period) -
              Number(a.money) / Number(a.period)
            );
          })}
          renderItem={renderItem}
          ItemSeparatorComponent={(highlighted) => (
            <View style={[styles.separator, highlighted]} />
          )}
          keyExtractor={keyExtractor}
        />
      );
    case "littlemoney":
      return (
        <FlatList
          style={styles.flatlistcontainer}
          data={props.subscriptions.sort(function (a, b) {
            return (
              Number(a.money) / Number(a.period) -
              Number(b.money) / Number(b.period)
            );
          })}
          renderItem={renderItem}
          ItemSeparatorComponent={(highlighted) => (
            <View style={[styles.separator, highlighted]} />
          )}
          keyExtractor={keyExtractor}
        />
      );
    case "nearpayment":
      return (
        <FlatList
          style={styles.flatlistcontainer}
          data={props.subscriptions.sort(function (a, b) {
            return (
              +new Date(a.date) -
              today -
              86400000 -
              (+new Date(b.date) - today - 86400000)
            );
          })}
          renderItem={renderItem}
          ItemSeparatorComponent={(highlighted) => (
            <View style={[styles.separator, highlighted]} />
          )}
          keyExtractor={keyExtractor}
        />
      );
    case "farpayment":
      return (
        <FlatList
          style={styles.flatlistcontainer}
          data={props.subscriptions.sort(function (a, b) {
            return (
              +new Date(b.date) -
              today -
              86400000 -
              (+new Date(a.date) - today - 86400000)
            );
          })}
          renderItem={renderItem}
          ItemSeparatorComponent={(highlighted) => (
            <View style={[styles.separator, highlighted]} />
          )}
          keyExtractor={keyExtractor}
        />
      );
    default:
      return (
        <FlatList
          style={styles.flatlistcontainer}
          data={props.subscriptions.sort(function (a, b) {
            return a.title.localeCompare(b.title);
          })}
          renderItem={renderItem}
          ItemSeparatorComponent={(highlighted) => (
            <View style={[styles.separator, highlighted]} />
          )}
          keyExtractor={keyExtractor}
        />
      );
  }
}
