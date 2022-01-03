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
    marginBottom: 60,
  },
  text: {
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
      <Text style={styles.text}>¥{props.sumsubscriptions}</Text>
    </View>
  );
}
