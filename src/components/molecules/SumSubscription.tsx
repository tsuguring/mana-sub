import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLOR } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 90,
    paddingRight: 90,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 10,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  titletext: {
    fontSize: 16,
    fontWeight: "500",
  },
  subtext: {
    fontSize: 20,
  },
  summoneytext: {
    fontSize: 36,
  },
  button: {
    backgroundColor: COLOR.WHITE,
  },
});

interface Props {
  sumsubscriptions: number;
}

export default function Sumsubscription(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titletext}>合計金額</Text>
      </View>
      <Text>
        <Text style={styles.subtext}>¥</Text>
        <Text style={styles.summoneytext}>
          {props.sumsubscriptions.toLocaleString()}
        </Text>
        <Text style={styles.subtext}>/月</Text>
      </Text>
    </View>
  );
}
